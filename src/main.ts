import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard(new LoggerService()));
  // app.useGlobalInterceptors(new BrowserInterceptor());
  // app.useGlobalInterceptors(new TransformResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());
  const host = process.env.HOST ?? '0.0.0.0';
  const port = process.env.PORT ?? 3000;
  await app.listen(port, host);
  console.log(`Server is running on ${host}:${port}`);
}

void bootstrap();
