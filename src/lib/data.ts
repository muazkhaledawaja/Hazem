import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AboutContent,
  ContactContent,
  ExperienceRow,
  Project,
  SkillGroup,
  Video,
} from "@/lib/supabase/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}

export async function getExperience(): Promise<ExperienceRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as ExperienceRow[];
}

export async function getVideos(): Promise<Video[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("videos")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Video[];
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as SkillGroup[];
}

async function getSiteContent<T>(key: string): Promise<T | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return (data?.value ?? null) as T | null;
}

export async function getAbout() {
  return getSiteContent<AboutContent>("about");
}

export async function getContact() {
  return getSiteContent<ContactContent>("contact");
}
