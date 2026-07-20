import { css } from "@emotion/css";
import type { ImageType } from "../types";

type AboutCardProps = {
  title: string;
  text: string;
  image: ImageType;
};

export function AboutCard({ title, text, image }: AboutCardProps) {
  return (
    <div className={style.wrapper}>
      <img src={image.url} className={style.image} alt={image.altText} />
      <div className={style.textContainer}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.paragraph}>{text}</p>
      </div>
    </div>
  );
}

const style = {
  wrapper: css({
    margin: "0 auto",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "2rem",
    padding: "3rem 2rem",
    width: "100%",
    maxWidth: "40rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    "@media (min-width: 768px)": {
      flexDirection: "row",
      textAlign: "left",
      alignItems: "center",
      padding: "4rem 3rem",
      maxWidth: "50rem",
      gap: "3rem",
    },
  }),
  textContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
  }),
  title: css({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.5rem",
    fontWeight: 300,
    letterSpacing: "0.05em",
    color: "#ffffff",
    margin: 0,
    "@media (min-width: 768px)": {
      fontSize: "3.5rem",
    },
  }),
  paragraph: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 300,
    lineHeight: "1.8",
    color: "rgba(255, 255, 255, 0.85)",
    margin: 0,
    "@media (min-width: 768px)": {
      fontSize: "1.1rem",
    },
  }),
  image: css({
    width: "12rem",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    flexShrink: 0,
    "@media (min-width: 768px)": {
      width: "14rem",
    },
  }),
};
