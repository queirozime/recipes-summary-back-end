"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreCollectionProviders = exports.FirestoreOptionsProvider = exports.FirestoreDatabaseProvider = void 0;
const users_document_1 = require("../users/documents/users.document");
exports.FirestoreDatabaseProvider = 'firestoredb';
exports.FirestoreOptionsProvider = 'firestoreOptions';
exports.FirestoreCollectionProviders = [
    users_document_1.UserDocument.collectionName,
];
//# sourceMappingURL=firestore.providers.js.map