import { FC } from "react";
import { AuthLayout } from "~/components/auth/AuthLayout";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";

const SignInPage = ({}) => {
  return (
    <>
      <Head>
        <title>TokoPaedi | SignIn</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col items-start gap-12">
          <div className="flex w-full flex-col items-start gap-14">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow"
            />
            <div className="flex w-full flex-col items-start gap-2">
              <h2 className="text-2xl font-semibold text-slate-950">
                Welcome Back!
              </h2>
              <span className="text-sm text-slate-500">
                Log in to go to dashboard admin panel!
              </span>
              <div className="mt-10 w-full">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    void signIn("discord", { callbackUrl: "/dashboard/home" });
                  }}
                >
                  <img
                    src="/discord.png"
                    alt="discord_logo"
                    className="mr-4 h-4 w-auto"
                  />{" "}
                  Login With Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default SignInPage;
