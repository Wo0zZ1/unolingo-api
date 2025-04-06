import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()

		const refreshToken: string | undefined = request.cookies?.refreshToken

		if (!refreshToken) throw new UnauthorizedException('Refresh token is missing')

		try {
			const payload = await this.jwtService.verifyAsync(refreshToken, {
				secret: this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
			})
			request['user'] = payload
			return true
		} catch {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}
}
