import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedAuth: Auth | null = null;

/**
 * Lazily initialise the Firebase client SDK.
 *
 * Deferred to the first call (instead of module load) so `next build` can
 * prerender pages that import this module without the NEXT_PUBLIC_FIREBASE_*
 * env vars being set. Called at user-interaction time (e.g. login submit),
 * where a missing config surfaces as a caught error in the UI.
 */
export function getFirebaseAuth(): Auth {
  if (cachedAuth) return cachedAuth;

  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Firebase client is not configured. Set the NEXT_PUBLIC_FIREBASE_* env vars."
    );
  }

  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  cachedAuth = getAuth(app);
  return cachedAuth;
}
