import { getStoryblokApi } from "@storyblok/react/rsc";
import "@/lib/storyblok"; 

async function fetchJobs() {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    starts_with: "jobs/",
    content_type: "job-post",
    version: "draft",
  });
  return data.stories;
}

export default async function TestPage() {
  const stories = await fetchJobs();

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Storyblok Test — Jobs fetched:</h1>
      <p>Count: {stories.length}</p>
      <ul>
        {stories.map((story) => (
          <li key={story.uuid}>
            <strong>{story.content.title}</strong> — {story.content.location} ({story.content.department})
          </li>
        ))}
      </ul>
      <pre style={{ background: "#f0f0f0", padding: "1rem", marginTop: "1rem", fontSize: "0.75rem", overflow: "auto" }}>
        {JSON.stringify(stories[0], null, 2)}
      </pre>
    </main>
  );
}
