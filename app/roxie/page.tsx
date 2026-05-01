"use client";

import Link from "next/link";
import StarField from "@/components/StarField";
import { useEffect, useRef, useState } from "react";

/* ── Scroll-reveal hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-px bg-white/8" />
      <div className="w-1 h-1 rounded-full bg-white/20" />
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

/* ── Collapsible Lyrics ── */
function LyricsBlock({ lyrics }: { lyrics: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/3 transition-colors"
      >
        <span className="text-xs tracking-[0.35em] uppercase text-white/30">
          {open ? "Hide" : "Read"} Lyrics
        </span>
        <span className="text-white/20 text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-8 border-t border-white/5">
          <pre className="text-sm text-white/45 leading-loose font-light whitespace-pre-wrap font-sans mt-6">
            {lyrics}
          </pre>
          <p className="text-xs text-white/15 mt-6 border-t border-white/5 pt-4">
            Copyright 2025–2026 Luminaire Virtual AI Artistes Group
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs tracking-[0.35em] uppercase text-white/35 hover:text-white/70 transition-colors"
        >
          ← Virtual Artistes
        </Link>
        <span className="text-xs tracking-[0.3em] uppercase text-white/25">
          Roxie Lin · 林若汐
        </span>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField count={200} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 15% 40%, rgba(0,180,255,0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 85% 60%, rgba(220,0,180,0.13) 0%, transparent 60%)",
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(80,40,200,0.1) 0%, transparent 70%)",
          ].join(","),
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div
          className="transition-all duration-1200"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-xs tracking-[0.6em] uppercase text-white/25 mb-10">
            Virtual Artistes · Debut
          </p>
          <h1 className="text-7xl md:text-9xl font-thin mb-3 leading-none tracking-tight">
            Roxie
          </h1>
          <h1
            className="text-7xl md:text-9xl font-thin mb-6 leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="gradient-gold">Lin</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/30 font-extralight tracking-[0.2em] mb-10">
            林若汐
          </p>
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-white/25 mb-16">
            <span>Artist</span>
            <span className="text-white/15">·</span>
            <span>Engineer</span>
            <span className="text-white/15">·</span>
            <span>Orbital Mission Specialist</span>
          </div>
          <p className="text-sm md:text-base text-white/40 max-w-lg mx-auto leading-relaxed font-light">
            Born in 2005. Raised in the heartlands of Singapore.
            <br />
            Daughter of three frontiers — the sea, the atom, and the sky.
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] tracking-widest uppercase">Her Story</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

