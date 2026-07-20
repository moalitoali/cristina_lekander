import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { useContentful } from "../hooks/useContentful";
import { HashLink } from "react-router-hash-link";

type Props = {
  language: "en-US" | "sv";
};

export function Hero({ language }: Props) {
  const { getEntryFieldsById } = useContentful();

  const [hero, setHero] = useState<{
    topText: string;
    topHeading: string;
    bottomHeading: string;
    linkText: string;
  }>({
    topText: "",
    topHeading: "",
    bottomHeading: "",
    linkText: "",
  });

  useEffect(() => {
    getEntryFieldsById(language, "1zLvbY5guTt3FS0VtjOug7").then((response) => {
      if (response) {
        setHero({
          topText: (response.topText as string) || "",
          topHeading: (response.topHeading as string) || "",
          bottomHeading: (response.bottomHeading as string) || "",
          linkText: (response.linkText as string) || "",
        });
      }
    });
  }, [language]);

  return (
    <section className={style.hero}>
      <div className={style.heroContent}>
        <span className={style.subtitle}>{hero.topText}</span>
        <h1 className={style.title}>
          {hero.topHeading}
          <br />
          <span className={style.titleItalic}>{hero.bottomHeading}</span>
        </h1>
        <HashLink to="#contact" className={style.discoverLink}>
          {hero.linkText} <span className={style.arrow}>→</span>
        </HashLink>
      </div>
    </section>
  );
}

const style = {
  hero: css({
    height: "calc(100vh - 12rem)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    marginTop: "12rem",
    alignItems: "center",
    position: "relative",
    padding: "0 1.5rem",
  }),
  heroContent: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "50rem",
  }),
  subtitle: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: "1.5rem",
    "@media (min-width: 768px)": {
      fontSize: "0.85rem",
      marginBottom: "2.5rem",
    },
  }),
  title: css({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "4.5rem",
    fontWeight: 300,
    lineHeight: "0.8",
    color: "#ffffff",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width: 768px)": {
      fontSize: "8.5rem",
      marginBottom: "3.5rem",
    },
  }),
  titleItalic: css({
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontWeight: 300,
    transform: "translateY(-0.05em)",
  }),
  discoverLink: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "#ffffff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    "&:hover": {
      opacity: 0.8,
      transform: "translateY(2px)",
    },
    "@media (min-width: 768px)": {
      fontSize: "0.85rem",
    },
  }),
  arrow: css({
    transition: "transform 0.3s ease",
  }),
};
