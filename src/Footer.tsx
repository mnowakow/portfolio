import { IconButton, Typography } from "@material-tailwind/react";
import { IconoirProvider } from "iconoir-react";
import type { pageIds } from "./Helper";
import { SOCIAL_LINKS } from "./socialLinks";


interface FooterProps {
  setPageId: (id: pageIds) => void;
}

export default function Footer({ setPageId }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-8 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a
            href="./"
            onClick={(e) => {
              e.preventDefault();
              setPageId("home");
            }}
            className="font-semibold text-gray-300 hover:underline"
          >
            Matthias Nowakowski
          </a>
          <Typography type="small" className="text-gray-400">
            © {year} · Research-based Product Engineer
          </Typography>
        </div>

        <IconoirProvider iconProps={{ color: "#9ca3af", strokeWidth: 1.5, width: "1.25em", height: "1.25em" }}>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((l) => (
              <IconButton
                key={l.label}
                as="a"
                href={l.href}
                aria-label={l.label}
                {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                size="sm"
                className="rounded-full border-transparent bg-transparent hover:bg-white/10"
              >
                {l.icon}
              </IconButton>
            ))}
          </div>
        </IconoirProvider>
      </div>
    </footer>
  );
}
