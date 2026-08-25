import { getJobs, getDatasourceMap } from "@/lib/storyblok";
import JobCard from "@/components/JobCard";

export const metadata = {
  title: "Lediga tjänster",
  description: "Utforska alla lediga jobb hos oss.",
};

export default async function JobsPage() {
  const [jobs, departmentMap] = await Promise.all([
    getJobs(),
    getDatasourceMap("job-departments"),
  ]);

  return (
    <main className="flex-1 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-dim mb-3">
            Karriär
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gradient mb-4">
            Lediga tjänster
          </h1>
          <p className="text-muted max-w-2xl">
            {jobs.length} {jobs.length === 1 ? "tjänst" : "tjänster"} matchar just nu. Klicka på en annons för att läsa mer.
          </p>
        </div>

        {jobs.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted">
              Inga lediga tjänster just nu. Kom tillbaka snart!
            </p>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((story) => (
              <JobCard
                key={story.uuid}
                story={story}
                departmentLabel={departmentMap.get(story.content.department)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
