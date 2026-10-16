import { GithubCircle, Linkedin, Mail } from "iconoir-react";
import FiverrIcon from "./FiverrIcon";

// Shared by the header on the home page and the footer.
export const SOCIAL_LINKS = [
  { href: "https://github.com/mnowakow", label: "GitHub", icon: <GithubCircle /> },
  { href: "https://www.linkedin.com/in/matthias-nowakowski-b07555168/", label: "LinkedIn", icon: <Linkedin /> },
  { href: "https://de.fiverr.com/mat_muse", label: "Fiverr", icon: <FiverrIcon /> },
  { href: "mailto:matthias.nowakowski+portfolio@gmail.com", label: "Email", icon: <Mail /> },
];
