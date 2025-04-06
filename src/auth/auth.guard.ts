import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()
		const token = this.extractTokenFromHeader(request)
		if (!token) throw new UnauthorizedException('Access token is missing')
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
			})
			request['user'] = payload
			return true
		} catch {
			throw new UnauthorizedException('Invalid access token')
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
