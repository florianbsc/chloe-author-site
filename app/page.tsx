import HomeHero from "@/app/src/components/organisms/home/HomeHero";
import HomeRomansSection from "@/app/src/components/organisms/home/HomeRomansSection";
import HomeAuthorSection from "@/app/src/components/organisms/home/HomeAuthorSection";
import HomeHighlightsSection from "@/app/src/components/organisms/home/HomeHighlightsSection";
import HomeQuoteSection from "@/app/src/components/organisms/home/HomeQuoteSection";
import HomeNewsletterCtaSection from "@/app/src/components/organisms/home/HomeNewsletterCtaSection";


export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeRomansSection />
      <HomeAuthorSection />
      <HomeHighlightsSection />
      <HomeQuoteSection />
      <HomeNewsletterCtaSection />
    </>
  );
}
