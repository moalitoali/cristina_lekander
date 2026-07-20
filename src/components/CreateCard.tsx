import { css } from "@emotion/css";
import type { ImageType } from "../types";

type Props = {
  title: string;
  text: string;
  images: ImageType[];
};

export function CreateCard({ title, text, images }: Props) {
  return (
    <div id="process" className={style.wrapper}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.paragraph}>{text}</p>
      <div className={style.imageContainer}>
        {images.map((image) => (
          <img
            key={image.url}
            src={image.url}
            alt={image.altText}
            className={style.image}
          />
        ))}
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
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "2rem",
    padding: "3rem 2rem",
    width: "100%",
    maxWidth: "40rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    "@media (min-width: 768px)": {
      padding: "4rem 3rem",
      maxWidth: "50rem",
    },
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
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    width: "100%",
    "@media (min-width: 768px)": {
      flexDirection: "row",
    },
  }),
  image: css({
    width: "100%",
    maxWidth: "250px",
    height: "auto",
    borderRadius: "6px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    objectFit: "cover",
    "@media (min-width: 768px)": {
      width: "200px",
    },
  }),
};
