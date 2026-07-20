import { css } from "@emotion/css";

export const sharedStyles = {
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

  section: css({
    width: "100%",
    padding: "0rem 1.5rem 5rem 1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
};
