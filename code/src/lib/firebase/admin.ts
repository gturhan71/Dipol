import * as admin from "firebase-admin";

let cachedAuth: admin.auth.Auth | null = null;

/**
 * Lazily initialise the Firebase Admin SDK.
 *
 * Initialisation is deferred to the first call (instead of running at module
 * load) so that `next build` can collect page data for routes that import this
 * module even when the service-account env vars are absent. Routes that call
 * this at request time will get a thrown error, which their existing try/catch
 * blocks turn into a 401.
 */
export function getAdminAuth(): admin.auth.Auth {
  if (cachedAuth) return cachedAuth;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY."
    );
  }

  const app = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });

  cachedAuth = app.auth();
  return cachedAuth;
}
