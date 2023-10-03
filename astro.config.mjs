import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "FireStarter",
      social: {
        github: "https://github.com/cherryyeti/firestarter",
      },
      sidebar: [
        {
          label: "Context",
          autogenerate: { directory: "context" },
        },
        {
          label: "Getting Started",
          items: [
            { label: "Start Here!", link: "/setup/start/" },
            { label: "Prerequisites", link: "/setup/prerequisites/" },
            { label: "Configuration", link: "/setup/configuration/" },
            { label: "Running", link: "/setup/running/" },
          ],
        },
      ],
    }),
  ],
});
