import { css, cx } from "@emotion/css";

type Props = {
  language: "en-US" | "sv";
  setLanguage: (language: "en-US" | "sv") => void;
};

export function LanguageToggle({ language, setLanguage }: Props) {
  return (
    <button
      onClick={() => {
        setLanguage(language === "en-US" ? "sv" : "en-US");
      }}
      type="button"
      className={styles.button}
    >
      <span
        className={cx(
          styles.textColor,
          language === "en-US" && css({ color: "white" }),
        )}
      >
        EN
      </span>
      <span
        className={cx(
          styles.textColor,
          css({ hover: { color: "rgba(255, 255, 255, 0.7)" } }),
        )}
      >
        /
      </span>
      <span
        className={cx(
          styles.textColor,
          language === "sv" && css({ color: "white" }),
        )}
      >
        SV
      </span>
    </button>
  );
}

const styles = {
  button: css({
    appearance: "none",
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: "#2d2d2d",
    transition: "color 0.3s ease",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    cursor: "pointer",
    "&:hover": {
      color: "#ffffff",
    },
  }),
  textColor: css({
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
    "@media (min-width: 768px)": {
      fontSize: "0.8rem",
    },
  }),
};