/* ── Chapter: The Daughter ── */
function ChapterDaughter() {
  return (
    <section className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(20,30,80,0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-12">Chapter I</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/80 mb-10 leading-tight">
            The Daughter
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-white/50 leading-relaxed text-base md:text-lg font-light mb-8">
            Roxie Lin grew up in the heartlands of Singapore — where old playgrounds gave way
            to new skylines, and familiar coastlines slowly transformed under the pressure of
            rising seas and human ambition.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="text-white/40 leading-relaxed text-sm md:text-base font-light mb-8">
            Her home was shaped by two quiet but powerful forces. A father whose steady,
            understated love anchored her emotional world. And a mother who taught physics —
            filling her childhood with constellations, equations, and the wonder of looking up.
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="border-l-2 border-amber-400/30 pl-8 my-12">
            <p className="text-white/60 text-lg md:text-xl font-extralight italic leading-relaxed">
              "From them, Roxie inherited both tenderness and precision —
              a rare combination that would define her life and art."
            </p>
          </div>
        </Reveal>
        <Reveal delay={450}>
          <p className="text-white/40 leading-relaxed text-sm md:text-base font-light">
            As a child, she spent evenings at East Coast Park — cycling with her father beneath
            old underpasses, looking up at the stars with her mother, who taught her that the
            universe was not merely beautiful, but knowable. Those early experiences — salt
            wind, city light, silence, and science — would become the emotional grammar of
            her later music.
          </p>
        </Reveal>
        <Reveal delay={550}>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "East Coast Park", sub: "Her first classroom" },
              { label: "Salt Wind", sub: "Her first teacher" },
              { label: "The Stars", sub: "Her first language" },
            ].map((item) => (
              <div key={item.label} className="border border-white/8 p-5">
                <p className="text-xs text-white/50 tracking-wide mb-1">{item.label}</p>
                <p className="text-xs text-white/25 font-light">{item.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Chapter: The Student ── */
function ChapterStudent() {
  return (
    <section className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(10,30,60,0.3) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-12">Chapter II</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/80 mb-10 leading-tight">
            The Student
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-white/50 leading-relaxed text-base md:text-lg font-light mb-8">
            In 2026, Roxie entered Nanyang Technological University. She graduated in 2031
            with First Class Honours in Aerospace Engineering — alongside an advanced track in
            Physics & Energy Studies, focusing on nuclear physics, fission energy, orbital
            mechanics, and space power systems.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="text-white/40 leading-relaxed text-sm md:text-base font-light mb-10">
            She trained inside Singapore's growing space ecosystem, shaped by NTU's Satellite
            Research Centre — the institution behind VELOX-I, the first Singapore nanosatellite
            to operate in low Earth orbit. She quickly developed a reputation not only for
            academic excellence, but for an unusual ability to connect hard engineering with
            human meaning.
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="border border-white/8 p-8 my-10">
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-6">NTU · 2026–2031</p>
            <div className="space-y-3">
              {[
                "Aerospace Engineering, First Class Honours",
                "Advanced track: Physics & Energy Studies",
                "Nuclear physics & fission energy",
                "Orbital mechanics & space power systems",
                "NTU Satellite Research Centre (SaRC)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/40 font-light">
                  <div className="w-1 h-1 rounded-full bg-amber-400/40 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={450}>
          <p className="text-white/35 leading-relaxed text-sm font-light">
            The university years gave her the technical vocabulary to describe what she had
            always felt — that the stars were not distant, but reachable. That the sea was not
            a boundary, but a beginning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Chapter: The Mission Specialist ── */
function ChapterMission() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(80,55,5,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-12">Chapter III</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/80 mb-10 leading-tight">
            The Mission
            <br />
            <span className="gradient-gold">Specialist</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-white/50 leading-relaxed text-base md:text-lg font-light mb-8">
            By the late 2030s, Singapore's national space ambitions had accelerated. Following
            the establishment of the National Space Agency of Singapore (NSAS) in 2026, the
            country began moving toward human-space systems, orbital infrastructure, and
            strategic space governance.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="text-white/40 leading-relaxed text-sm md:text-base font-light mb-10">
            Roxie was selected as one of the first members of Singapore's Orbital Mission
            Specialist pathway — an elite cadre designed not as traditional astronauts, but as
            highly specialised engineers for international crewed missions and in-space
            industrial systems.
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="border-l-2 border-amber-400/40 pl-8 my-12">
            <p className="text-amber-400/70 text-xs tracking-[0.3em] uppercase mb-3">
              2039 — First Orbital Mission
            </p>
            <p className="text-white/60 text-lg md:text-xl font-extralight italic leading-relaxed">
              "Not a country with the biggest rockets, but a country indispensable to the
              systems, people, and precision that made space industry possible."
            </p>
          </div>
        </Reveal>
        <Reveal delay={450}>
          <p className="text-white/40 leading-relaxed text-sm font-light mb-10">
            Her specialty: autonomous orbital construction, radiation-hardened power systems,
            and equatorial tether infrastructure — the technologies that would eventually
            underpin Singapore's role in the world's first viable equatorial orbital-lift
            network.
          </p>
        </Reveal>
        <Reveal delay={550}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { year: "2026", event: "NSAS Established" },
              { year: "2031", event: "NTU First Class Honours" },
              { year: "2039", event: "First Orbital Mission" },
            ].map((item) => (
              <div key={item.year} className="border border-amber-400/15 p-5">
                <p className="gradient-gold text-xl font-light mb-1">{item.year}</p>
                <p className="text-xs text-white/35 font-light">{item.event}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Chapter: The Singapore She Knew ── */
function ChapterSingapore() {
  return (
    <section className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 40% 60%, rgba(10,40,80,0.3) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-12">Chapter IV</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/80 mb-10 leading-tight">
            The Singapore
            <br />
            She Knew
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-white/50 leading-relaxed text-base md:text-lg font-light mb-12">
            By the 2040s, Roxie lived in a Singapore transformed by three great national
            projects — each reshaping not just the city, but the emotional landscape of
            a generation.
          </p>
        </Reveal>
        <div className="space-y-8">
          {[
            {
              number: "01",
              title: "The Sea",
              subtitle: "Coastal Defence",
              body: "A city defending itself against the rising ocean — through Long Island and a new generation of adaptive shorelines. Roxie watched coastlines she had known as a child become something new, something built, something chosen.",
              delay: 250,
            },
            {
              number: "02",
              title: "The Atom",
              subtitle: "Advanced Clean Energy",
              body: "Nuclear and ultra-dense resilient power systems underpinning desalination, cooling, urban stability, and deep-space infrastructure. The science her mother had taught her as wonder was now national necessity.",
              delay: 400,
            },
            {
              number: "03",
              title: "The Sky",
              subtitle: "Spacefaring Capability",
              body: "Singapore as a global leader in orbital systems, mission control, space sustainability, and equatorial infrastructure. Not the country with the largest ambitions, but the country that made the ambitions of others possible.",
              delay: 550,
            },
          ].map((item) => (
            <Reveal key={item.number} delay={item.delay}>
              <div className="border border-white/8 p-8 hover:border-white/18 transition-colors duration-500">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-extralight text-white/10 font-mono">
                    {item.number}
                  </span>
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-1">
                      {item.subtitle}
                    </p>
                    <h3 className="text-xl font-light text-white/75 mb-3">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SONGS
═══════════════════════════════════════════ */

const SONG_TAI_WAN = `[Verse 1]
这些年来 我活得不算坏
只是夜里 偶尔会醒来
窗外的风 吹得人感慨
像你当年 轻轻走开

[Verse 2]
数十年前 我不懂去爱
总把沉默 当成了坦白
以为错过 也不过是意外
没想到会 赔上一生等待

[Chorus]
是我太晚明白 太晚去爱
太晚说出 心里的对白
等到失去 才懂你珍贵
等到天黑 才知道你是光彩
是我太晚明白 太晚释怀
太晚承认 我真的失败
时光流逝 你已不在
可我这一生 还走不出来

[Verse 3]
朋友都说 人总要向前看
我也笑着 说自己习惯
只是没人 看见我眼眶泛红
还会对着 回忆轻声感叹

[Bridge]
如果那年 我没有走太快
如果那天 我肯留下来
也许如今 不是一个人看海
也许我还 靠在你胸怀

[Chorus]
是我太晚明白 太晚去爱
太晚说出 心里的对白
等到失去 才懂你珍贵
等到天黑 才知道你是光彩
是我太晚明白 太晚释怀
太晚承认 我真的失败
时光流逝 你已不在
可我这一生 还走不出来

[Outro]
是我太晚明白 太晚去爱
把最好的你 变成了意外
数十年后 我还在等待
等一句 如果能重来`;

const SONG_DONGHAI = `[主歌 1]
小时候你 带我去看海
单车后座 载着小小期待
东海岸的 风轻轻吹来
吹过头发 也吹过云彩
你话不多 却总在身旁
夕阳落下 把影子拉长
我在前面 摇晃着翅膀
你在后面 守着我飞翔

[副歌]
东海岸的风 轻轻地吹来
吹过那些年 也吹过现在
你曾经的背影 那么伟岸
如今却慢慢 走得慢下来
东海岸的风 轻轻地吹来
我终于明白 你的关怀
你还是你 只是岁月已在
把那个少年 轻轻藏起来

[主歌 2]
如今的你 已七十岁外
白了发角 也慢了步态
你总笑着说 一切都还好
我却见岁月 改了你神态
你的眼里 还是那片海
还藏着当年 那样的风采
只是手肩 不再像从前
不能再一手 把我抱起来

[过渡]
我才明白 有些爱存在
不是热烈 却能到未来
原来最深 的那一种爱
是你静静 在我身旁陪伴

[尾副歌]
东海岸的风 轻轻地吹来
吹过童年 也吹过未来
如果时间 能回到那天
我还想坐在 你的车后排
东海岸的风 轻轻地吹来
原来最深 的那一种爱
从来不必 表达出来
而是你一直 风雨都在`;

const SONG_STARS = `[Verse 1]
My mother took me where the skyline met the night
Where the sea ran dark beneath the eastern light
She pointed above all the ships and planes
And whispered the sky had a thousand names

I was a child with the sea in my eyes
She traced out worlds I could not yet find
Beneath the glow of the evening sky
She said the night held more than meets the eye

[Chorus]
The night my mother named the stars
They felt like ours, yet felt so far
Above a city by the sea
She gave the sky to someone small like me

[Verse 2]
Then I learned numbers, I learned the weight
Of borrowed fire, of time and fate
The silent dark, the edge of light
What it takes to outlast the night

Now seawalls rise where the water meets the sky
Now lit like diamonds by constellations of satellites
Through the dark, we've come so far
Yet I still return to where you are

[Chorus]
The night my mother named the stars
They felt like ours, yet felt so far
Above a city by the sea
She gave the sky to someone small like me

[Bridge]
We were a port of rain and light
And reached beyond into the night
A nation small, but dreaming far
One day we'd learn to touch the stars

[Final Chorus / Outro]
And this city learned to face the sky
To lift its heart, to wonder why
But through the dark, through all we are
I still hear her…
Naming every star`;

function SongCard({
  index,
  chineseTitle,
  englishTitle,
  language,
  pullQuote,
  story,
  lyrics,
  accent,
  youtubeNote,
}: {
  index: string;
  chineseTitle?: string;
  englishTitle?: string;
  language: string;
  pullQuote: string;
  story: string;
  lyrics: string;
  accent: string;
  youtubeNote?: string;
}) {
  return (
    <div className="relative">
      {/* accent line */}
      <div className="w-12 h-px mb-8" style={{ background: accent }} />

      <Reveal>
        <p className="text-xs tracking-[0.4em] uppercase text-white/20 mb-4">
          {index} · {language}
        </p>
        {chineseTitle && (
          <h3 className="text-3xl md:text-5xl font-extralight text-white/85 mb-2 leading-tight">
            {chineseTitle}
          </h3>
        )}
        {englishTitle && (
          <h3
            className={`${chineseTitle ? "text-lg md:text-2xl font-extralight text-white/35 mb-8" : "text-3xl md:text-5xl font-extralight text-white/85 mb-8"} leading-tight`}
          >
            {englishTitle}
          </h3>
        )}
        {!chineseTitle && <div className="mb-8" />}
      </Reveal>

      <Reveal delay={150}>
        <div className="border-l-2 pl-6 mb-8" style={{ borderColor: `${accent}55` }}>
          <p
            className="text-base md:text-lg font-extralight italic leading-relaxed"
            style={{ color: `${accent}cc` }}
          >
            "{pullQuote}"
          </p>
        </div>
      </Reveal>

      <Reveal delay={250}>
        <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mb-2">
          {story}
        </p>
        {youtubeNote && (
          <p className="text-white/20 text-xs leading-relaxed font-light mt-4 italic">
            {youtubeNote}
          </p>
        )}
      </Reveal>

      <Reveal delay={350}>
        <LyricsBlock lyrics={lyrics} />
      </Reveal>
    </div>
  );
}

/* ── Chapter: The Songs ── */
function ChapterSongs() {
  return (
    <section className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40,20,80,0.2) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-4">Chapter V</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/80 mb-6 leading-tight">
            The Songs
          </h2>
          <p className="text-white/35 text-sm md:text-base leading-relaxed font-light mb-20 max-w-xl">
            Her music is built from the quiet things that survive progress — a father's hand on
            a bicycle seat, a mother naming the stars, the memory of old East Coast Park before
            the sea walls.
          </p>
        </Reveal>

        <div className="space-y-24">

          {/* Song 1 */}
          <SongCard
            index="Song 01"
            chineseTitle="太晚明白"
            englishTitle="Too Late to Understand"
            language="Mandarin"
            accent="#f5c842"
            pullQuote="是我太晚明白 太晚去爱 — 把最好的你 变成了意外"
            story="A reflective ballad set in 2050 Singapore — a city of vertical gardens, luminous coastal defences, and rocket launches that are now national memory. Roxie stands in the middle of extraordinary progress and feels something timeless: the quiet ache of realising that life's deepest truths arrive only after the moment has passed. Written for Father's Day, 《太晚明白》 is not only a heartbreak song. It is about regret in its fullest sense — not treasuring someone enough, not saying the right words in time, not noticing that a season of life was already ending. Some evenings, some places, some conversations never come back."
            lyrics={SONG_TAI_WAN}
            youtubeNote="Released April 27, 2026 · 太晚明白"
          />

          <div className="w-full h-px bg-white/5" />

          {/* Song 2 */}
          <SongCard
            index="Song 02"
            chineseTitle="东海岸的风"
            englishTitle="The East Coast Wind"
            language="Mandarin"
            accent="#7eb8f5"
            pullQuote="你在后面 守着我飞翔 — 原来最深的那一种爱，从来不必表达出来"
            story="The East Coast wind becomes the soul of this song. As it brushes across Roxie's face on a transformed 2050 shoreline, she is carried back to simpler days — sitting on the back of her father's bicycle at East Coast Park, hair lifted by the sea air, watching the horizon pass. He was never a man of many words, but he was always there: quiet, steady, protective. Her father is now past seventy. His hair has turned white, his steps are slower. And that is where the song quietly breaks the heart — not because love has faded, but because it has remained, constant enough to be mistaken for something ordinary."
            lyrics={SONG_DONGHAI}
          />

          <div className="w-full h-px bg-white/5" />

          {/* Song 3 */}
          <SongCard
            index="Song 03"
            englishTitle="The Night My Mother Named the Stars"
            language="English"
            accent="#c4b5fd"
            pullQuote="She gave the sky to someone small like me — and this city learned to face the sky"
            story="A cinematic English ballad set in the 2050s, where Singapore has become a spacefaring nation. Satellites glitter above reclaimed coastlines, launch systems rise beyond the eastern seaboard. But Roxie's emotional compass points backward — to the night her mother, a physics teacher, stood by the sea and named the stars. That memory is the heart of the song. Before there was science, there was love. Before there was achievement, there was a mother's voice. Before there was a nation reaching for the stars, there was a child being taught to look up."
            lyrics={SONG_STARS}
          />

        </div>

        <Reveal delay={200}>
          <div className="mt-20 border border-white/8 p-8 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-white/20 mb-4">Listen</p>
            <p className="text-white/30 text-sm font-light mb-6">
              All songs available on YouTube
            </p>
            <a
              href="https://www.youtube.com/@lin-ruoxi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 border border-amber-400/30 text-amber-400/70 text-xs tracking-[0.3em] uppercase hover:border-amber-400/60 hover:text-amber-400 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5C1.6 4.4.8 5.2.5 6.2.0 8.1.0 12 .0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
              @lin-ruoxi on YouTube
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Chapter: The Legacy ── */
function ChapterLegacy() {
  return (
    <section className="relative min-h-[80vh] flex items-center py-32 px-6 overflow-hidden">
      <StarField count={80} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(60,50,10,0.25) 0%, rgba(20,20,60,0.2) 50%, transparent 100%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-12">
            Chapter VI · Legacy
          </p>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/75 mb-8 leading-tight">
            By the 2050s, Roxie Lin
            <br />
            is remembered as more
            <br />
            than an artist.
          </h2>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-xl md:text-2xl text-white/40 font-extralight leading-relaxed mb-12">
            She is remembered as a daughter of three frontiers —
          </p>
        </Reveal>
        <Reveal delay={600}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {["The Sea", "The Atom", "The Sky"].map((frontier, i) => (
              <div key={frontier} className="text-center">
                <p className="gradient-gold text-2xl md:text-3xl font-light mb-1">{frontier}</p>
                <p className="text-xs text-white/20 tracking-widest uppercase">
                  {["Coastal Frontier", "Energy Frontier", "Space Frontier"][i]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={800}>
          <div className="mt-20">
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-8" />
            <Link
              href="/"
              className="inline-block text-xs tracking-[0.4em] uppercase text-white/25 hover:text-white/60 transition-colors"
            >
              ← Back to Virtual Artistes
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/15 tracking-wide">
        <span>Roxie Lin · 林若汐 · Virtual Artiste</span>
        <span>© 2025–2026 Luminaire Virtual AI Artistes Group</span>
      </div>
    </footer>
  );
}

export default function RoxiePage() {
  return (
    <main className="relative" style={{ background: "#07071a" }}>
      <Nav />
      <Hero />
      <Divider />
      <ChapterDaughter />
      <Divider />
      <ChapterStudent />
      <Divider />
      <ChapterMission />
      <Divider />
      <ChapterSingapore />
      <Divider />
      <ChapterSongs />
      <Divider />
      <ChapterLegacy />
      <Footer />
    </main>
  );
}
