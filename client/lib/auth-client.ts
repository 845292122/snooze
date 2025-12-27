import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [usernameClient()]
})

export const { signIn, signOut, signUp, useSession } = authClient

// "use client";
// import { authClient } from "@/lib/auth-client";

// const login = async () => {
//   await authClient.signIn.email({
//     email: "user@example.com",
//     password: "password123",
//     callbackUrl: "/dashboard"
//   });
// };

// // 第三方登录
// const loginGithub = async () => {
//   await authClient.signIn.social({ provider: "github" });
// };
