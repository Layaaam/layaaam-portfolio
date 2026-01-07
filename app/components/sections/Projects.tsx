"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  type: "web" | "mobile";
}

const projects: Project[] = [
  {
    id: 1,
    title: "BUKTRACK",
    description:
      "A capstone mobile and web-based bus information and tracking system designed to improve commuter awareness and public transport transparency in Bukidnon. Features real-time location tracking and map-based visualization.",
    image: "/project-images/BUKTRACK-mobile.png",
    tags: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    link: "#",
    github: "#",
    type: "mobile",
  },
  {
    id: 2,
    title: "TRANSYNC",
    description:
      "An administrative web application developed as an initial foundation for managing fleet operations in BUKTRACK. Built to meet academic requirements and serve as the starting point for our capstone project.",
    image: "/project-images/TRANSYNC-web.png",
    tags: ["Laravel", "PostgreSQL", "Blade", "Tailwind CSS", "Leaflet"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 3,
    title: "CMUPin",
    description:
      "A community-based disaster and climate information system that allows households to pin locations, update safety status, and receive alerts from administrators such as the Disaster Risk Reduction Office.",
    image: "/project-images/CMUPin-web.png",
    tags: [
      "Laravel",
      "React",
      "Inertia.js",
      "Leaflet",
      "USGS Earthquake API",
      "Openstreetmap",
      "CartoDB",
      "Esri",
      "OpenTopoMap",
      "PostgreSQL",
    ],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 4,
    title: "NASA APOD Viewer",
    description:
      "A mobile application that consumes NASA's Astronomy Picture of the Day (APOD) API. Built as an introductory project to understand API integration, asynchronous data fetching, and mobile UI development.",
    image: "/project-images/APOD-mobile.png",
    tags: ["Flutter", "Dart", "NASA APOD API"],
    link: "#",
    github: "#",
    type: "mobile",
  },
  {
    id: 5,
    title: "The Blazer Website",
    description:
      "A work-in-progress web platform designed for announcements and content distribution to around 3,000+ subscribers, with user access and administrative controls for content management.",
    image: "/project-images/BLAZER-web.png",
    tags: ["React", "Vite", "TypeScript", "Supabase"],
    link: "#",
    github: "#",
    type: "web",
  },
  {
    id: 6,
    title: "Musica",
    description:
      "A native Android music player developed as a culmination of foundational programming courses, applying object-oriented programming concepts, core data structures and algorithms discussions such as queues, local data storage, and media handling.",
    image: "/project-images/MUSICA-mobile.png",
    tags: ["Android Studio", "Java", "SQLite"],
    link: "#",
    github: "#",
    type: "mobile",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + projects.length) % projects.length;

    if (position === 0) {
      return {
        transform:
          "translateX(0%) translateY(0%) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1)",
        opacity: 1,
        zIndex: 40,
        filter: "blur(0px) brightness(1)",
      };
    } else if (position === 1) {
      return {
        transform:
          "translateX(-5%) translateY(-35px) rotateY(8deg) rotateX(2deg) rotateZ(-3deg) scale(0.95)",
        opacity: 0.8,
        zIndex: 30,
        filter: "blur(0.5px) brightness(0.85)",
      };
    } else if (position === 2) {
      return {
        transform:
          "translateX(-10%) translateY(-70px) rotateY(12deg) rotateX(3deg) rotateZ(-5deg) scale(0.9)",
        opacity: 0.6,
        zIndex: 20,
        filter: "blur(1px) brightness(0.7)",
      };
    } else if (position === 3) {
      return {
        transform:
          "translateX(-15%) translateY(-105px) rotateY(15deg) rotateX(4deg) rotateZ(-7deg) scale(0.85)",
        opacity: 0.4,
        zIndex: 10,
        filter: "blur(1.5px) brightness(0.6)",
      };
    } else {
      return {
        transform:
          "translateX(-20%) translateY(-140px) rotateY(18deg) rotateX(5deg) rotateZ(-9deg) scale(0.8)",
        opacity: 0,
        zIndex: 0,
        filter: "blur(2px) brightness(0.5)",
      };
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 bg-gradient-to-b from-black/60 to-black/80"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-white text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
            Featured Projects
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Showcasing my projects I have learned and developed throughout my
            school and personal journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-white text-5xl font-bold mb-4">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-white/70 text-lg leading-relaxed">
              {activeProject.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white/80 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 
            TODO: Find a deployable sites for some of thse projects. Aside from the usual Vercel, Github Pages and Firebase Hosting
                  For the Mobile Application, still do some research and enhancements ont those
            */}
            {/* <div className="flex gap-4 pt-4">
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                >
                  <ExternalLink size={20} />
                  <span>View Live</span>
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  className="flex items-center justify-center gap-2 backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              )}
            </div> */}
          </div>

          <div
            className="relative h-[600px]"
            style={{ perspective: "2000px", perspectiveOrigin: "50% 50%" }}
          >
            <div className="relative w-full h-full flex items-center justify-end">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    ...getCardStyle(index),
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ${
                      project.type === "mobile"
                        ? "w-[340px] h-[600px]"
                        : "w-[600px] h-[300px]"
                    }`}
                  >
                    <div className="relative h-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                      <img
                        src={project.image || "/api/placeholder/800/600"}
                        alt={project.title}
                        className={`w-full h-full ${
                          project.type === "mobile"
                            ? "object-contain"
                            : "object-contain"
                        } opacity-90`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                        <h4 className="text-white text-2xl font-bold">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="group w-14 h-14 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-110 hover:border-green-500/50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ChevronLeft
              className="mx-auto text-white group-hover:text-green-400 transition-colors"
              size={24}
            />
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="group w-14 h-14 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-110 hover:border-green-500/50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ChevronRight
              className="mx-auto text-white group-hover:text-green-400 transition-colors"
              size={24}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
