import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(cookieParser())


  // Swagger sozlamasi
  const config = new DocumentBuilder()
    .setTitle('E-Store API')
    .setDescription('E-Store backend API documentation')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
  })
}
bootstrap()



