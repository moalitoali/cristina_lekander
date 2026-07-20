import { render } from "preact";
import { App } from "./app.tsx";
import * as contentful from "contentful";

/** Initialize Contentful client */
var client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const APP_CONFIG = {
  contentfulClient: client,
};

render(<App />, document.getElementById("app")!);
