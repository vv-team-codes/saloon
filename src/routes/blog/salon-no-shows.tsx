import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/zyna/sections";
import { BlogHeader, NoShowsArticle, posts } from "@/components/zyna/blog";

const post = posts[0];
const title = `${post.title} — ZYNA`;

export const Route = createFileRoute("/blog/salon-no-shows")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt },
      { property: "og:url", content: "https://www.zyna.ae/blog/salon-no-shows" },
      { property: "og:image", content: "https://www.zyna.ae/zyna-social-preview.png" },
      { property: "article:published_time", content: post.date },
      { name: "twitter:image", content: "https://www.zyna.ae/zyna-social-preview.png" },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <>
      <BlogHeader />
      <main>
        <NoShowsArticle />
      </main>
      <Footer />
    </>
  );
}
