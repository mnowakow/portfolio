import { Typography, Card, CardBody } from "@material-tailwind/react";
import { Section, Body, CodeBlock, ProjectHeader, type FactGroup, type ProjectLink, Image } from "./ProjectPage";
import loscopemodel from "./assets/loscope_model.png";
import loscopestate from "./assets/losocpe-states.png";
// --- page data -------------------------------------------------------

const TAGS = ["Data Visualization", "Research Tooling", "Information Design", "Full-Stack Development", "Next.js", "Graph Layout"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Concept", "Data Modeling", "Full-Stack Development"] },
  {
    label: "Stack",
    items: ["Next.js (static export)", "TypeScript", "@xyflow/react + elkjs", "MongoDB + Mongoose (dev)", "Express (dev API)", "react-hook-form", "GitLab CI/CD"],
  },
  { label: "Data", items: ["8 collections", "6 production phases", "JSON Schema + Ajv"] },
];

const LINKS: ProjectLink[] = [
  { href: "https://kio.pages.git.uni-paderborn.de/loscop", label: "Live graph, hosted on GitLab Pages" },
  { href: "https://git.uni-paderborn.de/kio/loscop", label: "Repository" },
  // TODO: internal link to the Digital Scores for the Opera case study page
  { href: "#dob", label: "Digital Scores for the Opera (parent case study)" },
];

const PHASES = [
  "Prepreparation",
  "Preparation (new production)",
  "Preparation (revival)",
  "Rehearsal, musical",
  "Rehearsal, hall",
  "Rehearsal, stage",
  "Rehearsal, recast",
  "Staging",
  "Post production",
];

