import { betterAuth } from "better-auth";
import { pool } from "./db/postgres";
import { passkey } from "@better-auth/passkey";
import { twoFactor } from "better-auth/plugins";
import bcrypt from "bcrypt";

export const auth = betterAuth({
  database: pool,
  appName: "Atelier Logos",
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 10);
      },
      verify: async ({ hash, password }) => {
        return await bcrypt.compare(password, hash);
      },
    },
  },
  plugins: [
    passkey({
      rpID: process.env.NODE_ENV === "production"
        ? "atelierlogos.studio"
        : "localhost",
      rpName: "Atelier Logos",
      origin: process.env.NODE_ENV === "production"
        ? "https://www.atelierlogos.studio"
        : "http://localhost:3000",
    }),
    twoFactor({
      issuer: "Atelier Logos",
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "guest",
        input: false, // This field is set programmatically, not by users
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
