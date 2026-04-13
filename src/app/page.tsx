import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Showreel from "@/components/Showreel";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getAbout,
  getContact,
  getExperience,
  getProjects,
  getSkillGroups,
  getVideos,
} from "@/lib/data";

export default async function Home() {
  const [projects, experience, videos, skillGroups, about, contact] = await Promise.all([
    getProjects(),
    getExperience(),
    getVideos(),
    getSkillGroups(),
    getAbout(),
    getContact(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <About content={about} />
      <Skills groups={skillGroups} />
      <Experience items={experience} />
      <Showreel videos={videos} />
      <Work projects={projects} />
      <Contact content={contact} />
      <Footer />
    </main>
  );
}
