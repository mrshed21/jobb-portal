import { notFound } from "next/navigation";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { getPage, getPageSlugs } from "@/lib/storyblok";

export const revalidate = 60;

/**
 * generateStaticParams — يبني كل صفحات page مسبقاً.
 * ملاحظة: /jobs يأخذ الأولوية تلقائياً لأنه folder صريح.
 */
export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Sidan kunde inte hittas" };

  // نستخدم اسم الـ story كـ title لو ما فيه بيانات SEO خاصة
  return {
    title: page.name,
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  // نتوقع content_type === "page" مع body: Blocks[]
  const body = page.content?.body || [];

  return (
    <main className="flex-1">
      {body.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  );
}
