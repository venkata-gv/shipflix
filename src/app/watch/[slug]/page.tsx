import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import ProjectDetail from "@/components/project-detail";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main className="min-h-screen bg-bg">
      <TopNav />
      <ProjectDetail project={project} standalone />
      <Footer />
    </main>
  );
}
