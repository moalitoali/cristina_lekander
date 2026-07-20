import { css } from "@emotion/css";
import type { ComponentChildren } from "preact";

type LayoutProps = {
  children: ComponentChildren;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={style}>
      <div className={bgStyle} aria-hidden="true" />
      {children}
    </div>
  );
}

const style = css({
  backgroundColor: "#000",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative",
  isolation: "isolate",
});

const bgStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#000",
  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.85) 100%), url('../../images/background.png')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  zIndex: -1,
  pointerEvents: "none",
});
