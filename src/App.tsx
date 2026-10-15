import "./App.css";
import Home from "./Home";
import type { pageIds } from "./Helper";
import { lazy, Suspense, useCallback, useEffect, useState, type ComponentType, type LazyExoticComponent } from "react";
import { ArrowLeft } from "iconoir-react";
import CookieBanner from "./CookieBanner";
import Footer from "./Footer";

type SubPageId = Exclude<pageIds, "home">;

// Project pages are loaded on demand so the home page stays light.
// "dissblog" is left out until it has real posts, see DissBlog.tsx.
const pages: Partial<Record<SubPageId, { title: string; component: LazyExoticComponent<ComponentType> }>> = {
  vibe: { title: "VIBE", component: lazy(() => import("./VibeProject")) },
  loscope: { title: "LOSCOPe", component: lazy(() => import("./LoscopeProject")) },
  dob: { title: "Digital Scores for the Opera", component: lazy(() => import("./DobProject")) },
  meico: { title: "MEI to MusicXML, for meico", component: lazy(() => import("./MeicoProject")) },
  "stackbeat-prompt": { title: "A StackBeat Prompt", component: lazy(() => import("./StackbeatPromptProject")) },
  "stackbeat-love": { title: "StackBeat L.O.V.E.", component: lazy(() => import("./StackbeatLoveProject")) },
  "juce-dart-ffi": { title: "JUCE, over FFI, into Flutter", component: lazy(() => import("./JuceDartFfiProject")) },
};

const SITE_TITLE = "Matthias Nowakowski · Research-based Product Engineer";

function getPageFromHash(): pageIds {
  const hash = window.location.hash.replace("#", "");
  return hash in pages ? (hash as pageIds) : "home";
}

function App() {
  const [activePage, setActivePageState] = useState<pageIds>(getPageFromHash);

  const setActivePage = useCallback((id: pageIds) => {
    if (id === "home") {
      history.pushState(null, "", window.location.pathname + window.location.search);
    } else {
      window.location.hash = id;
    }
    setActivePageState(id);
  }, []);

  useEffect(() => {
    function onHashChange() {
      setActivePageState(getPageFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  // A new page should always start at the top, not where the last one was left.
  useEffect(() => {
    window.scrollTo(0, 0);
    const page = activePage === "home" ? undefined : pages[activePage];
    document.title = page ? `${page.title} · Matthias Nowakowski` : SITE_TITLE;
  }, [activePage]);

  const page = activePage === "home" ? undefined : pages[activePage];

  return (
    <>
      {page ? (
        <>
          <nav className="sticky top-0 z-40 flex px-6 py-3 backdrop-blur">
            <a
              href="./"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("home");
              }}
              className="flex items-center gap-2 rounded-full bg-amber-300 px-4 py-1.5 text-sm font-medium text-black hover:bg-amber-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to overview
            </a>
          </nav>
          <Suspense fallback={<div className="min-h-screen" />}>
            <page.component />
          </Suspense>
        </>
      ) : (
        <Home setPageId={setActivePage} />
      )}
      <Footer setPageId={setActivePage} />
      <CookieBanner />
    </>
  );
}

export default App;
