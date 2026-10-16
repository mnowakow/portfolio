import { Button, Card, IconButton, Tabs, Timeline, Typography } from "@material-tailwind/react";
import { IconoirProvider, OpenNewWindow } from "iconoir-react";
import { useState, useEffect, type JSX } from "react";
import mn_portrait_1 from "./assets/mn_portrait_3.webp";
import dob_preview from "./assets/tablet-interaction.webp";
import loscope_preview from "./assets/loscope_model.webp";
import vibe_preview from "./assets/vibe-interface.webp";
import { bestPaperAward, publicationsByYear } from "./Publications";
import type { pageIds } from "./Helper";
import { SOCIAL_LINKS } from "./socialLinks";

interface HomeProps {
  setPageId: (id: pageIds) => void;
}

const SECTION_IDS = ["hello", "use-cases", "bio", "research", "side-projects"] as const;
// Side projects are not in the tab bar at first. Their tab shows up once a
// visitor has scrolled that far, and stays until the page is reloaded.
const HIDDEN_TAB_ID = "side-projects";
const TAB_IDS = SECTION_IDS.filter((id) => id !== HIDDEN_TAB_ID);
const TAB_LABELS: Record<string, string> = { "side-projects": "SIDE PROJECTS" };
// Module level on purpose: survives a detour to a project page, resets on reload.
let sideTabUnlockedThisLoad = false;


