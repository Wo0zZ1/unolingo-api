import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LanguagesModule } from './languages/languages.module'
import { SectionsModule } from './sections/sections.module'
import { LevelsModule } from './levels/levels.module'
import { TasksModule } from './tasks/tasks.module'
import { ProgressModule } from './progress/progress.module'
import { TheoryModule } from './theory/theory.module'
import { StatsModule } from './stats/stats.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secret: config.getOrThrow<string>('JWT_SECRET'),
				signOptions: { expiresIn: '90s' },
			}),
			global: true,
			inject: [ConfigService],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		AuthModule,
		UsersModule,
		LanguagesModule,
		SectionsModule,
		LevelsModule,
		TasksModule,
		TheoryModule,
		ProgressModule,
		StatsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
