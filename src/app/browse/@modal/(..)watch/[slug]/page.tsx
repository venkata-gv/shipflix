import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import ProjectModal from "@/components/project-modal";

export default async function ModalWatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectModal project={project} />;
}
