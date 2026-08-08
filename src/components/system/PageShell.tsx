"use client";

import { useState, type ReactNode } from "react";
import Intro from "@/components/sections/Intro";
import Nav from "@/components/system/Nav";
import DotNav from "@/components/system/DotNav";
import ScrollProgress from "@/components/system/ScrollProgress";

/**
 * Owns the Intro boot-curtain's client state and wraps the page's content.
 * Split out from page.tsx so page.tsx can stay a Server Component — that's
 * what lets GithubActivity (an async Server Component doing a live fetch)
 * be composed in directly, rather than needing its own client-side fetch +
 * loading state. Server Component children passed into a Client Component
 * like this are still rendered on the server.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Intro onDone={() => setBooted(true)} />}
      <ScrollProgress />
      <Nav />
      <DotNav />
      <main>{children}</main>
    </>
  );
}
