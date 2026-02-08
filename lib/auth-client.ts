"use client";

import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  plugins: [
    passkeyClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/verify-2fa";
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  passkey,
  twoFactor,
} = authClient;
