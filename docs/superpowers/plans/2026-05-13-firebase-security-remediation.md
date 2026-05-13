# Firebase Auth Security Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Secure the Dipol-LTD application by replacing static token/localStorage auth with Firebase Auth and HttpOnly session cookies.

**Architecture:** Use Firebase Client SDK for user authentication, then exchange the ID Token for a secure HttpOnly session cookie via Next.js API routes and Firebase Admin SDK. Protection is enforced at the Middleware and Server Component levels.

**Tech Stack:** Next.js 16, Firebase (Client & Admin SDK), TypeScript.

---

### Task 1: Dependencies & Environment Setup

**Files:**
- Modify: `code/package.json`
- Create: `code/.env.example`

- [ ] **Step 1: Install Firebase dependencies**
Run: `pnpm add firebase firebase-admin`

- [ ] **Step 2: Create .env.example with required variables**
```text
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

- [ ] **Step 3: Commit**
```bash
git add code/package.json code/pnpm-lock.yaml code/.env.example
git commit -m "chore: add firebase dependencies and env template"
```

---

### Task 2: Firebase Initialization (Client & Admin)

**Files:**
- Create: `code/src/lib/firebase/config.ts`
- Create: `code/src/lib/firebase/admin.ts`

- [ ] **Step 1: Create client-side config**
```typescript
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
```

- [ ] **Step 2: Create admin SDK config**
```typescript
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = admin.auth();
```

- [ ] **Step 3: Commit**
```bash
git add code/src/lib/firebase/
git commit -m "feat: initialize firebase client and admin sdk"
```

---

### Task 3: Session API Routes

**Files:**
- Create: `code/src/app/api/auth/session/route.ts`
- Create: `code/src/app/api/auth/logout/route.ts`

- [ ] **Step 1: Implement session creation route**

```typescript
import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    (await cookies()).set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}
```

- [ ] **Step 2: Implement logout route**

```typescript
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("session");
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Commit**
```bash
git add code/src/app/api/auth/session/route.ts code/src/app/api/auth/logout/route.ts
git commit -m "feat: add session and logout api routes"
```

---

### Task 4: Update Login Page

**Files:**
- Modify: `code/src/app/portal/login/page.tsx`

- [ ] **Step 1: Replace mock login with Firebase sign-in**

```typescript
// Replace mock login logic with:
import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

// ... inside handleLogin
const userCredential = await signInWithEmailAndPassword(auth, username, password);
const idToken = await userCredential.user.getIdToken();

const sessionResponse = await fetch("/api/auth/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idToken })
});

if (sessionResponse.ok) {
  router.push("/portal/dashboard");
}
```

- [ ] **Step 2: Remove localStorage logic**

- [ ] **Step 3: Commit**
```bash
git add code/src/app/portal/login/page.tsx
git commit -m "feat: integrate firebase auth into login page"
```

---

### Task 5: Middleware & Page Protection

**Files:**
- Create: `code/src/middleware.ts`
- Modify: `code/src/app/portal/dashboard/page.tsx`
- Modify: `code/src/app/api/upload/route.ts`

- [ ] **Step 1: Create middleware for route protection**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session && (request.nextUrl.pathname.startsWith("/portal") && !request.nextUrl.pathname.startsWith("/portal/login"))) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/api/upload") && !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/api/upload/:path*"],
};
```

- [ ] **Step 2: Remove localStorage check from Dashboard**

- [ ] **Step 3: Update Upload API to use session cookie verification**

```typescript
import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

async function isAuthorized() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return false;
  try {
    await adminAuth.verifySessionCookie(session, true);
    return true;
  } catch {
    return false;
  }
}
```

---

### Task 6: Security Headers

**Files:**
- Modify: `code/next.config.ts`

- [ ] **Step 1: Add security headers to next.config.ts**
(CSP, X-Frame-Options, etc.)

- [ ] **Step 2: Commit**
```bash
git add code/next.config.ts
git commit -m "security: add security headers"
```
