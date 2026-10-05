import admin from 'firebase-admin';

let firebaseAdminApp = null;

export const initFirebase = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  try {
    const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountVar) {
      const serviceAccount = JSON.parse(serviceAccountVar);
      firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('[Firebase Admin] Initialized with Service Account');
    } else {
      console.log('[Firebase Admin] Skipping service account init — FIREBASE_SERVICE_ACCOUNT not provided');
    }
  } catch (error) {
    console.warn('[Firebase Admin] Initialization warning:', error.message);
  }

  return firebaseAdminApp;
};

export default admin;
