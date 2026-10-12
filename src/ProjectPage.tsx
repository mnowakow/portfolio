import {
  Typography,
  Chip,
  Card,
  CardBody,
} from "@material-tailwind/react";
import type { ReactNode } from "react";
import { ArrowRight, OpenNewWindow } from "iconoir-react";

// Shared building blocks for the case study pages (VibeProject, DobProject,
// LoscopeProject). Anything project specific, like a results table, stays in
// the page that uses it.

export function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="my-8">
      <div className="flex h-64 w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
        <Typography type="small" className="text-gray-200">
          {caption}
        </Typography>
      </div>
    </figure>
  );
}

export function Image({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className="my-8 flex h-full flex-col">
      <img src={src} alt={alt} className={className ?? "mx-auto rounded-xl"} />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 text-gray-300">
      <Typography type="h4" className="mb-4 text-center">
        {title}
      </Typography>
      <div className="flex flex-col gap-4 text-gray-400">{children}</div>
    </section>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <Typography type="p" className="text-left leading-relaxed text-gray-400">
      {children}
    </Typography>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <Card className="border border-gray-100 shadow-none">
      <CardBody className="overflow-x-auto bg-gray-900 py-4">
        <pre className="text-left font-mono text-xs leading-relaxed text-gray-100">
          {children}
        </pre>
      </CardBody>
    </Card>
  );
}

export type FactGroup = { label: string; items: string[] };

export function QuickFacts({ groups }: { groups: FactGroup[] }) {
  return (
    <Card className="mt-6 border border-gray-100 shadow-none">
      <CardBody className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {groups.map((g) => (
          <div key={g.label}>
            <Typography type="small" className="mb-2 text-left font-bold text-gray-400">
              {g.label}
            </Typography>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item} variant="outline" size="sm">
                  <Chip.Label>{item}</Chip.Label>
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

export type ProjectLink = { href: string; label: string };

// A link starting with "#" is treated as internal (in page anchor or a future
// route) and opens in the same tab; anything else opens in a new tab.
export function LinksCard({ links }: { links: ProjectLink[] }) {
  return (
    <Card className="mt-4 border border-gray-100 shadow-none">
      <CardBody className="flex flex-col gap-3">
        <Typography type="small" className="text-left font-bold text-gray-400">
          Links
        </Typography>
        {links.map((l) => {
          const isExternal = !l.href.startsWith("#");
          return (
            <a
              key={l.href + l.label}
              href={l.href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-2 text-left hover:underline text-gray-500"
            >
              {l.label}
              {isExternal ? <OpenNewWindow className="h-4 w-4 shrink-0" /> : <ArrowRight className="h-4 w-4 shrink-0" />}
            </a>
          );
        })}
      </CardBody>
    </Card>
  );
}

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Chip key={t} variant="ghost" color="info" size="sm">
          <Chip.Label>{t}</Chip.Label>
        </Chip>
      ))}
    </div>
  );
}

export function ProjectHeader({
  tags,
  title,
  lead,
  factGroups,
  links,
}: {
  tags: string[];
  title: string;
  lead: ReactNode;
  factGroups: FactGroup[];
  links?: ProjectLink[];
}) {
  return (
    <header>
      <ProjectTags tags={tags} />

      <Typography type="h1" className="mb-3 text-center">
        {title}
      </Typography>
      <Typography type="lead" className="text-left text-gray-400">
        {lead}
      </Typography>

      <QuickFacts groups={factGroups} />
      {links && links.length > 0 && <LinksCard links={links} />}
    </header>
  );
}
