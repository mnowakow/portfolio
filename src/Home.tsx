import { Button, Card, IconButton, Tabs, Timeline, Typography } from "@material-tailwind/react";
import { GithubCircle, IconoirProvider, Linkedin, Mail, OpenNewWindow } from "iconoir-react";
import { useState, useEffect, type JSX } from "react";
import mn_portrait_1 from "./assets/mn_portrait_1.jpg";
import { bestPaperAward, publicationsByYear } from "./Publications";
import type { pageIds } from "./Helper";

interface HomeProps {
  setPageId: (id: pageIds) => void;
}

function Home({ setPageId }: HomeProps) {
  const sectionMap: Record<string, JSX.Element> = {
    hello: <Hello />,
    "use-cases": <UseCases setPageId={setPageId} />,
    bio: <Bio />,
    research: <Research />,
    "side-projects": <SideProjects setPageId={setPageId} />,
  };

  const [activeSection, setActiveSection] = useState(Object.keys(sectionMap)[0]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    let clicked = false;
    document.addEventListener("click", () => {
      clicked = true;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (clicked) {
          setTimeout(() => {
            clicked = false;
          }, 500);
          return;
        }
        const mostVisible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    Object.keys(sectionMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed md:top-0 md:left-0 z-50 flex w-full items-center justify-center gap-4 rounded-full border border-transparent bg-transparent px-2 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500">
        <div className="flex max-w-full flex-col items-center gap-2 overflow-x-auto rounded-3xl border border-mauve-500 bg-mauve-100/50 p-1 shadow-md shadow-mauve-900/5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:flex-row md:justify-center md:gap-8 md:rounded-full">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="flex items-center justify-center gap-4 rounded-full">
            <Tabs.List className="flex h-11 items-center justify-center gap-1 rounded-full border border-transparent bg-amber-300 p-1 md:gap-4">
              {Object.keys(sectionMap)
                .filter((id) => id !== "side-projects")
                .map((id) => (
                  <Tabs.Trigger key={id} className="shrink-0 px-2 whitespace-nowrap md:w-28 md:px-3" value={id} onClick={() => scrollToSection(id)}>
                    {id.replace("-", " ").toUpperCase()}
                  </Tabs.Trigger>
                ))}
              <Tabs.TriggerIndicator className="rounded-full bg-zinc-100" />
            </Tabs.List>
          </Tabs>
          <div className="flex h-11 shrink-0 content-center items-center justify-center gap-2 rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 border border-transparent bg-amber-300 p-1 shadow-md shadow-mauve-900/5 backdrop-blur md:gap-6">
            <IconoirProvider
              iconProps={{
                color: "black",
                strokeWidth: 1.5,
                width: "1.5em",
                height: "1.5em",
              }}
            >
              <IconButton
                size="sm"
                className="rounded-full hover:bg-mauve-100/50 hover:shadow-md hover:shadow-mauve-900/5 hover:backdrop-blur bg-transparent border-transparent"
                onClick={() => window.open("https://github.com/mnowakow")}
              >
                <GithubCircle />
              </IconButton>
              <IconButton
                size="sm"
                className="rounded-full hover:bg-mauve-100/50 hover:shadow-md hover:shadow-mauve-900/5 hover:backdrop-blur bg-transparent border-transparent"
                onClick={() => window.open("https://www.linkedin.com/in/matthias-nowakowski-b07555168/")}
              >
                <Linkedin />
              </IconButton>
              <IconButton
                size="sm"
                className="rounded-full hover:bg-mauve-100/50 hover:shadow-md hover:shadow-mauve-900/5 hover:backdrop-blur bg-transparent border-transparent"
                onClick={() => window.open("mailto:matthias.nowakowski+portfolio@gmail.com")}
              >
                <Mail />
              </IconButton>
            </IconoirProvider>
          </div>
        </div>
      </header>

      <main>
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
    <section id="hello" className="flex flex-col items-center justify-center gap-16 px-8 pt-12 pb-32">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
        <div className="flex translate-y-0 flex-col gap-8">
          <Typography type="h1" className=" text-nowrap text-right leading-tight font-bold md:text-4xl">
            Matthias Nowakowski
          </Typography>
          <Typography type="h2" className="text-nowrap text-right leading-tight md:text-4xl">
            Research based Product Engineer
          </Typography>
          <Typography type="h3" className="text-nowrap text-right leading-tight md:text-3xl">
            Creates good things, <br /> so you can create better things
            <br />
            <br /> Understand. Build. Ship.
          </Typography>
        </div>
        <div className="aspect-square w-full max-w-md overflow-hidden rounded-r-full rounded-t-full">
          <img src={mn_portrait_1} alt="" className="h-full w-full scale-[1.5] translate-y-[23%] object-cover object-[40%_50%]" />
        </div>
      </div>
      <div className="flex max-w-3xl flex-col gap-4">
        <p className="text-left leading-normal text-lg text-gray-400">
          I started in music, not code. I studied musicology with a focus on electroacoustic music, where you think in sound and structure rather than notes on a page. That instinct never left me.
        </p>
        <p className="text-left leading-normal text-lg text-gray-400">
          From there I moved into IT, working in consulting and learning to build software instead of just studying it. Music informatics is where those two halves finally met. Today I build notation
          and authoring tools, prototype interactive scores, and research how people actually interact with music notation.
        </p>
        <p className="text-left leading-normal text-lg text-gray-400">
          The path through these fields was really one. Music taught me to see the artist behind every artifact how it affects the audience. Engineering taught me to build what people actually need.
          And the work I do now needs both.
        </p>
      </div>
    </section>
  );
}

function UseCases({ setPageId }: HomeProps): JSX.Element {
  return (
    <section id="use-cases" className="flex scroll-mt-24 flex-col items-center justify-center gap-4 px-8 pt-12 pb-32">
      <Typography type="h2" className="text-4xl font-semibold">
        Use Cases
      </Typography>
      <div className="flex flex-row flex-wrap items-stretch justify-center gap-4">
        <Card className="flex w-80 flex-col">
          {/* <Card.Header as="img" src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=800&auto=format&fit=crop" alt="image" /> */}
          <Card.Body className="flex-1">
            <a
              href="#dob"
              onClick={(e) => {
                e.preventDefault();
                setPageId("dob");
              }}
              className="hover:underline"
            >
              <Typography type="h6" className="text-center">
                Digitizing Music Theatre Production Workflows
              </Typography>
            </a>
            <Typography className="my-1 text-foreground">
              Theatre productions are mostly paper based, still. At the Deutsche Oper Berlin, I found out about pain points paper based workflows cause and how to solve them with (mobile) digital
              tools.
            </Typography>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setPageId("dob")}>Project Details</Button>
          </Card.Footer>
        </Card>
        <Card className="flex w-80 flex-col">
          {/* <Card.Header as="img" src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=800&auto=format&fit=crop" alt="image" /> */}
          <Card.Body className="flex-1">
            <a
              href="#loscope"
              onClick={(e) => {
                e.preventDefault();
                setPageId("loscope");
              }}
              className="hover:underline"
            >
              <Typography type="h6">Workflow Analysis: LOSCOPe</Typography>
            </a>
            <Typography className="my-1 text-foreground">
              LOSCOPe (<em>Lifecycle of Scores in Opera Productions</em>) is a tool to explore the most common workflows and document transformations I found during my research.
            </Typography>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setPageId("loscope")}>Project Details</Button>
          </Card.Footer>
        </Card>
        <Card className="flex w-80 flex-col">
          {/* <Card.Header as="img" src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=800&auto=format&fit=crop" alt="image" /> */}
          <Card.Body className="flex-1">
            <a
              href="#vibe"
              onClick={(e) => {
                e.preventDefault();
                setPageId("vibe");
              }}
              className="hover:underline"
            >
              <Typography type="h6" className="text-center">
                VIBE
              </Typography>
            </a>
            <Typography className="my-1 text-foreground">
              VIBE (<em>Verovio Interface for Browser based Editing</em>) is a web-based music notation editor for music education and research.
            </Typography>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setPageId("vibe")}>Project Details</Button>
          </Card.Footer>
        </Card>
      </div>
    </section>
  );
}

