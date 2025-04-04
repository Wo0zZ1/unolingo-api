import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { LanguagesModule } from './languages/languages.module';
import { SectionsModule } from './sections/sections.module';
import { LevelsModule } from './levels/levels.module';
import { TasksModule } from './tasks/tasks.module';
import { ProgressModule } from './progress/progress.module';
import { TheoryModule } from './theory/theory.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secret: config.getOrThrow<string>('JWT_SECRET'),
				signOptions: { expiresIn: '20s' },
			}),
			global: true,
			inject: [ConfigService],
		}),
		AuthModule,
		UsersModule,
		LanguagesModule,
		SectionsModule,
		LevelsModule,
		TasksModule,
		ProgressModule,
		TheoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
