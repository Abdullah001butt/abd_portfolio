import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid-bg relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-bg-void px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,3,0.85)_100%)]" />

      <p className="relative mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4em] text-red-bright/80">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-bright" />
        signal lost
      </p>

      <h1 className="font-display relative text-[22vw] font-medium leading-none text-fg sm:text-[14vw] md:text-[10vw]">
        404
      </h1>

      <p className="relative mt-6 max-w-md font-mono text-sm text-fg-dim">
        {"> "}Requested route not found in this system.
        <br />
        {"> "}Redirecting to known coordinates is recommended.
      </p>

      <Link
        href="/"
        data-cursor-hover
        className="glass relative mt-10 rounded-full border border-red-bright/40 px-8 py-3 text-xs uppercase tracking-[0.3em] text-fg transition-colors hover:border-red-bright"
      >
        Return to base
      </Link>
    </div>
  );
}
