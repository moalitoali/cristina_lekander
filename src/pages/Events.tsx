import { useEffect, useState } from "react";
import { useContentful } from "../hooks/useContentful";
import { sharedStyles } from "./shared.styles";
import { TextBox } from "../components/TextBox";

type Props = {
  language: "en-US" | "sv";
};

export function Events({ language }: Props) {
  const { getEntryFieldsById } = useContentful();
  const [upcomingEvents, setUpcomingEvents] = useState<{
    heading: string;
    information: string;
  }>({
    heading: "",
    information: "",
  });

  useEffect(() => {
    getEntryFieldsById(language, "7DZ4jB4WGhZDyRYghq6k4L").then((response) => {
      if (response) {
        setUpcomingEvents({
          heading: (response.heading as string) || "",
          information: (response.information as string) || "",
        });
      }
    });
  }, [language]);

  return (
    <>
      {upcomingEvents ? (
        <section id="events" className={sharedStyles.section}>
          <TextBox
            title={upcomingEvents.heading}
            text={upcomingEvents.information}
          />
        </section>
      ) : null}
    </>
  );
}
