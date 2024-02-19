import admin from "firebase-admin";
import serviceAccount from "../../lingoshelf-serviceAccountKey.json";

export const setupFirebase = () =>
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

// fuck use private key for this
