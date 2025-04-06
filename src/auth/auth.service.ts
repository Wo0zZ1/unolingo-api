import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities'
import { IUserJwtPayload } from 'src/users/current-user.decorator'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	async register(username: string, password: string): Promise<Omit<User, 'password'>> {
		return await this.usersService.createUser({ username, password })
	}

	async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
		const user = await this.usersService.getUserByUsername(username)
		const isMatch = await bcrypt.compare(pass, user.password)
		if (!isMatch) throw new UnauthorizedException()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...result } = user
		return result
	}

	async login(username: string, pass: string, res: Response): Promise<{ accessToken: string }> {
		const user = await this.validateUser(username, pass)
		const payload: IUserJwtPayload = { id: user.id, username: user.username }

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
			secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
			secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
		})

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'strict',
			// TODO SET TO ENV
			maxAge: 5 * 60 * 1000, // 5 min
		})

		return { accessToken }
	}

	async refreshTokens(refreshToken: string, res: Response): Promise<{ accessToken: string }> {
		try {
			const paylaod = await this.jwtService.verifyAsync<IUserJwtPayload>(refreshToken, {
				secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
			})

			const newRefreshToken = await this.jwtService.signAsync(
				{
					id: paylaod.id,
					username: paylaod.username,
				},
				{
					expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
					secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
				},
			)

			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				sameSite: 'strict',
				// TODO SET TO ENV
				maxAge: 5 * 60 * 1000, // 5 min
			})

			const accessToken = await this.jwtService.signAsync(
				{
					id: paylaod.id,
					username: paylaod.username,
				},
				{
					expiresIn: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
					secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
				},
			)

			return { accessToken }
		} catch {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}

	logout(res: Response): void {
		res.clearCookie('refreshToken')
	}
}