function Home({ setPageId }: HomeProps) {
  const sectionMap: Record<(typeof SECTION_IDS)[number], JSX.Element> = {
    hello: <Hello />,
    "use-cases": <UseCases setPageId={setPageId} />,
    bio: <Bio />,
    research: <Research />,
    "side-projects": <SideProjects setPageId={setPageId} />,
  };

  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const [sideTabUnlocked, setSideTabUnlocked] = useState(() => sideTabUnlockedThisLoad);
  const tabIds: readonly string[] = sideTabUnlocked ? SECTION_IDS : TAB_IDS;

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    // While a tab click scrolls smoothly, the observer would flicker through
    // every section in between, so it pauses briefly after any click.
    let clicked = false;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    function onClick() {
      clicked = true;
    }
    document.addEventListener("click", onClick);

    const observer = new IntersectionObserver(
      (entries) => {
        if (clicked && !entries.some((e) => e.isIntersecting && e.target.id === HIDDEN_TAB_ID)) {
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            clicked = false;
          }, 500);
          return;
        }
        const mostVisible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        if (mostVisible.target.id === HIDDEN_TAB_ID) {
          sideTabUnlockedThisLoad = true;
          setSideTabUnlocked(true);
        }
        setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(resetTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center gap-4 border border-transparent md:rounded-full md:bg-transparent px-2 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500">
        <div className="flex max-w-full flex-col items-center gap-2 overflow-x-auto rounded-3xl p-1 md:flex-row md:justify-center md:gap-8 md:rounded-full">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="flex items-center justify-center gap-4 rounded-full">
            <Tabs.List className="flex h-11 items-center justify-center gap-1 rounded-full border border-transparent bg-amber-300 p-1 md:gap-4">
              {tabIds.map((id) => (
                <Tabs.Trigger
                  key={id}
                  className={
                    id === HIDDEN_TAB_ID
                      ? "shrink-0 px-2 whitespace-nowrap animate-in fade-in zoom-in-75 duration-500 md:px-3"
                      : "shrink-0 px-2 whitespace-nowrap md:w-28 md:px-3"
                  }
                  value={id}
                  onClick={() => scrollToSection(id)}
                >
                  {TAB_LABELS[id] ?? id.replace("-", " ").toUpperCase()}
                </Tabs.Trigger>
              ))}
              <Tabs.TriggerIndicator className="rounded-full bg-zinc-100" />
            </Tabs.List>
          </Tabs>
          <div className="flex h-11 shrink-0 content-center items-center justify-center gap-2 rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 border border-transparent bg-amber-300 p-1 shadow-md shadow-black/20 md:gap-6">
            <IconoirProvider
              iconProps={{
                color: "black",
                strokeWidth: 1.5,
                width: "1.5em",
                height: "1.5em",
              }}
            >
              {SOCIAL_LINKS.map((l) => (
                <IconButton
                  key={l.label}
                  as="a"
                  href={l.href}
                  aria-label={l.label}
                  {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  size="sm"
                  className="rounded-full border-transparent bg-transparent hover:bg-amber-200"
                >
                  {l.icon}
                </IconButton>
              ))}
            </IconoirProvider>
          </div>
        </div>
      </header>

      <main className="pt-36 md:pt-0">
        {Object.entries(sectionMap).map(([key, element]) => (
          <div key={key}>{element}</div>
        ))}
      </main>
    </>
  );
}

export default Home;

function Hello(): JSX.Element {
  return (
    <section id="hello" className="flex flex-col items-center justify-center gap-16 px-8 pt-12 pb-32 md:pt-24">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
        <div className="flex translate-y-0 flex-col gap-8">
          <Typography type="h1" className="whitespace-nowrap text-right text-4xl leading-tight font-bold text-gray-100 md:text-5xl lg:text-5xl">
            Matthias Nowakowski
          </Typography>
          <Typography type="h2" className="whitespace-nowrap text-right text-2xl leading-tight font-semibold text-amber-300 md:text-3xl lg:text-3xl">
            Research-based Product Engineer
          </Typography>
          <Typography type="h3" className="whitespace-nowrap text-right text-xl leading-tight text-gray-400 md:text-2xl lg:text-2xl">
            I build the software, <br /> you do the creative work.
            <br />
            <br /> Understand. Build. Ship.
          </Typography>
        </div>
        <div className="aspect-square w-full max-w-md overflow-hidden rounded-[3rem] rounded-bl-none">
          <img src={mn_portrait_1} alt="Portrait of Matthias Nowakowski" className="h-full w-full scale-[1.5] translate-y-[23%] object-cover object-[40%_50%]" />
        </div>
      </div>
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-left leading-normal text-lg text-gray-400">
         I came to software through music. I studied musicology with a focus on electroacoustic music, where you think in sound and structure rather than notes on a page. That instinct never left me.
        </p>
        <p className="text-left leading-normal text-lg text-gray-400">
          From there I moved into IT, working in consulting and learning to build software instead of just studying it. Music informatics is where those two halves finally met. Today I build notation
          and authoring tools, prototype interactive scores, and research how people actually interact with music notation.
        </p>
        <p className="text-left leading-normal text-lg text-gray-400">
          The path through these fields was really one. Music taught me to see the artist behind every artifact, and how it affects the audience. Engineering taught me to build what people actually need.
          And the work I do now needs both.
        </p>
      </div>
    </section>
  );
}

type ProjectTeaser = { id: pageIds; title: string; description: JSX.Element; image?: string; imageAlt?: string };

function ProjectCard({ project, setPageId }: { project: ProjectTeaser; setPageId: HomeProps["setPageId"] }): JSX.Element {
  return (
    <Card className="flex w-80 flex-col overflow-hidden">
      {project.image && (
        <Card.Header as="img" src={project.image} alt={project.imageAlt ?? ""} loading="lazy" className="m-0 h-44 w-full rounded-none object-cover object-top" />
      )}
      <Card.Body className="flex-1">
        <a
          href={`#${project.id}`}
          onClick={(e) => {
            e.preventDefault();
            setPageId(project.id);
          }}
          className="hover:underline"
        >
          <Typography type="h6" className="text-center">
            {project.title}
          </Typography>
        </a>
        <Typography className="my-1 text-foreground">{project.description}</Typography>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => setPageId(project.id)}>Project Details</Button>
      </Card.Footer>
    </Card>
  );
}

const USE_CASES: ProjectTeaser[] = [
  {
    id: "dob",
    title: "Digitizing Music Theatre Production Workflows",
    image: dob_preview,
    imageAlt: "Digital score prototype in use on a tablet",
    description: (
      <>
        Theatre productions are still mostly paper-based. At the Deutsche Oper Berlin, I found out which pain points paper-based workflows cause and how to solve them with (mobile) digital tools.
      </>
    ),
  },
  {
    id: "loscope",
    title: "Workflow Analysis: LOSCOPe",
    image: loscope_preview,
    imageAlt: "LOSCOPe graph of score documents and workflows",
    description: (
      <>
        LOSCOPe (<em>Lifecycle of Scores in Opera Productions</em>) is a tool to explore the most common workflows and document transformations I found during my research.
      </>
    ),
  },
  {
    id: "vibe",
    title: "VIBE",
    image: vibe_preview,
    imageAlt: "The VIBE music notation editor in the browser",
    description: (
      <>
        VIBE (<em>Verovio Interface for Browser-based Editing</em>) is a web-based music notation editor for music education and research.
      </>
    ),
  },
];

