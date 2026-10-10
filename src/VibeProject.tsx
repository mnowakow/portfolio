import { Typography, Card, CardBody } from "@material-tailwind/react";
import {
  Image,
  Section,
  Body,
  ProjectHeader,
  type FactGroup,
  type ProjectLink,
} from "./ProjectPage";

import vibe_interface from "./assets/vibe-interface.png";
import chrome_boxes from "./assets/chrome-boxes.png";
import firefox_boxes from "./assets/firefox-boxes.png";

// --- page data -------------------------------------------------------

const TAGS = [
  "Web Development",
  "Music Interfaces",
  "Music Notation",
  "Verovio",
  "Learning Management Systems",
];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Product Owner", "Developer"] },
  { label: "Stack", items: ["Verovio", "MEI", "H5P", "Vanilla JS", "SVG"] },
];

const LINKS: ProjectLink[] = [
  { href: "https://sourceforge.net/projects/h5p-music-notation/", label: "SourceForge: h5p-music-notation" },
  { href: "https://github.com/H5P-MusicNotation", label: "GitHub: H5P-MusicNotation" },
];

// --- page ----------------------------------------------------------

export default function VibeProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="VIBE"
        lead="A browser based notation interface for digital music education, built
          for people with little or no experience in digital notation tools."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      {/* First screenshot, the single most important image: what VIBE looks like */}
      {/* <ImagePlaceholder caption="Screenshot: the VIBE notation interface in the browser" /> */}
      
      <Section id="goal" title="Introduction and goal">
        <Body>
          VIBE was meant to be an interface for digital music education, mainly
          to create music notation for students who had little or no experience
          manipulating notation digitally. Beyond that first purpose it grew into
          its own library that serves the larger project underneath it.
          <br />
          <br />
          Two motivations shaped the work. First, it had to be easy to integrate
          into a wide variety of learning management systems, ideally through
          H5P. Second, VIBE as a separate module was itself a case study in
          building on technology developed by academic peers. That second angle
          is really a story about resource management in terms of space,
          personnel and knowledge, which also says a lot about why H5P was on the
          table in the first place.
          <br />
          <br />
          I am proud of what VIBE became and of what I learned about placing my
          own product inside other environments. I also learned to hate SVGs
          along the way.
        </Body>
      </Section>

      <div className= "w-10/12 mx-auto">
        <Image src={vibe_interface} alt="Screenshot: the VIBE notation interface in the browser" caption="Screenshot: the VIBE notation interface in the browser" />
      </div>

      <Section id="process" title="Process">
        <Body>
          This was my first job in music informatics, with some web development
          and the chance to produce research output on top. I was thrilled to
          build something I care about, and aware that owning the whole process
          would be a challenge.
        </Body>

        <Typography type="h5" className="mt-4">
          Initial requirements
        </Typography>
        <ul className="list-disc space-y-2 pl-6 text-left text-gray-400">
          <li>
            Develop a notation interface plus task types for music theory classes
            at a music university.
          </li>
          <li>
            Make them usable inside the university LMS, a lesser known German
            provider, and in other systems too. In practice that meant
            interacting with notation directly in the browser.
          </li>
          <li>Add automatic synchronization of notation and audio on top.</li>
        </ul>
        <Body>
          Paradoxically this meant the interaction had to be beginner friendly.
          You might assume musicians are trained in software like Sibelius,
          Dorico or MuseScore, but that is not the case for most new students.
          Many have never worked on a desktop computer for music and had no
          reason to arrange or write music before. So the defining feature of the
          interface was a small set of the most common interactions, made as
          visible as possible. You could call it an MVP. Annotations mattered too,
          because music might speak for itself but not for its creator.
        </Body>

        <Typography type="h5" className="mt-4">
          Choosing the technology
        </Typography>
        <Body>
          <strong>Verovio.</strong> In Detmold we are big fans of MEI, and
          Verovio was built around it. As a rendering engine for music encodings
          it took over the job of arranging notes into readable notation. XML in,
          rendering out.
          <br />
          <br />
          <strong>H5P.</strong> An environment with runtime implementations in
          many major LMS, and a framework for building task types that emit
          evaluation messages back to the LMS. It gave me a layer of abstraction
          without learning the internals of every single LMS.
          <br />
          <br />
          <strong>Vanilla JS.</strong> Coming mostly from Python, Java and VB, I
          had not touched frameworks like React or Vue in a long time, and not in
          their modern form. Plain JavaScript felt like an old car. It gets you
          from A to B and you still understand the mechanics under the hood. H5P
          was also readily available in JS.
        </Body>
      </Section>

      <Section id="challenges" title="Challenges">
        <Body>
          Modularity and abstraction made it feel like I had more time for the
          notation interface itself. Or so I thought.
          <br />
          <br />
          Integrating Verovio was easy, and adding interactions to the notation
          SVG was easy too. Grab the bounding boxes, make them react to clicks and
          hovers. You have to respect a few hierarchies while interacting, but
          that is part of the job.
        </Body>

        <Typography type="h5" className="mt-4">
          My Nemesis: The SVG
        </Typography>
        <Body>
          Then I hit the wall. SVG positions were drastically different depending
          on window size and browser. Firefox was the worst. The rendering itself
          sat in the right place, but the bounding boxes were crammed into strange
          clusters. In the end I got somewhere by transforming the bounding client
          coordinates into the actual size of the container with matrix operations.
        </Body>
        <Card className="border border-gray-100 bg-gray-900 shadow-none">
          <CardBody>
            <pre className="overflow-x-auto text-left text-sm text-green-300">
              <code>{`var containerMatrix = container.getScreenCTM().inverse();
var pt = new DOMPoint(x, y);
pt = pt.matrixTransform(containerMatrix);`}</code>
            </pre>
          </CardBody>
        </Card>
        <Body>
          That handled dynamic size changes of containers and browser windows.
          What really made me dizzy was that the resulting SVG had nested,
          encapsulated viewports, which made positions very hard to predict.
        </Body>
        {/* <ImagePlaceholder caption="Image: SVG bounding box clustering (Firefox)" /> */}

        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={chrome_boxes}
              alt="Bounding boxes in Chrome"
              caption="Bounding boxes in Chrome"
              className="mx-auto h-64 w-full rounded-xl object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <Image
              src={firefox_boxes}
              alt="Bounding boxes in Firefox"
              caption="Bounding boxes in Firefox"
              className="mx-auto h-64 w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <Typography type="h5" className="mt-4">
          Verovio inside H5P
        </Typography>
        <Body>
          Using Verovio with H5P had its own twist. A score is always rendered
          with padding on the sides, the way a full score is meant to look. That
          assumption made it hard to position short snippets rendered inside small
          H5P containers.
        </Body>
        {/* <ImagePlaceholder caption="Image: short snippet rendered in the LMS container" /> */}

        <Typography type="h5" className="mt-4">
          The reporting limitation
        </Typography>
        <Body>
          Back to the most basic scenario. Make a notation and show it to the
          teacher on the evaluation side of the LMS. What I did not know this far
          into development is that H5P reports back over xAPI, and its result
          fields are string based. The model is built for auto gradable,
          comparable text answers, not for rendered media artifacts. We
          experimented by sending the SVG as a Base64 string into the evaluation,
          but there was no way to render it without writing a separate module for
          each LMS. The friction was not that H5P is unflexible. It was that my
          use case, a teacher visually inspecting a rendered notation, sits
          outside the model H5P is optimized for. I chose H5P for its abstraction
          across many LMS, and I accepted this limit as the price for that.
        </Body>
      </Section>

      <Section id="outcome" title="Outcome">
        <Typography type="h5" className="mt-4">
         What I Learned
        </Typography>
        <Body>
          At one point I wanted to start over. Falling for the sunk cost fallacy I
          stuck with the stack, hoping to shoehorn the project into shape.
          Changing course and being honest about it saved me in a later project,
          where I had far less time but managed to switch the stack in the second
          iteration.
          <br />
          <br />
          It surprised me how far we still are from one size fits all, despite all
          the translation layers between languages and operating systems. We are
          maybe at one size fits some, and most people will not notice. That made
          the initial requirements feel a little illusory. It was especially true
          for real time SVG manipulation, which behaves slightly differently in
          every browser, and for H5P being less flexible for media than I had
          hoped.
        </Body>
        <Typography type="h5" className="mt-4">
         What Happend to VIBE?
        </Typography>
        <Body>
          VIBE was released. But between the SVG quirks across browsers and the
          reporting limitations inside H5P, it never became something I would
          call reliably usable in practice.
        </Body>
        <Typography type="h5" className="mt-4">
         Reworking VIBE
        </Typography>
        <Body>
          Since then I have identified further problems, this time rooted in my
          own experience at the time. I am currently rebuilding VIBE in a more modern way, in React and on top of a
          proper UI system. It is important to me to release it as an npm package so it can be reused
          across many other projects instead of being just an engraving tool.
          <br  /><br />
          I am also abandoning H5P as a framework for the time being, because it is not flexible enough for my use case.
        </Body>
      </Section>
    </article>
  );
}
