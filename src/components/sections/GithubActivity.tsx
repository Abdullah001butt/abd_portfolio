import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";

const USERNAME = "Abdullah001butt";

type GithubUser = {
  public_repos: number;
  followers: number;
  created_at: string;
};

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

async function getGithubData() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=4`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user: GithubUser = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();

    return { user, repos: repos.filter((r) => !r.name.toLowerCase().includes("config")) };
  } catch {
    // Unauthenticated GitHub API calls are rate-limited (60/hr per IP) —
    // fail quietly to the fallback state below rather than breaking the page.
    return null;
  }
}

export default async function GithubActivity() {
  const data = await getGithubData();
  const memberSince = data ? new Date(data.user.created_at).getFullYear() : null;

  return (
    <section className="relative overflow-hidden bg-bg-void py-32" id="github">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Live Feed" title="Version Control" />

        {!data ? (
          <p className="mt-12 font-mono text-sm text-fg-dim">
            {"> "}Live feed unavailable right now — view directly on{" "}
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-red-bright underline">
              GitHub
            </a>
            .
          </p>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-3 gap-6 border-b border-line pb-10 sm:gap-10">
              <div>
                <p className="font-mono text-3xl text-fg sm:text-4xl">{data.user.public_repos}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-fg-dim">Public Repos</p>
              </div>
              <div>
                <p className="font-mono text-3xl text-fg sm:text-4xl">{data.user.followers}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-fg-dim">Followers</p>
              </div>
              <div>
                <p className="font-mono text-3xl text-fg sm:text-4xl">{memberSince}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-fg-dim">Member Since</p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {data.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="glass flex flex-col rounded-2xl p-6 transition-colors hover:border-red-bright/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-fg">{repo.name}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="font-mono text-xs text-fg-dim">★ {repo.stargazers_count}</span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-dim">
                    {repo.description ?? "No description provided."}
                  </p>
                  {repo.language && (
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: LANGUAGE_COLORS[repo.language] ?? "#9a9694" }}
                      />
                      <span className="text-[11px] uppercase tracking-widest text-fg-dim">{repo.language}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
