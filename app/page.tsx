"use client";

import Link from "next/link";
import StarField from "@/components/StarField";
import { useEffect, useState } from "react";

const artistes = [
  {
    name: "Roxie Lin",
    chinese: "林若汐",
    tagline: "Artist. Engineer. Orbital Mission Specialist.",
    description:
      "A Singaporean singer of the 2040s whose music gives emotional shape to a nation in transition — sea walls, satellites, and the quiet things that survive progress.",
    slug: "roxie",
    accent: "#f5c842",
    available: true,
  },
  {
    name: "Coming Soon",
    chinese: "敬请期待",
    tagline: "A new voice is being born.",
    description: "",
    slug: "#",
    accent: "#555",
    available: false,
  },
  {
    name: "Coming Soon",
    chinese: "敬请期待",
    tagline: "A new voice is being born.",
    description: "",
    slug: "#",
    accent: "#555",
    available: false,
  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-sm tracking-[0.3em] uppercase text-white/70 font-light">
          Virtual Artistes
        </span>
        <div className="flex gap-8 text-xs tracking-widest uppercase text-white/40">
          <a href="#roster" className="hover:text-white/80 transition-colors">Roster</a>
          <a href="#vision" className="hover:text-white/80 transition-colors">Vision</a>
          <a href="#studio" className="hover:text-white/80 transition-colors">Studio</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField count={150} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(80,60,180,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-8">
          virtualartistes.ai
        </p>

        <h1
          className="text-6xl md:text-8xl font-extralight tracking-tight mb-6 leading-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          Born from
          <br />
          <span className="gradient-gold font-light">Imagination.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/40 font-light tracking-wide mb-4">
          Here to Stay.
        </p>

        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-12 mb-12" />

        <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed font-light">
          Virtual Artistes are fully realised creative personas — each with a
          world, a voice, and a story that extends beyond any single song. They
          are not avatars. They are artists.
        </p>

        <a
          href="#roster"
          className="inline-block mt-10 px-8 py-3 border border-white/20 text-white/60 text-xs tracking-[0.3em] uppercase hover:border-white/50 hover:text-white/90 transition-all duration-300"
        >
          Meet the Artistes
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20,20,40,0.6) 0%, transparent 80%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-12">
          The Vision
        </p>

        <blockquote className="text-2xl md:text-4xl font-extralight leading-relaxed text-white/80 mb-12">
          "Every artiste begins as a question —
          <br />
          <em className="text-white/50 not-italic">
            What if a life could be imagined whole?
          </em>
          "
        </blockquote>

        <p className="text-white/45 leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto">
          Virtual Artistes are not generated characters. Each one is a fully
          conceived human being — with childhood memories, formative losses,
          intellectual passions, and a reason to sing. Their music is written
          from the inside of a life, not the outside of an algorithm.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              label: "Identity First",
              body: "Before the first song, we build a life. A childhood. A city. A set of people who shaped them.",
            },
            {
              label: "Story-Driven Music",
              body: "Every song has an origin — a moment, a tension, a feeling that demanded expression.",
            },
            {
              label: "Enduring Worlds",
              body: "Our artistes exist across time. They grow, change, and leave things behind — just like anyone real.",
            },
          ].map((item) => (
            <div key={item.label} className="border border-white/8 p-6">
              <h3 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
                {item.label}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed font-light">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RosterSection() {
  return (
    <section id="roster" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-16 text-center">
          The Roster
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artistes.map((a, i) => (
            <div
              key={i}
              className={`relative group border transition-all duration-500 ${
                a.available
                  ? "border-white/15 hover:border-white/35"
                  : "border-white/5 opacity-40"
              }`}
            >
              <div
                className="h-px w-full"
                style={{ background: a.available ? a.accent : "#333" }}
              />

              <div className="p-8">
                {a.available ? (
                  <Link href={`/${a.slug}`} className="block">
                    <p className="text-xs tracking-widest uppercase text-white/30 mb-6">
                      {i === 0 ? "Debut Artiste" : `Artiste 0${i + 1}`}
                    </p>
                    <h2 className="text-2xl font-light mb-1">{a.name}</h2>
                    <p className="text-sm text-white/35 mb-6 font-light tracking-wide">
                      {a.chinese}
                    </p>
                    <p className="text-xs text-white/40 leading-relaxed mb-6 font-light">
                      {a.tagline}
                    </p>
                    {a.description && (
                      <p className="text-xs text-white/30 leading-relaxed font-light border-t border-white/8 pt-6">
                        {a.description}
                      </p>
                    )}
                    <div
                      className="mt-8 flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-300 group-hover:gap-4"
                      style={{ color: a.accent }}
                    >
                      Enter her world
                      <span>→</span>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-white/20 mb-6">
                      Coming Soon
                    </p>
                    <h2 className="text-2xl font-light mb-1 text-white/20">
                      {a.name}
                    </h2>
                    <p className="text-sm text-white/15 font-light tracking-wide">
                      {a.chinese}
                    </p>
                    <p className="text-xs text-white/20 mt-6 font-light">
                      {a.tagline}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section id="studio" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/25 mb-12">
          The Studio
        </p>
        <h2 className="text-3xl md:text-5xl font-extralight text-white/70 mb-8 leading-tight">
          Every artiste begins
          <br />
          with a childhood memory.
        </h2>
        <p className="text-white/40 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto">
          We build worlds before we build songs. A city, a decade, a family
          home. We give each artiste a reason to look up — and a reason to
          look back. Only then does the music begin.
        </p>

        <div className="mt-16 border border-white/8 p-8 text-left max-w-xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-4">
            Process
          </p>
          <ol className="space-y-4">
            {[
              "Conceive a life — a place, a time, a set of people",
              "Identify the emotional tensions that demand a song",
              "Build the world in detail — public and private",
              "Write music from inside that life",
              "Release the artiste into the world",
            ].map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/40 font-light">
                <span className="text-white/15 font-mono text-xs pt-0.5">
                  0{i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 tracking-wide">
        <span>© 2025 Virtual Artistes. All rights reserved.</span>
        <span className="text-white/10">virtualartistes.ai</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative bg-black">
      <Nav />
      <HeroSection />
      <VisionSection />
      <RosterSection />
      <StudioSection />
      <Footer />
    </main>
  );
}
