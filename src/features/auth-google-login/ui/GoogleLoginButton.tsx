"use client";

import Image from "next/image";
import { useGoogleLogin } from "../model/useGoogleLogin";

export const GoogleLoginButton = () => {
  const { signInWithGoogle, loading } = useGoogleLogin();

  return (
    <button
      className="gsi-material-button w-full"
      onClick={signInWithGoogle}
      disabled={loading}
    >
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Image
            src="/google-logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
        </div>
        <span className="gsi-material-button-contents">
          Google 계정으로 로그인
        </span>
        <span className="hidden">Google 계정으로 로그인</span>
      </div>
    </button>
  );
};
