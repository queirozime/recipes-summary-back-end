import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  exports: [admin.initializeApp],
})
export class FirebaseAdminModule {}
