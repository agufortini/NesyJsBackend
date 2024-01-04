import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Third party Modules
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  
    // My Modules
    AuthModule
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
