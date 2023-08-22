"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";

interface Auth0ContextProviderProps {
  children: React.ReactNode;
}
function Auth0ContextProvider({ children }: Auth0ContextProviderProps) {
  return (
    <Auth0Provider
      domain="sample-assessment.jp.auth0.com"
      clientId="XAYOu71XQsLBanG8ojsxEQOfu2jOqukY"
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ContextProvider;
