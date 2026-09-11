import { work } from "./work";
import { siteSettings } from "./site-settings";
import { homePage } from "./home-page";
import { aboutPage } from "./about-page";
import { contactPage } from "./contact-page";
import { uiLabels } from "./ui-labels";

export const schemaTypes = [
  work,
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  uiLabels,
];

/** Document types that should exist only once (edited, never created/deleted). */
export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
  "uiLabels",
]);
