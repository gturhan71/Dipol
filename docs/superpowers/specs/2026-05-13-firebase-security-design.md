# Design Document: Firebase Auth Security Remediation

## 1. Overview
Transition from static tokens and `localStorage` to Firebase Auth with secure HttpOnly session cookies.

## 2. Dependencies
- `firebase`: Client-side authentication.
- `firebase-admin`: Server-side token verification and session management.
- `cookie`: For easy cookie parsing (optional, or use Next.js built-ins).

## 3. Configuration (.env)
User needs to provide:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## 4. Implementation Steps

### 4.1. Firebase Initialization
- Create `src/lib/firebase/config.ts` for client config.
- Create `src/lib/firebase/admin.ts` for server-side admin SDK.

### 4.2. Authentication Routes
- `POST /api/auth/session`: 
  - Takes `idToken` from client.
  - Verifies token with `firebase-admin`.
  - Creates session cookie via `admin.auth().createSessionCookie()`.
  - Sets HttpOnly, Secure, SameSite cookie.
- `POST /api/auth/logout`: 
  - Clears the session cookie.

### 4.3. Login Page
- Update `src/app/portal/login/page.tsx`:
  - Use `signInWithEmailAndPassword` from Firebase client.
  - After login, POST to `/api/auth/session`.
  - Redirect to dashboard.

### 4.4. Protection
- Implement `src/middleware.ts`:
  - Perform a lightweight check for the `session` cookie presence for `/portal/*` and `/api/upload/*` routes.
  - Redirect to `/portal/login` if missing.
  - Note: Full token verification will happen in the `api/upload` route and on sensitive Portal pages using `firebase-admin` (Server Components).

### 4.5. Global Security
- `next.config.ts`: Add security headers.
  - **CSP**: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.googleapis.com; frame-src 'self' https://*.firebaseapp.com;`
  - **Other Headers**: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin.

## 5. Security Headers
```
Content-Security-Policy: ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
