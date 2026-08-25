import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";


storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
});

const CONTENT_VERSION =
  process.env.NODE_ENV === "production" ? "published" : "draft";


  

export async function getJobs(params = {}) {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "jobs/",
    content_type: "job-post",
    version: CONTENT_VERSION,
    ...params,
  });
  return data.stories;
}



export async function getJob(slug) {
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/jobs/${slug}`, {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    throw error;
  }
}




export async function getDatasourceMap(slug) {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/datasource_entries", {
    datasource: slug,
    version: CONTENT_VERSION,
  });
  return new Map(data.datasource_entries.map((e) => [e.value, e.name]));
}
