import fs from "fs";
import path from "path";
import { projects as defaultProjects } from "@/data/projects";
import { team as defaultTeam } from "@/data/team";
import { milestones as defaultMilestones, awards as defaultAwards, stats } from "@/data/achievements";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import type { Project } from "@/data/projects";
import type { TeamMember } from "@/data/team";
import type { Milestone, Award } from "@/data/achievements";
import type { Testimonial } from "@/data/testimonials";

const DATA_DIR = path.join(process.cwd(), "data-json");

function read<T>(name: string, fallback: T[]): T[] {
  const fp = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(fp)) return fallback;
  return JSON.parse(fs.readFileSync(fp, "utf-8"));
}

export function getProjects(): Project[] {
  return read<Project>("projects", defaultProjects);
}

export function getTeam(): TeamMember[] {
  return read<TeamMember>("team", defaultTeam);
}

export function getMilestones(): Milestone[] {
  return read<Milestone>("milestones", defaultMilestones);
}

export function getAwards(): Award[] {
  return read<Award>("awards", defaultAwards);
}

export function getTestimonials(): Testimonial[] {
  return read<Testimonial>("testimonials", defaultTestimonials);
}

export function getStats() {
  return stats;
}
