import AboutContent from "@/components/sections/AboutContent";
import { getTeam } from "@/lib/get-data";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const team = getTeam();
  return <AboutContent team={team} />;
}
