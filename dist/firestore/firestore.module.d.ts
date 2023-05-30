import { DynamicModule } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
type FirestoreModuleOptions = {
    imports: any[];
    useFactory: (...args: any[]) => Settings;
    inject: any[];
};
export declare class FirestoreModule {
    static forRoot(options: FirestoreModuleOptions): DynamicModule;
}
export {};
