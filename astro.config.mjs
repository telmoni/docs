// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";

// GitHub Pages, on the custom domain `docs.telmoni.com` (`public/CNAME`; the DNS CNAME points at
// telmoni.github.io). `DOCS_SITE` and `DOCS_BASE` override both for a preview served from
// somewhere else, such as a repository's own Pages site under a path.
const site = process.env.DOCS_SITE || "https://docs.telmoni.com";
const base = process.env.DOCS_BASE !== undefined ? process.env.DOCS_BASE : "";

// The sidebar is the book's order, and it is the only place that holds it: `slug` is checked
// against the pages on disk at build time, so a renamed page fails here rather than shipping a
// dead nav entry. An entry carries no `label` of its
// own, so the name in the nav is the page's own `title` and the two cannot drift apart.
// The two faces the palette names, resolved through Astro's font pipeline rather than by importing
// Fontsource's stylesheet. The pipeline is what emits the `<link rel="preload">` and, more to the
// point, a fallback whose metrics are adjusted to each face (`size-adjust`, `ascent-override`), so
// the fallback occupies the same space as the real one and the swap cannot move the line. Importing
// the stylesheet gave neither, which is what made the header jump on every page load.
//
// `latin` only: the book is English, and every subset named here is preloaded, so an unused one is
// bytes on the wire for nobody. Add a subset when a page needs the glyphs, not before. The family
// names are **Fontsource's** (`Inter`, not `Inter Variable`): a name this provider does not know
// resolves to no font at all, emits no preload, and still builds clean.
/** @type {NonNullable<import("astro").AstroUserConfig["fonts"]>} */
const fonts = [
  {
    name: "Inter",
    cssVariable: "--font-inter",
    provider: fontProviders.fontsource(),
    weights: ["100 900"],
    styles: ["normal"],
    subsets: ["latin"],
    fallbacks: ["system-ui", "sans-serif"],
  },
  {
    name: "Geist Mono",
    cssVariable: "--font-geist-mono",
    provider: fontProviders.fontsource(),
    weights: ["100 900"],
    styles: ["normal"],
    subsets: ["latin"],
    fallbacks: ["ui-monospace", "monospace"],
  },
];

export default defineConfig({
  site,
  base,
  redirects: {
    "/privacy-policy": "/legal/privacy-policy/",
    "/terms-of-service": "/legal/terms-of-service/",
  },
  fonts,
  integrations: [
    starlight({
      title: "Telmoni",
      customCss: ["./src/styles/custom.css"],
      // Component overrides:
      // - Head: preloads font faces and runs corners boot script before first paint.
      // - ThemeSelect: provides both theme (light/dark/auto) and corners (curved/sharp) controls.
      components: {
        Head: "./src/components/Head.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
      },
      description: "Documentation for Telmoni.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/telmoni/telmoni",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/telmoni/docs/edit/main/",
      },
      sidebar: [
        {
          label: "Getting started",
          items: [
            { label: "Introduction", slug: "" },
            { slug: "getting-started/sign-in" },
          ],
        },
        {
          label: "Self-hosting",
          items: [
            { slug: "self-host/overview" },
            { slug: "self-host/docker-compose" },
            { slug: "self-host/kubernetes" },
            { slug: "self-host/agent" },
            { slug: "self-host/configuration" },
            { slug: "self-host/production" },
          ],
        },
        {
          label: "Organizations and projects",
          items: [
            { slug: "workspace/organizations-and-projects" },
            { slug: "workspace/members" },
            { slug: "workspace/roles" },
            { slug: "workspace/audit-log" },
            { slug: "workspace/billing" },
          ],
        },
        {
          label: "Notifications",
          items: [
            { slug: "integrations/notifications" },
            { slug: "integrations/slack-and-discord" },
            { slug: "integrations/webhooks" },
          ],
        },
        {
          label: "Developer tools & API",
          items: [
            { slug: "api/cli" },
            { slug: "api/sdks" },
            { slug: "api/api-keys" },
            { slug: "api/reference" },
            { slug: "errors" },
          ],
        },
        {
          label: "Account",
          items: [
            { slug: "account/settings" },
            { slug: "account/privacy" },
          ],
        },
        {
          label: "Legal",
          items: [
            { slug: "legal/privacy-policy" },
            { slug: "legal/terms-of-service" },
            { slug: "legal/subprocessors" },
            { slug: "legal/security" },
          ],
        },
      ],
      expressiveCode: {
        styleOverrides: {
          borderRadius: "var(--radius-md)",
        },
      },
    }),
  ],
});
