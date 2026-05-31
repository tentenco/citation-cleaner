import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Citation Cleaner",
    short_name: "Cleaner",
    description: "Browser-local Markdown cleanup for AI chatbot citations and source artifacts.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#024ad8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
