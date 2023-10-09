import { Module } from '@nestjs/common';
import { ToDosModule } from './to-dos/to-dos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    ToDosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