// The eight MongoDB collections that make up the schema, exported as
// static JSON for the published version of the tool.
function CollectionsTable() {
  const rows = [
    ["trades", "One document per department or trade, holding its own task tree"],
    ["tasks", "Nested per phase, can hold sub tasks and reference earlier or later tasks"],
    ["challenges", "Attached to a task, can point at another trade as the source"],
    ["solutions", "Attached to a challenge, can point at another trade as the target"],
    ["docstates", "One score state, staging or rehearsal or revision version"],
    ["accessibilities", "Which trade a given document state is visible to"],
    ["markers", "A mark left on a document state, tied to the task that produced it"],
    ["modifications", "A change made to a document state, with its reason and author"],
  ];
  return (
    <Card className="border border-gray-100 shadow-none">
      <CardBody className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-2 pr-4 font-bold">Collection</th>
              <th className="py-2 font-bold">What it holds</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-gray-50 last:border-0">
                <td className="py-2 pr-4 font-mono">{r[0]}</td>
                <td className="py-2">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

// --- page ----------------------------------------------------------

export default function LoscopeProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="LOSCOPe, Tracing How Information Moves Through an Opera Production"
        lead="A graph based research tool that turns interview data from the
          Deutsche Oper field study into a browsable map of who hands what to
          whom, when, and why, built to outlive the project it came from on a
          hosting setup that has no server and no database behind it."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      {/* <ImagePlaceholder caption="Screenshot: the production graph with node inspector and filter panel open" /> */}
      <Image src={loscopemodel} alt="LOSCOPe data model" caption="LOSCOPe data model" />

      <Section id="goal" title="Introduction and goal">
        <Body>
          LOSCOPe grew out of the same field research at the Deutsche Oper as the digital score project, but it answers a different question. That project asked how one person reads and marks a score.
          This one asks how information gets from one trade to the next across an entire production, who hands off a decision, who reacts to it, and where the handoff breaks down.
          <br />
          <br />
          The interviews produced a lot of structured but deeply nested information, a trade runs through several production phases, each phase holds tasks, a task can raise a challenge, a challenge
          can point at another trade and get answered with a solution located somewhere else in the graph entirely. On paper that is a graph problem, so I built LOSCOPe to store it as one and make it
          walkable rather than leaving it in interview transcripts.
        </Body>
      </Section>

      <Section id="data-model" title="Modeling how documents move between trades">
        <Body>
          The schema mirrors the production itself rather than a convenient database shape. A trade holds its production phases, prepreparation, preparation split into new and revival work, rehearsals
          split into musical, hall, stage and recast, staging, and post production. Each phase holds tasks, and a task can hold sub tasks, so the tree can go as deep as the interview did.
        </Body>
        <Body>
          The part that actually carries the research question sits on challenges and solutions. Both can hold a reference with a source trade and a target trade, so a challenge raised by the stage
          management can point straight at the trade whose earlier decision caused it, and a solution can point at whichever trade actually resolved it. That cross reference is what turns a set of per
          trade task lists into one connected graph instead of eight separate ones.
        </Body>
        <Body>
          A task also carries a document state, the score version currently in play, who it is accessible to, and any markers or modifications left on it. The whole thing is defined once as a JSON
          Schema, validated with Ajv, and mirrored by hand into TypeScript types, so the shape of a trade document, a task, a challenge and a document state stays consistent everywhere it gets read or
          written.
        </Body>
        <CollectionsTable />
        <Body>Those eight collections are also exactly what mongoexport writes out later, which matters for how the site ended up hosted, more on that below.</Body>
      </Section>

      <Section id="masks" title="Designing input masks for nested data">
        <Body>
          Nobody involved in collecting this data was going to write MongoDB documents by hand, and a generic admin panel would have hidden the structure that made the data useful in the first place.
          So each collection got its own form component, a trade form, a task form, a document state form, with smaller forms nested inside for markers, modifications and accessibility, built with
          react-hook-form and useFieldArray for the repeatable parts, a task's sub tasks, a challenge's list of solutions, a document state's list of markers.
        </Body>
        <Body>
          The forms follow the same hierarchy as the schema. Opening a trade form lets you open a task form for one of its phases, which lets you open a challenge, which lets you open a solution, each
          nested view staying open long enough to reference an existing trade or task by its id, with a live check against the database before a new id gets created. That let a researcher work top
          down the way the interview data was actually structured, phase, task, challenge, solution, instead of translating it into flat database rows mid conversation.
        </Body>
      </Section>

      <Section id="hosting" title="Data without a database">
        <Body>
          LOSCOPe started as an ordinary client server app, a Next.js frontend talking to a small Express and Mongoose API against a local MongoDB instance, which is what the forms above still use
          during editing. Publishing it was a different problem. The research group needed the finished graph to stay reachable long after the project itself ended, and the university could commit to
          keeping a GitLab Pages site online for ten years past a project's end date. It could not make the same commitment for a server running MongoDB, so the published version had to work without
          either.
        </Body>
        <Body>
          GitLab Pages only serves static files, so the data access layer had to work two ways from one set of functions. During development every query goes through axios to the Express API. For the
          static build, the same functions read from JSON files instead, exported straight out of MongoDB with mongoexport into the eight files the table above lists, and the lookups that used to
          happen in the database, find by id, filter by a list of ids, get every value of a field, are reproduced in plain JavaScript over that JSON, including flattening the {"{ $oid: ... }"} wrapper
          mongoexport leaves behind so the shape matches what the API used to return.
        </Body>
        <CodeBlock>
          {`if (!isProduction) {
  return (await axios.get(\`\${backendURL}/\${model}/all\`)).data;
}
const exported = await fetch(\`./mongo_exports/\${model}.json\`);
return (await exported.json()).map(flattenOid);`}
        </CodeBlock>
        <Body>
          Every component above that layer, the graph, the node inspector, the filter panel, calls the same function regardless of which mode it is running in and has no idea a database was ever
          involved. Next.js is set to output: export for a fully static build, and the GitLab CI pipeline runs the build, moves the exported output into the folder Pages actually serves, and rewrites
          asset paths since the site does not live at a domain root but under a repository scoped path. Small detail, but a missed leading dot in an asset path is enough to break every image on a
          Pages subpath, and it took a broken deploy to learn that.
        </Body>
      </Section>

      <Section id="visualization" title="Turning the graph into something browsable">
        <Body>
          The production timeline itself became the layout. Every phase below is a column a task can sit in, and the cross trade references from challenges and solutions become the edges that cut
          across those columns.
        </Body>
        <ol className="list-decimal space-y-1 pl-6 text-left text-gray-400">
          {PHASES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <Body>
          The graph itself runs on React Flow with elkjs handling automatic layered layout, since placing several hundred nodes by hand was never going to happen. A node inspector panel shows the full
          detail behind whatever is selected, a filter drawer lets a viewer collapse the graph down to one trade or one phase, and markers and modifications render as small annotations on the nodes
          they belong to rather than in a separate list, which is a lesson the digital score study had already taught me the hard way, a list next to the thing it describes is worse than a mark on the
          thing itself.
        </Body>
        {/* <ImagePlaceholder caption="Image: filtered view showing cross trade references between two departments" /> */}
          <Image src={loscopestate} alt="Filtered LOSCOPe graph with task input and output connections." caption="Filtered LOSCOPe graph with task input and output connections." />
      </Section>

      <Section id="outcome" title="Outcome and what I learned">
        <Typography type="h5" className="mt-4">
          What came out of it
        </Typography>
        <Body>
          A public, still running visualization of the full production timeline collected during the field study, a schema and a set of input masks that made it possible for non developers to add
          interview data directly in its native structure, and a static hosting setup with no runtime dependency on a database at all.
        </Body>

        <Typography type="h5" className="mt-4">
          What I take from it
        </Typography>
        <Body>
          Decide how something will be hosted before deciding how it will be built. The choice to guarantee ten years of hosting on GitLab Pages came from the university, not from me, and it forced
          the entire data layer into a shape that works with or without a server behind it. Designing that split in from the start was far cheaper than the alternative would have been, bolting a
          static export onto an app that assumes a live database everywhere.
        </Body>

        <Typography type="h5" className="mt-4">
          How I would approach it today
        </Typography>
        <Body>
          I would generate the TypeScript types directly from the JSON Schema instead of keeping both in sync by hand, and I would add a build step that fails loudly if the exported JSON and the
          schema drift apart, since right now that check only happens when someone notices the graph looks wrong.
        </Body>
      </Section>

      {/* TODO block, fill before publishing:
          - confirm the live GitLab Pages URL still resolves before linking it
          - internal link to the Digital Scores for the Opera case study page
          - real images: full graph overview, filtered cross trade view
          - decide whether to name the Deutsche Oper explicitly or anonymize it here too
      */}
    </article>
  );
}
