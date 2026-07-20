import { useEffect, useState } from "react";
import { useContentful } from "../hooks/useContentful";
import { ContactCard } from "../components/ContactCard";
import { sharedStyles } from "./shared.styles";

type Props = {
  language: "en-US" | "sv";
};

export function Contact({ language }: Props) {
  const { getEntryFieldsById } = useContentful();
  const [contactDetails, setContactDetails] = useState<{
    heading: string;
    email: string;
    instagram: {
      username: string;
      url: string;
    };
  }>({
    heading: "",
    email: "",
    instagram: {
      username: "",
      url: "",
    },
  });

  useEffect(() => {
    getEntryFieldsById(language, "5E9I97MazXmlywf0BBXnu2").then(
      (response: any) => {
        if (response && response.instagram.fields) {
          setContactDetails({
            heading: (response.heading as string) || "",
            email: (response.email as string) || "",
            instagram: {
              username: (response.instagram?.fields?.username as string) || "",
              url: (response.instagram?.fields?.link as string) || "",
            },
          });
        }
      },
    );
  }, [language]);

  return (
    <section id="contact" className={sharedStyles.section}>
      <ContactCard
        title={contactDetails.heading}
        email={contactDetails.email}
        instagram={contactDetails.instagram}
      />
    </section>
  );
}
