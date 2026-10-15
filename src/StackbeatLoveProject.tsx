import { Image, Section, Body, ProjectHeader, type FactGroup, type ProjectLink } from "./ProjectPage";

import interaction_png from "./assets/ein-ball-2000x.webp";
import coding_contexts_png from "./assets/zwei-balls-1500x.webp";

// --- page data -------------------------------------------------------

const TAGS = ["Esoteric Languages", "WebXR", "A-Frame", "Live Coding", "Networked Multiplayer", "Spatial Audio"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Developer"] },
  { label: "Stack", items: ["A-Frame", "Networked-Aframe", "Resonance Audio", "JavaScript"] },
];

const LINKS: ProjectLink[] = [
  { href: "https://github.com/mnowakow/StackBeat-L.O.V.E.", label: "Repository" },
  { href: "https://stackblitz.com/edit/iseaspace?file=package.json", label: "Run it on StackBlitz" },
  { href: "https://github.com/AudioGroupCologne/aframe-stackbeat", label: "aframe-stackbeat (base component)" },
  { href: "#stackbeat-prompt", label: "A StackBeat Prompt (the language, in a browser tab)" },
];

// --- page ----------------------------------------------------------

export default function StackbeatLoveProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="StackBeat L.O.V.E."
        lead="StackBeat, the bytebeat esolang, taken out of a browser tab and
          live coded in place inside a shared, networked WebXR scene."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      

      <Section id="goal" title="Introduction and goal">
        <Body>
          L.O.V.E. stands for Location Oriented Virtual Extension. Where a StackBeat prompt in a browser tab gives you one program in one place, StackBeat L.O.V.E. lets a program exist somewhere, a
          sphere you spawn in a shared 3D scene, playing from the position it occupies, next to whatever anyone else in the room has placed around it.
        </Body>
        <Body>
          It builds on aframe-stackbeat, an existing A-Frame component for the language, and wraps it into a drop-in behavior for a Networked-Aframe avatar, so the live coding environment travels with
          the player into any scene that includes it.
        </Body>
      </Section>

      {/* <Card className="mt-4 border border-gray-100 shadow-none"> */}
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="md:w-1/2">
            <Image src={coding_contexts_png} alt="Overlapping Coding Contexts in Stackbeat L.O.V.E." caption="Overlapping Coding Contexts in Stackbeat L.O.V.E." />
          </div>

          <div className="md:w-1/2">
            <Image src={interaction_png} alt="Coding Interface" caption="Coding Interface" />
          </div>
        </div>
      {/* </Card> */}

      <Section id="how" title="How it works">
        <Body>
          Attach the component to a networked player entity and a set of keyboard commands takes over from there. One key spawns a new StackBeat sphere at the player's position. Number keys feed
          values into it based on distance to the sphere's center, the language's own instruction characters build up the program on it live, and clicking an object removes it. Playback runs through
          A-Frame's resonance audio component, so a program's sound is spatial, louder walking toward it, and every other client on the network sees and hears the same objects in the same place.
        </Body>
        <Body>
          The whole thing runs as a StackBlitz project, "iseaspace", so trying it is one link and an <code>npm install</code>, not a local WebXR toolchain.
        </Body>
      </Section>

      <Section id="outcome" title="Reflection">
        <Body>
          This one stays a passion project on purpose. It does not solve a production problem the way the case studies above do, but it sits at the same intersection I keep ending up at outside work
          too, live coding, spatial and interactive audio, and multi user real time systems, just pushed further out for the fun of seeing how far a tiny 2013 esolang stretches when you give it a body
          in space.
        </Body>
      </Section>
    </article>
  );
}
