import { NestApplication, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestApplication>(AppModule)
	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors()
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
