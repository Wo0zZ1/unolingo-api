import * as cookieParser from 'cookie-parser'
import { NestApplication, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestApplication>(AppModule)
	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser())
	app.enableCors({
		origin: true,
		credentials: true,
	})
	await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}
bootstrap()
