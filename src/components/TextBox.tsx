import { css } from "@emotion/css";
import ReactMarkdown from "react-markdown";

type TextBoxProps = {
  text: string;
  title: string;
};

export function TextBox({ text, title }: TextBoxProps) {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.text}>
        <ReactMarkdown>{text}</ReactMarkdown>
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
  text: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 300,
    lineHeight: "1.8",
    color: "rgba(255, 255, 255, 0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    gap: "1rem",
    "@media (min-width: 768px)": {
      fontSize: "1.1rem",
    },
    "& p": {
      margin: "0 0 1rem 0",
    },
    "& p:last-child": {
      margin: 0,
    },
    "& strong": {
      fontWeight: 500,
      color: "#ffffff",
    },
  }),
};

