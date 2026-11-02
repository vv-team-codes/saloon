import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/zyna/sections";
import { BlogHeader, BlogIndex } from "@/components/zyna/blog";

const title = "Blog — ZYNA";
const description = "Guides and ideas for salons, clinics and appointment-based businesses in the UAE.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.zyna.ae/blog" },
      { property: "og:image", content: "https://www.zyna.ae/zyna-social-preview.png" },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <BlogHeader />
      <main>
        <BlogIndex />
      </main>
      <Footer />
    </>
  );
}
