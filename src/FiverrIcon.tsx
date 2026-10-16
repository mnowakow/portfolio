import { useContext } from "react";
import { IconoirContext } from "iconoir-react";

// Iconoir has no Fiverr icon. This one follows the GithubCircle style: the
// "fi" mark inside a circle, and it picks up size and color from the
// surrounding IconoirProvider like the other social icons.
export default function FiverrIcon() {
  const { color = "currentColor", strokeWidth = 1.5, width = "1.5em", height = "1.5em" } = useContext(IconoirContext);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M10.5 17V10.5M8.75 10.5H13.25M10.5 10.5V9C10.5 7.9 11.2 7.25 12.25 7.25H13M15.25 17V10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.25" cy="7.75" r="0.75" fill={color} />
    </svg>
  );
}
