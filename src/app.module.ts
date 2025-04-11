import { ConfigModule } from '@nestjs/config'
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
		JwtModule.register({ global: true }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'assets'),
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
