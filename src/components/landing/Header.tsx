import Link from "next/link";
import { Container } from "~/components/landing/Container";
import { Navlink } from "~/components/landing/Navlink";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-slate-200 py-10">
      <Container>
        <nav className="relative z-50 flex items-center justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </Link>
            <div className="hidden md:flex md:items-center md:gap-x-8">
              <Navlink href="#">All Products</Navlink>
              <Navlink href="#">Categories</Navlink>
              <Navlink href="#">Deals</Navlink>
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            {session ? (
              <Button
                variant="outlineSlate"
                className="rounded-full"
                href="/auth/signin"
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="outlineSlate"
                className="rounded-full"
                href="/dashboard/home"
              >
                Dashboard
              </Button>
            )}
            <Button variant="solidBlue" className="rounded-full">
              Get Started Day
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
