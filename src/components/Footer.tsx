import { css } from "@emotion/css";

export function Footer() {
  return (
    <footer role={"navigation"} className={style.container}>
      Copyright 2026
    </footer>
  );
}

const style = {
  container: css({
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    backdropFilter: "blur(10px)",
    height: "2.25rem",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",

    padding: "0 2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    flexShrink: 0,
    width: "100%",
  }),
  link: css({
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "0.125rem",
    fontSize: "1rem",
  }),
};
