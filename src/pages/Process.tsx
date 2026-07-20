import { CreateCard } from "../components/CreateCard";
import { useContentful } from "../hooks/useContentful";
import { useEffect, useState } from "react";
import { sharedStyles } from "./shared.styles";
import type { ImageType } from "../types";
import type { Asset } from "contentful";

type Props = {
  language: "en-US" | "sv";
};

export function Process({ language }: Props) {
  const { getEntryFieldsById } = useContentful();

  const [process, setProcess] = useState<{
    heading: string;
    description: string;
    images: ImageType[];
  }>({
    heading: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    getEntryFieldsById(language, "21wLdvfD8l54FkGo0oWUpU").then((response) => {
      const images = (response?.images as Asset[]).map((image) => {
        return {
          url: (image.fields.file?.url as string) || "",
          altText: (image.fields.description as string) || "",
        };
      });
      if (response) {
        setProcess({
          heading: (response.heading as string) || "",
          description: (response.description as string) || "",
          images: images,
        });
      }
    });
  }, [language]);

  return (
    <section id="process" className={sharedStyles.section}>
      <CreateCard
        title={process.heading}
        text={process.description}
        images={process.images}
      />
    </section>
  );
}
