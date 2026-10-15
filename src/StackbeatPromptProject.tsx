import {
  
  Image,
  Section,
  Body,
  CodeBlock,
  ProjectHeader,
  type FactGroup,
  type ProjectLink,
} from "./ProjectPage";

import sb_prompt_png from "./assets/SB-promp.webp";

// --- page data -------------------------------------------------------

const TAGS = ["Esoteric Languages", "Bytebeat", "Audio Synthesis", "Web Development", "TypeScript"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Developer"] },
  { label: "Stack", items: ["TypeScript", "Web Audio API"] },
];

const LINKS: ProjectLink[] = [
  { href: "https://mnowakow.github.io/stackbeat-prompt/", label: "Live demo" },
  { href: "https://github.com/mnowakow/stackbeat-prompt", label: "Repository" },
  { href: "https://esolangs.org/wiki/StackBeat", label: "StackBeat, the language" },
  { href: "#stackbeat-love", label: "StackBeat L.O.V.E. (the spatial follow-up)" },
];

// --- page ----------------------------------------------------------

export default function StackbeatPromptProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="A StackBeat Prompt"
        lead="A minimal browser editor for StackBeat, an esoteric language from
          2013 that turns a tiny stack machine into a bytebeat synthesizer."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      {/* <ImagePlaceholder caption="Screenshot: the StackBeat prompt with a running program" /> */}
      <Image src={sb_prompt_png} alt="Screenshot: the StackBeat promptinterface" caption="Screenshot: the StackBeat prompt interface" />

      <Section id="goal" title="Introduction and goal">
        <Body>
          StackBeat is a stack based language built for bytebeat style audio
          synthesis. A program is a duration followed by a colon and a short
          string of instructions, push a number, push the current timestamp,
          duplicate, drop, swap, plus arithmetic and bitwise operators. The
          interpreter runs that tiny program 8000 times a second, feeds it the
          running timestamp, and turns whatever ends up on top of the stack
          into the next 8-bit sample.
        </Body>
        <Body>
          There is no interpreter you can just open in a browser tab and try,
          so I built one, a prompt in the literal sense, type a StackBeat
          program, hear it immediately.
        </Body>
      </Section>

      <Section id="how" title="What it does">
        <Body>
          Type a program, press run, and the Web Audio API generates the
          signal live from the interpreter's output, sample by sample, no
          download or local setup required. It is deliberately small, a text
          field and a play button, because the interesting part is the
          language itself, not the tool around it.
        </Body>
        <CodeBlock>{`120:7#>19_>7&1^4-_>1_<7_>_&+12#>1_<^||`}</CodeBlock>
        <Body>
          That is a full two minute piece, "Crowd", one of the language's own
          example programs. A duration, a colon, then a string of stack
          operations, <code>_</code> pushes the running timestamp,{" "}
          <code>#</code> swaps, <code>&gt;</code> and <code>&lt;</code> are
          bitwise shifts, and so on, run 8000 times a second against that
          growing timestamp. A handful of characters like that is enough to
          produce something that sounds structured rather than like noise,
          which is the appeal of bytebeat style synthesis in general and part
          of why I kept coming back to this language for the follow-up
          project below.
        </Body>
      </Section>

      <Section id="outcome" title="Where it leads">
        <Body>
          The prompt is the sandbox. Once StackBeat sounds interesting on its
          own, the natural next question was what it sounds like placed
          somewhere, shared with other people, in a 3D space instead of a
          text field. That question became StackBeat L.O.V.E.
        </Body>
      </Section>
    </article>
  );
}
