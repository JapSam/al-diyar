import ProjectDetail from "@/components/sections/ProjectDetail";
import { getProjects } from "@/lib/get-data";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allProjects = getProjects();
  const project = allProjects.find((p) => p.id === id);
  return <ProjectDetail project={project} allProjects={allProjects} />;
}
