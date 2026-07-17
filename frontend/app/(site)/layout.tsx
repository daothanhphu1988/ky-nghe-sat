import { getSettings } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyContactButtons } from "@/components/site/StickyContactButtons";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch((): SiteSettings => ({}));

  return (
    <>
      <Header hotline={settings.hotline} />
      <main>{children}</main>
      <Footer settings={settings} />
      <StickyContactButtons hotline={settings.hotline} zalo={settings.zalo} />
    </>
  );
}
