import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { TokenVerificationService } from './tokenVerification.service';

type FirebaseModuleOptions = {
  imports: any[];
  useFactory: (...args: any[]) => Settings;
  inject: any[];
};

@Module({})
export class FirebaseModule {
  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    const adminProvider = {
        provide: 'FirebaseAdmin',
        useFactory: options.useFactory,
        inject: options.inject,
      };
    return {
      global: true,
      module: FirebaseModule,
      providers: [
        adminProvider,
        {
          provide: Firestore,
          useFactory: () => {
            const credentials = JSON.parse(process.env.SB_KEY);
            const adminApp = admin.initializeApp({
              credential: admin.credential.cert(credentials),
            });
            return adminApp.firestore();
          },
          inject: ['FirebaseAdmin'],
        },
        TokenVerificationService
      ],
      imports: options.imports,
      exports: [adminProvider, Firestore, TokenVerificationService],
    };
  }
}

/*
import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from './firestore.providers';*/
/*
require('dotenv').config();

    const credentials = JSON.parse(process.env.SB_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });*/
