import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { Auth } from './auth/entities/auth.entity'
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/entities/category.entity';
import { Phone } from './product/entities/phone.entity';
import { Watch } from './product/entities/watches.entity';
import { Computer } from './product/entities/computer.entity';
import { Camera } from './product/entities/camera.entity';
import { Headphone } from './product/entities/headPhones.entity';
import { Gaming } from './product/entities/gaming.entity';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env' , isGlobal: true}),
      TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Auth , Category , Phone , Watch , Computer , Camera, Headphone , Gaming],
            synchronize: true,
      }),
      AuthModule,
      EmailModule,
      CategoryModule,
      ProductModule,
      UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
