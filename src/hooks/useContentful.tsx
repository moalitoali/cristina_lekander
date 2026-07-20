import { APP_CONFIG } from "../main";

export const useContentful = () => {
  const getEntryFieldsById = async (language: "en-US" | "sv", id: string) => {
    try {
      const entry = await APP_CONFIG.contentfulClient.getEntry(id, {
        locale: language,
        include: 2,
      });
      return entry.fields;
    } catch (error) {
      console.log(
        `Error fetching entry with id ${id} from contentful. Error: `,
        error,
      );
      return null;
    }
  };

  return { getEntryFieldsById };
};
