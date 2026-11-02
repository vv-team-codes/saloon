import { createFileRoute } from "@tanstack/react-router";
import {
  Navbar,
  Hero,
  Problem,
  MidCta,
  HowItWorks,
  Features,
  Waitlist,
  Results,
  Comparison,
  Pricing,
  Faq,
  FinalCta,
  Contact,
  Footer,
} from "@/components/zyna/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "ZYNA — The 24/7 AI Receptionist",
      },
      {
        name: "description",
        content:
          "Never miss a booking again. ZYNA replies, books and reminds — day and night.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "ZYNA — The 24/7 AI Receptionist",
      },
      {
        property: "og:description",
        content:
          "Never miss a booking again. ZYNA replies, books and reminds — day and night.",
      },
      {
        property: "og:url",
        content: "https://www.zyna.ae/",
      },
      {
        property: "og:image",
        content: "https://www.zyna.ae/zyna-social-preview.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: "https://www.zyna.ae/zyna-social-preview.png",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <MidCta />
        <HowItWorks />
        <Features />
        <Waitlist />
        <Results />
        <Comparison />
        <Pricing />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}