import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities'
import { IUserJwtPayload } from 'src/users/current-user.decorator'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(username: string, password: string): Promise<Omit<User, 'password'>> {
		return await this.usersService.createUser({ username, password })
	}

	async login(username: string, pass: string): Promise<{ accessToken: string }> {
		const user = await this.usersService.getUserByUsername(username)
		const isMatch = await bcrypt.compare(pass, user.password)
		if (!isMatch) throw new UnauthorizedException()
		const payload: IUserJwtPayload = { id: user.id, username: user.username }
		return {
			accessToken: await this.jwtService.signAsync(payload),
		}
	}
}
