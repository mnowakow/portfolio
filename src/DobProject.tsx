import { Typography, Card, CardBody } from "@material-tailwind/react";
import { Section, Body, ProjectHeader, Image, type FactGroup, type ProjectLink } from "./ProjectPage";
import nav1 from "./assets/iter1-nav.webp";
import nav2 from "./assets/iter1-nav2.webp";
import annot from "./assets/iter1-annot.webp";
import diff from "./assets/iter1-diff.webp";
import interaction from "./assets/tablet-interaction.webp";

// --- page data -------------------------------------------------------

const TAGS = ["UX Research", "Interaction Design", "Digital Scores", "Opera Production", "Prototyping", "User Studies"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["UX Research", "Interaction Design", "Developer"] },
  { label: "Stack", items: ["R (analysis)", "PDF rendering", "PWA (React)", "Flutter"] },
  { label: "Methods", items: ["UEQ+", "NASA-TLX", "ANOVA", "Tukey HSD"] },
];

const LINKS: ProjectLink[] = [
  {
    href: "https://git.uni-paderborn.de/kio/loscop/-/wikis/home",
    label: "Study documentation and full data analysis",
  },
  { href: "#loscope", label: "LOSCOPe (separate case study)" },
];

// A compact results table, the concrete artifact of this page the way the
// matrix snippet was on the VIBE page.
function FindingsTable() {
  const rows = [
    ["Bookmark + stack", "Highest of all variants", "-0.506 (d -1.41)"],
    ["Interactive scale", "Lower", "+0.437 (improved)"],
    ["Scroll wheel", "Lower", "+0.377, lowest workload"],
  ];
  return (
    <Card className="border border-white/10 shadow-none">
      <CardBody className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4 font-bold">Navigation concept</th>
              <th className="py-2 pr-4 font-bold">UX rating, no interruption</th>
              <th className="py-2 font-bold">Time divergence under interruption</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-white/5 last:border-0">
                <td className="py-2 pr-4">{r[0]}</td>
                <td className="py-2 pr-4">{r[1]}</td>
                <td className="py-2 font-mono">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

// --- page ----------------------------------------------------------

export default function DobProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="Digital Scores for the Opera"
        lead="Field research and interactive prototypes for a digital opera score,
          built with the Deutsche Oper to test how navigation, annotation and
          versioning could move off paper and onto a tablet without slowing
          anyone down."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      {/* First image, the single most important one: a prototype in use */}
      {/* <ImagePlaceholder caption="Screenshot: a digital score prototype running on a tablet" /> */}
      <Image src={interaction} alt="Tablet prototype showing a digital score with navigation features." caption="Tablet prototype showing a digital score with navigation features." />

      <Section id="goal" title="Introduction and goal">
        <Body>
          Opera runs on paper. Every trade, from the répétiteur to the stage manager, works from its own heavily annotated copy of the score, and those copies drift apart over weeks of rehearsal. The
          goal of this project was to understand that paper based workflow in detail and then to design and test digital interactions that could replace it without making anyone slower.
          <br />
          <br />
          The work had two halves. The first was field research at the Deutsche Oper, built on interviews and observations of people doing their actual jobs. The second was a set of interactive
          prototypes for the three interactions that matter most on a digital score, navigation, annotation and versioning, evaluated in a controlled user study across two iterations.
          <br />
          <br />A separate outcome of the same field research was LOSCOPe, a tool that visualizes how documents and information travel between trades during a production. LOSCOPe gets its own case
          study, so I keep it short here.
        </Body>
      </Section>

      <Section id="field" title="Understanding the domain">
        <Body>
          Before designing anything I needed to know how professionals actually read and mark a score. A full opera score can run several hundred pages, and people rarely read it front to back. They
          jump, they backtrack, they hold fingers between pages, the famous claw, and they rely on bookmarks and hand built index tabs. Inconsistent page numbering between editions and parts is a
          constant source of frustration.
        </Body>
        <Body>Three scenarios came out of the research as the core of any digital score.</Body>

        <Typography type="h5" className="mt-4">
          Navigation
        </Typography>
        <Body>
          The score is only ever linear during the performance itself, and even then only for the musical staff. Everywhere else people jump between pieces and reread passages while their attention is
          somewhere else entirely, giving cues or watching the stage.
        </Body>

        <Image src={nav1} alt="Widgets for Navigation" caption="" />
        <Image src={nav2} alt="Widgets for Navigation" caption="Widgets for Navigation in first Iteration." />

        <Typography type="h5" className="mt-4">
          Annotation
        </Typography>
        <Body>
          Annotations are not just private reminders. They are instructions, cues and coordination marks passed between trades, made fast and freely, mixing symbols, sketches, handwriting and color.
          The same marking can mean different things to different trades.
        </Body>
        <Image src={annot} alt="Annotation Widgets" caption="Annotation Widgets in first Iteration." />

        <Typography type="h5" className="mt-4">
          Versioning
        </Typography>
        <Body>
          A production keeps many versions of the same score alive at once, the conductor's copy, the orchestral parts, the stage management copy, each with its own layer of annotations. Keeping them
          coherent as changes pile up is almost entirely manual work today.
        </Body>
        <Image src={diff} alt="Versioning Widgets" caption="Versioning Widgets in first Iteration." />

        {/* <ImagePlaceholder caption="Image: the three scenarios, navigation, annotation, versioning" /> */}
      </Section>

      <Section id="process" title="Prototypes and the study">
        <Body>
          For each scenario I built several interactive prototypes and put them in front of participants. This was as much a research job as a development one, so the study design carried a lot of the
          weight.
        </Body>

        <Typography type="h5" className="mt-4">
          Testing under real conditions
        </Typography>
        <Body>
          Preference alone is a weak signal, because a beautiful interface can still fall apart the moment attention is split. So every task ran twice, once uninterrupted and once with periodic
          secondary tasks that forced participants to look away and come back, standing in for the constant interruptions of a rehearsal. I recorded completion times for both runs and measured the
          divergence between them, collected UEQ+ ratings for perceived experience and NASA TLX scores for workload, then ran significance tests and effect sizes on top.
        </Body>

        <Typography type="h5" className="mt-4">
          Two iterations
        </Typography>
        <Body>
          The first iteration compared many concepts per area to find the strongest one. The second consolidated each area into a single refined prototype and, under real time pressure, switched to a
          native framework. That switch is the thing I carry forward. Native gave the second iteration noticeably smoother visuals and pushed the perceived value of the navigation prototype up
          sharply. Being willing to change the stack mid project instead of defending the first choice is a lesson I only learned by getting it wrong on an earlier project.
        </Body>
      </Section>

      <Section id="findings" title="What the data showed">
        <Body>A few results were worth the whole exercise, because they contradicted the ratings.</Body>

        <Typography type="h5" className="mt-4">
          The favorite that broke under load
        </Typography>
        <Body>The clearest finding was in navigation. A bookmark and stack concept was rated highest of all navigation variants in calm, uninterrupted use. Under interruption it collapsed.</Body>
        <FindingsTable />
        <Body>
          People loved it until they had to use it while distracted, and then the mental bookkeeping of the stack became a liability. That is exactly the failure mode you never see if you only ask
          people what they prefer. The plainer scroll wheel, rated lower, actually got faster under interruption and carried the lowest workload.
        </Body>

        <Typography type="h5" className="mt-4">
          Where you put the menu decides everything
        </Typography>
        <Body>
          Annotation told the same story from the other side. A context sensitive circular menu that appears where you tap, the snail, held up well under load, while a sidebar variant did not, because
          the sidebar forced people to break their flow to reach it and dismiss it.
        </Body>

        <Typography type="h5" className="mt-4">
          The obviously good idea that tested badly
        </Typography>
        <Body>
          Versioning was the humbling one. A separate annotation list looked like an obviously good idea and tested as an obviously bad one. Participants kept losing the connection between a row in
          the list and the mark on the page, so the list was slower and more confusing than no list at all.
        </Body>

        <Typography type="h5" className="mt-4">
          What people say is not what they do
        </Typography>
        <Body>
          Across both iterations there was one quiet, broad finding. Qualitative feedback was consistently warmer than the numbers, and features people praised in interviews often had no measurable
          effect on their performance or their ratings. Listening to what people say and measuring what they do turned out to be two different jobs.
        </Body>
        {/* <ImagePlaceholder caption="Image: interaction time divergence heatmap across all groups" /> */}
      </Section>

      <Section id="guidelines" title="Design guidelines">
        <Body>The most durable output was a set of concrete design guidelines for digital scores, each one grounded in something I watched people do. A few that I still stand behind.</Body>

        <ul className="list-disc space-y-2 pl-6 text-left text-gray-400">
          <li>
            <strong>The double page is a unit.</strong> People think in facing pages, annotate across the spread, and use the blank facing page for context.
          </li>
          <li>
            <strong>Every action has a rough and a fine version.</strong> A quick sketch during rehearsal and a precise, labeled annotation afterward are the same intent at two levels of care, and the
            interface has to support both.
          </li>
          <li>
            <strong>Fingers may rest on the tablet.</strong> A long touch is not an intention. Passive contact has to be ignored, or the tool becomes unusable for anyone actually holding it.
          </li>
          <li>
            <strong>Keep it one page.</strong> Switching views is felt as disruptive, so interactions stay on the score and menus stay transparent, keeping the page underneath visible.
          </li>
          <li>
            <strong>Couple the small and large views one way.</strong> A miniature view drives the main view but not the other way around, which matches how people scan ahead without losing their
            place.
          </li>
        </ul>
      </Section>

      <Section id="outcome" title="Outcome and what I learned">
        <Typography type="h5" className="mt-4">
          What came out of it
        </Typography>
        <Body>
          The project delivered what it set out to. Two prototype iterations, a controlled study with usable statistical results, a documented set of design guidelines, and LOSCOPe as a separate tool.
          The full analysis and documentation are public.
        </Body>

        <Typography type="h5" className="mt-4">
          What I take from it
        </Typography>
        <Body>
          Test under the conditions the tool will really be used in. The interruption runs found problems that preference alone never would have. Trust the data over the compliments. And changing the
          stack in the second iteration, on a tight timeline, actually worked, which is the counterexample I needed after an earlier project where I stayed with the wrong stack far too long.
        </Body>

        {/* <Typography type="h5" className="mt-4">
          How I would approach it today
        </Typography>
        <Body>
          I would bring the measurement setup in earlier, so the first iteration
          already runs under interruption instead of learning that lesson halfway
          through. And I would treat semantic grouping of annotations as the real
          research question from the start, since clustering nearby marks into one
          coherent annotation kept surfacing as the hard, interesting part and
          deserves more than a guideline.
        </Body> */}
      </Section>

      {/* TODO block, fill before publishing:
          - confirm Role, Stack and Methods chips (the prototype framework is a placeholder)
          - participant count for the study, if you want to state N
          - real images: tablet prototype, three scenarios, divergence heatmap, a navigation or annotation GIF
      */}
    </article>
  );
}