function UseCases({ setPageId }: HomeProps): JSX.Element {
  return (
    <section id="use-cases" className="flex scroll-mt-24 flex-col items-center justify-center gap-4 px-8 pt-12 pb-32">
      <Typography type="h2" className="text-3xl font-semibold text-gray-100 md:text-4xl lg:text-4xl">
        Use Cases
      </Typography>
      <div className="flex flex-row flex-wrap items-stretch justify-center gap-4">
        {USE_CASES.map((p) => (
          <ProjectCard key={p.id} project={p} setPageId={setPageId} />
        ))}
      </div>
    </section>
  );
}

function Bio(): JSX.Element {
  return (
    <section id="bio" className="flex scroll-mt-24 flex-col items-center gap-8 px-8 pt-12 pb-32">
      <Typography type="h2" className="text-3xl font-semibold text-gray-100 md:text-4xl lg:text-4xl">
        Biography
      </Typography>
      <Timeline orientation="vertical" className="w-full max-w-2xl">
        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              Frontend &amp; UX Engineer
            </Typography>
            <p className="text-sm text-gray-400">KreativInstitut.OWL / University of Paderborn · 06/2024 – 01/2026 · Detmold</p>
            <p className="mt-2 text-gray-400">
              Full ownership of the UX process for digitizing music theatre production workflows with the Deutsche Oper Berlin — stakeholder interviews, requirements engineering, a
              React/Next.js/MongoDB prototype and Flutter prototypes for mobile use cases.
            </p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              Frontend &amp; UX Engineer
            </Typography>
            <p className="text-sm text-gray-400">Centre for Music and Film Informatics Detmold · 01/2021 – 03/2024 · Detmold</p>
            <p className="mt-2 text-gray-400">
              Conceived and built the VIBE Music Notation Editor from scratch — a published open-source TypeScript module integrated into Moodle and ILIAS. Ran quantitative UX studies with
              statistical analysis in R, resulting in 4 academic publications.
            </p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              IT Consultant
            </Typography>
            <p className="text-sm text-gray-400">SER Group Deutschland GmbH · 06/2019 – 12/2020 · Bonn</p>
            <p className="mt-2 text-gray-400">Consulting and implementation of enterprise content management solutions; customization of production systems using Java, VB and Groovy.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              Research Internship – Deep Learning
            </Typography>
            <p className="text-sm text-gray-400">Fraunhofer IDMT · 10/2018 – 02/2019 · Ilmenau</p>
            <p className="mt-2 text-gray-400">Deep learning architectures for electroacoustic music transcription — basis of the award-winning Bachelor's thesis (Best Paper Award, CMMR 2019).</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              Backend Developer (Working Student)
            </Typography>
            <p className="text-sm text-gray-400">meinestadt.de GmbH · 03/2018 – 09/2018</p>
            <p className="mt-2 text-gray-400">Backend development with Java 8 / Spring, MySQL and MongoDB in agile Scrum/Kanban teams.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              Bachelor's Degree – Media Informatics
            </Typography>
            <p className="text-sm text-gray-400">Hochschule Düsseldorf (HSD) · 2014 – 2019</p>
            <p className="mt-2 text-gray-400">Thesis: "Deep Learning for Electroacoustic Music Transcription" — Best Paper Award, CMMR 2019.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold text-gray-100 md:text-xl lg:text-xl">
              M.A. Musicology
            </Typography>
            <p className="text-sm text-gray-400">University of Cologne · 2008 – 2015</p>
            <p className="mt-2 text-gray-400">Interdisciplinary foundation for domain-specific software in music and culture.</p>
          </Timeline.Body>
        </Timeline.Item>
      </Timeline>
    </section>
  );
}

