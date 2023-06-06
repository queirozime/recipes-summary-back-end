import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {AuthService} from './auth.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: admin.initializeApp,
      useFactory: (configService: ConfigService) => {
        const options = {
          credential: admin.credential.cert(configService.get<string>('SA_KEY')),
        };
        return admin.initializeApp(options);
      },
      inject: [ConfigService],
    },
    AuthService,
  ],
  exports: [admin.initializeApp, AuthService],
})
export class FirebaseAdminModule {}
