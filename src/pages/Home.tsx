import { css } from "@emotion/css";
import { Hero } from "./Hero";
import { About } from "./About";
import { Process } from "./Process";
import { Contact } from "./Contact";
import { Events } from "./Events";

type Props = {
  language: "en-US" | "sv";
};

export function Home({ language }: Props) {
  return (
    <div className={style.container}>
      <Hero language={language} />
      <About language={language} />
      <Process language={language} />
      <Events language={language} />
      <Contact language={language} />
    </div>
  );
}

const style = {
  container: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};
