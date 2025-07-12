import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { Auth } from './auth/entities/auth.entity'

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env' , isGlobal: true}),
      TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Auth],
            synchronize: true,
      }),
      AuthModule,
      EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
