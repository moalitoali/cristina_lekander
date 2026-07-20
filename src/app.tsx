import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);
}

function AppContent() {
  const [language, setLanguage] = useState<"en-US" | "sv">("sv");
  useScrollToHash();

  return (
    <Layout>
      <Header language={language} setLanguage={setLanguage} />
      <main className={style.main}>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/gallery" element={<Gallery language={language} />} />
        </Routes>
      </main>
      <Footer />
    </Layout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const style = {
  main: css({
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};