function SideProjects({ setPageId }: HomeProps): JSX.Element {
  const projects: ProjectTeaser[] = [
    {
      id: "meico",
      title: "MEI to MusicXML, for meico",
      description: (
        <>
          A converter class contributed to <em>meico</em>, the open source MEI toolkit built at CEMFI Detmold, adding the one export format it was missing.
        </>
      ),
    },
    {
      id: "stackbeat-prompt",
      title: "A StackBeat Prompt",
      description: (
        <>
          A minimal browser editor for <em>StackBeat</em>, a 2013 esoteric language that turns a tiny stack machine into a bytebeat synthesizer.
        </>
      ),
    },
    {
      id: "stackbeat-love",
      title: "StackBeat L.O.V.E.",
      description: <>StackBeat, live coded in place inside a shared, networked WebXR scene instead of a browser tab.</>,
    },
    {
      id: "juce-dart-ffi",
      title: "JUCE, over FFI, into Flutter",
      description: <>A cross-platform audio engine bridged into Flutter, built as the foundation for an app that reads a live video image as if it were a score.</>,
    },
  ];

  return (
    <>
      <section id="side-projects" className="flex scroll-mt-24 flex-col items-center gap-12 px-8 pt-12 pb-32">
        <Typography type="h2" className="text-3xl font-semibold text-gray-100 md:text-4xl lg:text-4xl">
          Side and Passion Projects
        </Typography>
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-lg text-gray-400">
            Hi there, again! Now you are leaving the main sections of my portfolio. This part only joins the navigation above once you get here, because it is not the main focus of my work, but I invite you to get a
            more complete picture of me and what I am passionate about.
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} setPageId={setPageId} />
          ))}
        </div>
      </section>
    </>
  );
}

//function Research({ setPageId }: HomeProps): JSX.Element {
function Research(): JSX.Element {
  return (
    <section id="research" className="flex scroll-mt-24 flex-col items-center gap-12 px-8 pt-12 pb-32">
      <Typography type="h2" className="text-3xl font-semibold text-gray-100 md:text-4xl lg:text-4xl">
        Research
      </Typography>

      <div className="flex w-4/5 max-w-5xl flex-col gap-12 text-left">
        {/* <div className="flex flex-col gap-4">
          <Typography type="h3" className="text-2xl font-semibold text-gray-100 md:text-2xl lg:text-2xl">
            Dissertation
          </Typography>
          <p className="text-lg text-gray-400">
            Music notation is one of the oldest interfaces we have. For centuries it has told musicians what to play, and on paper it works beautifully. On a screen it often falls apart. Editing,
            navigating, and reading a score digitally tends to be clumsy in ways printed notation never was.
            <br />
            My dissertation,{" "}
            <em>
              <b>The Design of Digital Interactions for Music Notation</b>
            </em>
            , asks why that happens and what to do about it. I treat a score not as a picture of notes but as something that coordinates people, the composer who writes it, the performers who read it,
            the editors in between. Out of that I build a set of reusable design patterns for making notation work in digital tools. The short version is that you cannot design a good notation
            interface without taking the musical domain seriously, and most tools don't.
            <br />I write about the research as it unfolds, from half-formed ideas to the things I got wrong.
          </p>
          <Button onClick={() => setPageId("dissblog")}>Read the blog →</Button>
        </div> */}

        <div className="flex flex-col gap-4">
          <Typography type="h3" className="text-2xl font-semibold text-gray-100 md:text-2xl lg:text-2xl">
            Publications
          </Typography>
          <div className="flex flex-col gap-6">
            {publicationsByYear.map(({ year, entries }) => (
              <div key={year}>
                <Typography type="h4" className="text-lg font-semibold text-gray-400 md:text-lg lg:text-lg">
                  {year}
                </Typography>
                <ul className="mt-2 flex flex-col gap-3">
                  {entries.map((pub) => (
                    <li key={pub.title}>
                      <div className="flex items-center gap-2">
                        {pub.link ? (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-white hover:underline">
                            {pub.title}
                            <OpenNewWindow className="h-4 w-4 shrink-0" />
                          </a>
                        ) : (
                          <p className="font-medium text-white">{pub.title}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {pub.authors} · {pub.venue}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <Typography type="h4" className="text-lg font-semibold text-gray-400 md:text-lg lg:text-lg">
                Best Paper Award
              </Typography>
              <ul className="mt-2">
                <li>
                  <div className="flex items-center gap-2">
                    <a href={bestPaperAward.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-white hover:underline">
                      {bestPaperAward.title}
                      <OpenNewWindow className="h-4 w-4 shrink-0" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-400">{bestPaperAward.description}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
