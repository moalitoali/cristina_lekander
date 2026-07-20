import { css, keyframes } from "@emotion/css";
import { Link } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { useEffect, useState } from "react";
import { APP_CONFIG } from "../main";

type Props = {
  language: "en-US" | "sv";
  setLanguage: (language: "en-US" | "sv") => void;
};

export function Header({ language, setLanguage }: Props) {
  const [navigation, setNavigation] = useState<
    Array<{ text: string; url: string }>
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled((prev) => (prev ? prev : true));
      } else {
        setScrolled((prev) => (prev ? false : prev));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    APP_CONFIG.contentfulClient
      .getEntry("1xe9HeGEuJLmup0S2xiCdA", { locale: language, include: 2 })
      .then(function (entry: any) {
        const navigation = entry.fields.navigation.map((navItem: any) => ({
          text: navItem.fields.title,
          url: navItem.fields.to,
        }));
        setNavigation(navigation);
      });
  }, [language]);

  return (
    <>
      <nav
        role={"navigation"}
        className={style.container(scrolled && !menuOpen)}
      >
        <Link
          to={"/"}
          className={style.logo}
          onClick={() => setMenuOpen(false)}
        >
          Cristina Lekander
        </Link>
        <div className={style.desktopLinks}>
          {navigation.map((link) => (
            <Link to={link.url} className={style.link} key={link.url}>
              {link.text}
            </Link>
          ))}
        </div>
        <div className={style.desktopLang}>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={style.menuButton}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className={style.mobileOverlay}>
          <div className={style.mobileLinks}>
            {navigation.map((link) => (
              <Link
                to={link.url}
                className={style.mobileLink}
                onClick={() => setMenuOpen(false)}
                key={link.url}
              >
                {link.text}
              </Link>
            ))}
          </div>
          <div className={style.mobileLang}>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </div>
      )}
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const style = {
  container: (scrolled: boolean) =>
    css({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1001,
      width: "100%",
      backgroundColor: scrolled ? "rgba(0, 0, 0, 0.75)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: scrolled ? "1rem 1rem" : "1.5rem 1rem",
      transition:
        "background-color 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease",
      "@media (min-width: 1024px)": {
        padding: scrolled ? "1.25rem 4rem" : "2.5rem 4rem",
      },
    }),
  logo: css({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: 400,
    color: "white",
    textDecoration: "none",
    letterSpacing: "0.05em",
    zIndex: 1002,
    "@media (min-width: 1024px)": {
      fontSize: "1.8rem",
    },
  }),
  desktopLinks: css({
    display: "none",
    "@media (min-width: 1024px)": {
      display: "flex",
      alignItems: "center",
      gap: "2.5rem",
    },
  }),
  desktopLang: css({
    display: "none",
    "@media (min-width: 1024px)": {
      display: "block",
    },
  }),
  link: css({
    textDecoration: "none",
    fontSize: "0.75rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    transition: "color 0.3s ease",
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      color: "white",
    },
    "@media (min-width: 1024px)": {
      fontSize: "0.8rem",
    },
  }),
  menuButton: css({
    display: "block",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "0.5rem",
    zIndex: 1002,
    transition: "transform 0.2s ease, opacity 0.2s ease",
    "&:active": {
      transform: "scale(0.95)",
    },
    "@media (min-width: 1024px)": {
      display: "none",
    },
  }),
  mobileOverlay: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(12px)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "10rem",
    gap: "3rem",
    alignItems: "center",
    animation: `${fadeIn} 0.25s ease-out forwards`,
    "@media (min-width: 1024px)": {
      display: "none",
    },
  }),
  mobileLinks: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.25rem",
  }),
  mobileLink: css({
    textDecoration: "none",
    fontSize: "1.25rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    transition: "color 0.3s ease, transform 0.3s ease",
    color: "rgba(255, 255, 255, 0.7)",
  }),
  mobileLang: css({
    marginTop: "1.5rem",
  }),
};
