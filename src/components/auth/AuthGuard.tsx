import React, { FC } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <svg
        className="-ml-1 mr-3 h-8 w-8 animate-spin text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/auth/signin");
    }
  }, [status]);

  if (["loading", "unauthenticated"].includes(status)) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
