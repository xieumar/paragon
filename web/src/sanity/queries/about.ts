import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import {
  IMAGE_PROJECTION,
  PORTABLE_TEXT_PROJECTION,
  SEO_PROJECTION,
} from "./fragments";

const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"] | order(_updatedAt desc)[0]{
    header{
      eyebrow,
      heading,
      intro,
      image{ ${IMAGE_PROJECTION} }
    },
    story{
      eyebrow,
      heading,
      body[]{ ${PORTABLE_TEXT_PROJECTION} }
    },
    values{
      eyebrow,
      heading,
      items[]{ title, description }
    },
    team{
      eyebrow,
      heading,
      intro,
      members[]->{
        _id,
        name,
        role,
        bio,
        linkedin,
        photo{ ${IMAGE_PROJECTION} }
      }
    },
    ctaBand{ heading, text, cta{ label, href } },
    seo{ ${SEO_PROJECTION} }
  }
`);

const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(coalesce(order, 100) asc, name asc){
    _id,
    name,
    role,
    bio,
    linkedin,
    photo{ ${IMAGE_PROJECTION} }
  }
`);

/** The About page singleton. Returns `null` until first published. */
export async function getAboutPage() {
  const { data } = await cachedSanity({
    query: ABOUT_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

/** All team members in display order. */
export async function getTeamMembers() {
  const { data } = await cachedSanity({
    query: TEAM_MEMBERS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
