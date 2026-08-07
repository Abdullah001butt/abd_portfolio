"use client";

import { useState } from "react";
import Intro from "@/components/sections/Intro";
import Hero from "@/components/sections/Hero";
import SystemInit from "@/components/sections/SystemInit";
import Engineer from "@/components/sections/Engineer";
import Creator from "@/components/sections/Creator";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Certifications from "@/components/sections/Certifications";
import Metrics from "@/components/sections/Metrics";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Nav from "@/components/system/Nav";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Intro onDone={() => setBooted(true)} />}
      <Nav />
      <main>
        <Hero />
        <SystemInit />
        <Engineer />
        <Creator />
        <Experience />
        <TechStack />
        <Certifications />
        <Metrics />
        <Process />
        <Contact />
      </main>
    </>
  );
}
