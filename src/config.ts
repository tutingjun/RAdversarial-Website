import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website:
    "https://cs.carleton.edu/cs_comps/2324/adversarial/final-results/adversarial/",
  author:
    "Sky Lu, Yuxin Lin, Jonas Bartels, Tingjun Tu, Alice Cutter, Sriya Konda",
  desc: "Website for Carleton College WI24 CS adversarial attacks comps.",
  title: "RAdversarial",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/zlxlty/RAdversarial",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
