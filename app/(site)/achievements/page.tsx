import AchievementsContent from "@/components/sections/AchievementsContent";
import { getMilestones, getAwards, getStats } from "@/lib/get-data";

export const dynamic = "force-dynamic";

export default function AchievementsPage() {
  const milestones = getMilestones();
  const awards = getAwards();
  const stats = getStats();
  return <AchievementsContent milestones={milestones} awards={awards} stats={stats} />;
}
