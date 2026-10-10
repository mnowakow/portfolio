import { Typography } from "@material-tailwind/react";
import { useEffect, useState, type ReactNode } from "react";

// --- generic blog entry ---------------------------------------------

// Turns a title into a stable id, so a scroll target never has to be kept
// in sync by hand with the title shown in the overview.
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type BlogEntryData = {
  title: string;
  date: string;
  content: ReactNode;
};

function BlogEntry({ title, date, children }: { title: string; date: string; children: ReactNode }) {
  return (
    <article id={slugify(title)} className="scroll-mt-24 border-b border-gray-100 pb-12 last:border-0 last:pb-0">
      <Typography type="h3" className="mb-1 text-left text-2xl font-semibold">
        {title}
      </Typography>
      <p className="mb-4 text-left text-sm text-gray-500">{date}</p>
      <div className="flex flex-col gap-4 text-left leading-relaxed text-gray-400">{children}</div>
    </article>
  );
}

// --- overview / table of contents -----------------------------------

function BlogOverview({ entries, activeId }: { entries: BlogEntryData[]; activeId: string | null }) {
  function scrollToEntry(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="flex flex-col gap-1">
      <Typography type="small" className="mb-2 text-left font-bold text-gray-400">
        Entries
      </Typography>
      {entries.map((entry) => {
        const id = slugify(entry.title);
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollToEntry(id)}
            className={`rounded-lg px-3 py-2 text-left transition-colors hover:bg-mauve-100/50 ${
              isActive ? "bg-mauve-100/50 text-gray-700" : "text-gray-400"
            }`}
          >
            <span className={`block text-sm ${isActive ? "font-semibold" : ""}`}>{entry.title}</span>
            <span className="block text-xs text-gray-400">{entry.date}</span>
          </button>
        );
      })}
    </nav>
  );
}

// --- entries -----------------------------------------------------------
// TODO: replace these placeholders with real dissertation blog posts.

const ENTRIES: BlogEntryData[] = [
  {
    title: "Why write about a dissertation while it is still half-formed",
    date: "2026-01",
    content: (
      <p>
        Placeholder entry. This is where a first post about starting the blog,
        and about writing openly through half-formed ideas rather than only
        polished conclusions, will go.
      </p>
    ),
  },
  {
    title: "What a score actually coordinates",
    date: "2026-02",
    content: (
      <p>
        Placeholder entry. This is where a post unpacking the dissertation's
        core idea, that a score coordinates people rather than just carrying
        notes, will go.
      </p>
    ),
  },
];

// --- page ----------------------------------------------------------

export default function DissBlog() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };
    document.addEventListener("click", onClick);

    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (clicked) {
          setTimeout(() => {
            clicked = false;
          }, 500);
          return;
        }
        const mostVisible = observerEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveId(mostVisible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    ENTRIES.forEach((entry) => {
      const el = document.getElementById(slugify(entry.title));
      if (el) observer.observe(el);
    });

    return () => {
      document.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-12">
        <Typography type="h1" className="mb-3 text-center">
          Dissertation Blog
        </Typography>
        <Typography type="lead" className="mx-auto max-w-3xl text-left text-gray-400">
          Notes from writing <em>The Design of Digital Interactions for Music
          Notation</em>, posted as the research unfolds rather than after it
          is done, half-formed ideas and things I got wrong included.
        </Typography>
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <aside className="w-full shrink-0 md:sticky md:top-24 md:w-56">
          <BlogOverview entries={ENTRIES} activeId={activeId} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          {ENTRIES.map((entry) => (
            <BlogEntry key={entry.title} title={entry.title} date={entry.date}>
              {entry.content}
            </BlogEntry>
          ))}
        </div>
      </div>
    </article>
  );
}
