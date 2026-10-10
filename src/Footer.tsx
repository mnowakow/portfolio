import { IconButton, Typography } from "@material-tailwind/react";
import { GithubCircle, IconoirProvider, Linkedin, Mail } from "iconoir-react";
import type { pageIds } from "./Helper";

interface FooterProps {
  setPageId: (id: pageIds) => void;
}

export default function Footer({ setPageId }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 px-8 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPageId("home");
            }}
            className="font-semibold text-gray-600 hover:underline"
          >
            Matthias Nowakowski
          </a>
          <Typography type="small" className="text-gray-400">
            © {year} · Research based Product Engineer
          </Typography>
        </div>

        <IconoirProvider iconProps={{ color: "#6b7280", strokeWidth: 1.5, width: "1.25em", height: "1.25em" }}>
          <div className="flex items-center gap-2">
            <IconButton
              size="sm"
              className="rounded-full border-transparent bg-transparent hover:bg-gray-100"
              onClick={() => window.open("https://github.com/mnowakow")}
              aria-label="GitHub"
            >
              <GithubCircle />
            </IconButton>
            <IconButton
              size="sm"
              className="rounded-full border-transparent bg-transparent hover:bg-gray-100"
              onClick={() => window.open("https://www.linkedin.com/in/matthias-nowakowski-b07555168/")}
              aria-label="LinkedIn"
            >
              <Linkedin />
            </IconButton>
            <IconButton
              size="sm"
              className="rounded-full border-transparent bg-transparent hover:bg-gray-100"
              onClick={() => window.open("mailto:matthias.nowakowski+portfolio@gmail.com")}
              aria-label="Email"
            >
              <Mail />
            </IconButton>
          </div>
        </IconoirProvider>
      </div>
    </footer>
  );
}
