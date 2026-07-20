import { AboutCard } from "../components/AboutCard";
import { useEffect, useState } from "react";
import { useContentful } from "../hooks/useContentful";
import { sharedStyles } from "./shared.styles";
import type { Asset } from "contentful";
import type { ImageType } from "../types";

type Props = {
  language: "en-US" | "sv";
};

export function About({ language }: Props) {
  const { getEntryFieldsById } = useContentful();
  const [about, setAbout] = useState<{
    heading: string;
    text: string;
    image: ImageType;
  }>({
    heading: "",
    text: "",
    image: { url: "", altText: "" },
  });

  useEffect(() => {
    getEntryFieldsById(language, "cVCtytRpzmKpuJcNtTmV8").then((response) => {
      if (response && response.image) {
        const imageAsset = response.image as Asset;
        if (imageAsset.fields) {
          setAbout({
            heading: (response.heading as string) || "",
            text: (response.presentation as string) || "",
            image: {
              url: (imageAsset.fields.file?.url as string) || "",
              altText: (imageAsset.fields.description as string) || "",
            },
          });
        }
      }
    });
  }, [language]);

  return (
    <section id="about" className={sharedStyles.section}>
      <AboutCard title={about.heading} text={about.text} image={about.image} />
    </section>
  );
}
