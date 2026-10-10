// import {useState} from "react";
import "./App.css";
import Home from "./Home";
import type { pageIds } from "./Helper";
import { useCallback, useEffect, useState } from "react";
import VibeProject from "./VibeProject";
import LoscopeProject from "./LoscopeProject";
import DobProject from "./DobProject";
import DissBlog from "./DissBlog";
import MeicoProject from "./MeicoProject";
import StackbeatPromptProject from "./StackbeatPromptProject";
import StackbeatLoveProject from "./StackbeatLoveProject";
import JuceDartFfiProject from "./JuceDartFfiProject";
import CookieBanner from "./CookieBanner";
import Footer from "./Footer";

const validPageIds: pageIds[] = [
  "home",
  "vibe",
  "loscope",
  "dob",
  "dissblog",
  "meico",
  "stackbeat-prompt",
  "stackbeat-love",
  "juce-dart-ffi",
];

function getPageFromHash(): pageIds {
  const hash = window.location.hash.replace("#", "");
  return (validPageIds as string[]).includes(hash) ? (hash as pageIds) : "home";
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
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      {activePage === "home" && <Home setPageId={setActivePage} />}
      {activePage === "vibe" && <VibeProject />}
      {activePage === "loscope" && <LoscopeProject />}
      {activePage === "dob" && <DobProject />}
      {activePage === "dissblog" && <DissBlog />}
      {activePage === "meico" && <MeicoProject />}
      {activePage === "stackbeat-prompt" && <StackbeatPromptProject />}
      {activePage === "stackbeat-love" && <StackbeatLoveProject />}
      {activePage === "juce-dart-ffi" && <JuceDartFfiProject />}
      <Footer setPageId={setActivePage} />
      <CookieBanner />
    </>
  );
}

export default App;
