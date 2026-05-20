import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";
import { PILLARS } from "@/lib/pillars";
import { EXPERIENCE } from "@/lib/experience";
import { GithubIcon } from "@/components/icons";
import { Mail, Phone, Download, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About · ShipFlix — Venkata Surendra Reddy G",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      <TopNav />

      <section className="px-6 pb-12 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft">
            About
          </div>
          <h1 className="display mt-2 text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-tight">
            Venkata Surendra Reddy G
          </h1>
          <div className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-muted">
            Senior AI/ML Engineer · MS Business Analytics · Chicago, IL
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5 text-[15px] leading-relaxed text-text/90">
              <p>
                I&apos;m an AI/ML engineer with five-plus years building GenAI systems
                end-to-end — from data → retrieval → reasoning → guardrails → UI →
                production deploy. My target roles are <span className="text-gold">Forward Deployed Engineer</span> and{" "}
                <span className="text-gold">AI Engineer</span> at AI-native companies that need someone who can
                walk into a customer&apos;s problem space and ship a working system in 14 days, not 14 sprints.
              </p>
              <p>
                What makes my profile rare for these roles isn&apos;t any single skill — it&apos;s the combination.
                I have an MS in Business Analytics, so I&apos;m comfortable in compliance reviews and finance
                reviews, not just engineering reviews. I&apos;ve shipped 6 GenAI projects spanning agents, RAG,
                MCP, multi-agent orchestration, and compliance-as-code — three are live, three are GitHub-public.
                And I treat token economics as a product decision: Groq for cheap throughput, Claude where a
                wrong fact is legal liability, Gemini Flash for high-volume cheap generation, no-LLM governance
                layers where appropriate.
              </p>
              <p>
                If you want to see the work the way recruiters do, hit <Link href="/browse" className="text-gold underline-offset-4 hover:underline">Browse</Link> and pick a
                profile. Each persona reorders the same six projects to match what that audience cares about.
              </p>
            </div>

            <aside className="space-y-3 rounded-xl bg-surface/60 p-6 ring-1 ring-white/5">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between rounded-lg bg-text px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-opacity hover:opacity-90"
              >
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Resume PDF
                </span>
                <span className="text-faint">2 pages</span>
              </a>
              <a
                href="https://github.com/surendra-gvsr"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-bg/30 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text transition-colors hover:border-white/25"
              >
                <GithubIcon className="h-4 w-4" />
                github.com/surendra-gvsr
              </a>
              <a
                href="mailto:gvsr32@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-bg/30 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text transition-colors hover:border-white/25"
              >
                <Mail className="h-4 w-4" />
                gvsr32@gmail.com
              </a>
              <a
                href="tel:+18726642156"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-bg/30 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text transition-colors hover:border-white/25"
              >
                <Phone className="h-4 w-4" />
                (872) 664-2156
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-bg/30 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text">
                <GraduationCap className="h-4 w-4" />
                <div className="leading-tight">
                  <div>MS Business Analytics</div>
                  <div className="text-faint">DePaul · Jun 2025</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="display text-3xl tracking-tight md:text-4xl">Three Pillars</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="rounded-xl bg-surface/60 p-6 ring-1 ring-white/5">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: `${p.accent}1A`, color: p.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="display mt-4 text-2xl tracking-tight" style={{ color: p.accent }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-text/90">{p.headline}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="display text-3xl tracking-tight md:text-4xl">Career Track</h2>
          <div className="relative mt-6 border-l border-white/10 pl-6">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="relative mb-7 pl-2">
                <span className="absolute -left-[31px] top-1.5 block h-2.5 w-2.5 rounded-full bg-gold" />
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                  {e.dates}
                </div>
                <div className="display mt-1 text-xl tracking-tight text-text">{e.role}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold-soft">
                  {e.org}
                </div>
                <div className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-text/85">
                  {e.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
