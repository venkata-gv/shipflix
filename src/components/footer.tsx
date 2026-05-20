import Link from "next/link";
import { GithubIcon } from "./icons";
import { Mail, Phone, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/30 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Link href="/browse" className="display select-none text-4xl tracking-tight">
              <span className="text-text">SHIP</span>
              <span className="text-red">F</span>
              <span className="text-text">LIX</span>
            </Link>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Streaming production-grade AI
            </div>
            <div className="mt-4 max-w-md text-sm leading-relaxed text-text/85">
              Built by <span className="text-gold">Venkata Surendra Reddy G</span> — Senior AI/ML Engineer.
              Targeting Forward Deployed Engineer & AI Engineer roles. Five years
              shipping GenAI from prototype to production.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 md:gap-x-16">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Contact</div>
              <a
                href="mailto:gvsr32@gmail.com"
                className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text transition-colors hover:text-gold"
              >
                <Mail className="h-3 w-3" />
                gvsr32@gmail.com
              </a>
              <a
                href="tel:+18726642156"
                className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text transition-colors hover:text-gold"
              >
                <Phone className="h-3 w-3" />
                (872) 664-2156
              </a>
            </div>
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Links</div>
              <a
                href="https://github.com/surendra-gvsr"
                target="_blank"
                rel="noopener"
                className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text transition-colors hover:text-gold"
              >
                <GithubIcon className="h-3 w-3" />
                surendra-gvsr
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener"
                className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text transition-colors hover:text-gold"
              >
                <FileText className="h-3 w-3" />
                Resume PDF
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint">
            © 2026 · ShipFlix is a portfolio, not a streaming service. Inspired by Netflix.
            No affiliation. Built with Next.js · Tailwind · Framer Motion · pnpm.
          </div>
        </div>
      </div>
    </footer>
  );
}