function Bio(): JSX.Element {
  return (
    <section id="bio" className="flex scroll-mt-24 flex-col items-center gap-8 px-8 pt-12 pb-32">
      <Typography type="h2" className="text-4xl font-semibold">
        Biography
      </Typography>
      <Timeline orientation="vertical" className="w-full max-w-2xl">
        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              Frontend &amp; UX Engineer
            </Typography>
            <p className="text-sm text-gray-400">KreativInstitut.OWL / University of Paderborn · 06/2024 – 02/2026 · Detmold</p>
            <p className="mt-2 text-gray-500">
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
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              Frontend &amp; UX Engineer
            </Typography>
            <p className="text-sm text-gray-400">Centre for Music and Film Informatics Detmold · 01/2021 – 03/2024 · Detmold</p>
            <p className="mt-2 text-gray-500">
              Conceived and built the VIBE Music Notation Editor from scratch — a published open-source TypeScript module integrated into Moodle, ILIAS and Canvas. Ran quantitative UX studies with
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
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              IT Consultant
            </Typography>
            <p className="text-sm text-gray-400">SER Group Deutschland GmbH · 06/2019 – 12/2020 · Bonn</p>
            <p className="mt-2 text-gray-500">Consulting and implementation of enterprise content management solutions; customization of production systems using Java, VB and Groovy.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              Research Internship – Deep Learning
            </Typography>
            <p className="text-sm text-gray-400">Fraunhofer IDMT · 10/2018 – 02/2019 · Ilmenau</p>
            <p className="mt-2 text-gray-500">Deep learning architectures for electroacoustic music transcription — basis of the award-winning Bachelor's thesis (Best Paper Award, CMMR 2019).</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              Backend Developer (Working Student)
            </Typography>
            <p className="text-sm text-gray-400">meinestadt.de GmbH · 03/2018 – 09/2018</p>
            <p className="mt-2 text-gray-500">Backend development with Java 8 / Spring, MySQL and MongoDB in agile Scrum/Kanban teams.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
            <Timeline.Separator />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              B.Sc. Computer Science
            </Typography>
            <p className="text-sm text-gray-400">Hochschule Düsseldorf (HSD) · 2014 – 2019</p>
            <p className="mt-2 text-gray-500">Thesis: "Deep Learning for Electroacoustic Music Transcription" — Best Paper Award, CMMR 2019.</p>
          </Timeline.Body>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Header>
            <Timeline.Icon />
          </Timeline.Header>
          <Timeline.Body className="text-left">
            <Typography type="h4" className="text-lg font-semibold" color="secondary">
              M.A. Musicology
            </Typography>
            <p className="text-sm text-gray-400">University of Cologne · 2008 – 2015</p>
            <p className="mt-2 text-gray-500">Interdisciplinary foundation for domain-specific software in music and culture.</p>
          </Timeline.Body>
        </Timeline.Item>
      </Timeline>
    </section>
  );
}

