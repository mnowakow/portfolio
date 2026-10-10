import {
  Image,
  Section,
  Body,
  ProjectHeader,
  type FactGroup,
  type ProjectLink,
} from "./ProjectPage";

import meico_screenshot_png from "./assets/meico-screenshot_01.png";

// --- page data -------------------------------------------------------

const TAGS = ["Open Source", "Music Encoding", "MEI", "MusicXML", "Java"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Contributor"] },
  { label: "Stack", items: ["Java", "MEI", "MusicXML", "XOM"] },
];

const LINKS: ProjectLink[] = [
  { href: "https://github.com/cemfi/meico", label: "meico (upstream repository)" },
  {
    href: "https://github.com/mnowakow/meico/blob/master/src/meico/mei/Mei2MusicXmlConverter.java",
    label: "Mei2MusicXmlConverter.java",
  },
];

// --- page ----------------------------------------------------------

export default function MeicoProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="MEI to MusicXML, for meico"
        lead="A converter class contributed to meico, the open source MEI processing
          toolkit built at CEMFI in Detmold, adding the one export format the
          toolkit did not yet speak."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      <Image src={meico_screenshot_png} alt="The Meico Interface in which the converter is used" caption="The Meico Interface in which the converter is used" />

      <Section id="goal" title="Introduction and goal">
        <Body>
          meico converts between MEI, MSM, MPM, MIDI and audio, built at the
          same institute in Detmold where I later worked on VIBE. What it
          could not do was export MusicXML, which is the one format almost
          every notation program outside the MEI world actually reads,
          Sibelius, Dorico, MuseScore, Finale. An MEI toolkit that cannot hand
          its data to any of them has a gap right where most of its potential
          users are standing.
          <br />
          <br />
          Mei2MusicXmlConverter closes that gap. Instantiate it, hand it an
          MEI object, get MusicXML back.
        </Body>
      </Section>

      <Section id="how" title="How it works">
        <Body>
          The converter walks the MEI document with XOM and rebuilds the
          equivalent structure on top of Audiveris' proxymusic object model,
          the same MusicXML representation used elsewhere in the Java
          ecosystem. Header, part list, measures and notes get assembled
          piece by piece, tracking open ties and barlines across the walk
          since MusicXML expects them resolved rather than left as MEI style
          references.
        </Body>
        <Body>
          One flag matters beyond the mechanical mapping.{" "}
          <code>ignoreExpansions</code> decides whether MEI's{" "}
          <code>&lt;expansion&gt;</code> elements, which describe a score as a
          set of reusable sections plus an order to play them in, get
          resolved into a single through-composed sequence before conversion.
          MusicXML has no equivalent concept, so a score built from
          expansions has to be flattened one way or the other before it can
          leave MEI's world at all.
        </Body>
      </Section>

      <Section id="outcome" title="Outcome">
        <Body>
          The pull request merged into the upstream repository in August
          2024, so MusicXML export is now part of meico for anyone who pulls
          the library, not just something living in my fork. It is a small
          contribution next to the case studies on this site, but it is the
          kind of small contribution I like, a missing edge in a tool other
          people depend on, made to work.
        </Body>
      </Section>
    </article>
  );
}
