import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Apply validation globally with transform enabled to automatically convert query params
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('The Food Delivery API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('demandeurs', 'Demandeur management endpoints')
    .addTag('traiteurs', 'Traiteur management endpoints')
    .addTag('livreurs', 'Livreur management endpoints')
    .addTag('fournisseurs', 'Fournisseur management endpoints')
    .addTag('admin', 'Admin management endpoints')
    .addTag('plats', 'Dish management endpoints')
    .addTag('commandes', 'Order management endpoints')
    .addTag('avis', 'Review management endpoints')
    .addTag('paiements', 'Payment management endpoints')
    .build();
  
  const options = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
    include: [],
  };
  
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api`);
}
bootstrap();
