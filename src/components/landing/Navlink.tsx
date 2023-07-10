import React, { FC } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

interface NavlinkProps extends LinkProps {
  children: React.ReactNode;
}

export function Navlink({ children, href }: NavlinkProps) {
  return (
    <Link href={href} legacyBehavior>
      <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
        {children}
      </a>
    </Link>
  );
}
