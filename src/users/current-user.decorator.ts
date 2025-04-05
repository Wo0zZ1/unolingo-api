import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export interface IUserJwtPayload {
	id: number
	username: string
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest<Request>()
	return request['user'] as IUserJwtPayload
})
