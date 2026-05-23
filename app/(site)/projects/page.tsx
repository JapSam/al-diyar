import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { getProjects } from "@/lib/get-data";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getProjects();
  return <ProjectsGrid projects={projects} />;
}