function SideProjects({ setPageId }: HomeProps): JSX.Element {
  const projects: { id: pageIds; title: string; description: JSX.Element }[] = [
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
        <Typography type="h2" className="text-4xl font-semibold">
          Side and Passion Projects
        </Typography>
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-lg text-gray-400">
            Hi there, again! Now you are leaving the main sections of my portfolio. I did not include this in the Tabbar above because it is not the main focus of my work, but I invite you to get a
            more complete picture of me and what I am passionate about.
          </p>
        </div>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-4">
          {projects.map((p) => (
            <Card key={p.id} className="flex w-80 flex-col">
              <Card.Body className="flex-1">
                <a
                  href={`#${p.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setPageId(p.id);
                  }}
                  className="hover:underline"
                >
                  <Typography type="h6" className="text-center">
                    {p.title}
                  </Typography>
                </a>
                <Typography className="my-1 text-foreground">{p.description}</Typography>
              </Card.Body>
              <Card.Footer>
                <Button onClick={() => setPageId(p.id)}>Project Details</Button>
              </Card.Footer>
            </Card>
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
      <Typography type="h2" className="text-4xl font-semibold">
        Research
      </Typography>

      <div className="flex w-4/5 max-w-5xl flex-col gap-12 text-left">
        {/* <div className="flex flex-col gap-4">
          <Typography type="h3" className="text-2xl font-semibold">
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
          <Typography type="h3" className="text-2xl font-semibold">
            Publications
          </Typography>
          <div className="flex flex-col gap-6">
            {publicationsByYear.map(({ year, entries }) => (
              <div key={year}>
                <Typography type="h4" className="text-lg font-semibold text-gray-500">
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
                      <p className="text-sm text-gray-500">
                        {pub.authors} · {pub.venue}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <Typography type="h4" className="text-lg font-semibold text-gray-500">
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
                  <p className="text-sm text-gray-500">{bestPaperAward.description}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
