import Hero from "@/components/sections/Hero";
import SystemInit from "@/components/sections/SystemInit";
import Engineer from "@/components/sections/Engineer";
import Creator from "@/components/sections/Creator";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import GithubActivity from "@/components/sections/GithubActivity";
import Certifications from "@/components/sections/Certifications";
import Metrics from "@/components/sections/Metrics";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import PageShell from "@/components/system/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <SystemInit />
      <Engineer />
      <Creator />
      <Experience />
      <TechStack />
      <GithubActivity />
      <Certifications />
      <Metrics />
      <Process />
      <Contact />
    </PageShell>
  );
}
