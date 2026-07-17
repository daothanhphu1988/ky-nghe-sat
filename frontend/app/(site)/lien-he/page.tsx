import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getSettings } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";
import { PageBanner } from "@/components/site/PageBanner";
import { QuoteForm } from "@/components/site/QuoteForm";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ Kỹ Nghệ Sắt để được tư vấn và khảo sát miễn phí.",
};

export default async function ContactPage() {
  const settings = await getSettings().catch((): SiteSettings => ({}));
  const {
    hotline = "0909 123 456",
    email = "lienhe@kynghesat.vn",
    address = "123 Quốc lộ 1A, Quận Bình Tân, TP. Hồ Chí Minh",
    working_hours = "7:30 - 17:30, Thứ 2 - Thứ 7",
    map_embed_url,
  } = settings;

  return (
    <>
      <PageBanner eyebrow="Liên hệ" title="Liên hệ với chúng tôi" description="Khảo sát và tư vấn miễn phí trong 24 giờ" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <MapPin className="mt-0.5 shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Địa chỉ</p>
                  <p className="mt-1 font-medium text-text">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <Phone className="mt-0.5 shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Hotline</p>
                  <a href={`tel:${hotline.replace(/\s/g, "")}`} className="mt-1 block font-medium text-text hover:text-accent">
                    {hotline}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <Mail className="mt-0.5 shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                  <a href={`mailto:${email}`} className="mt-1 block font-medium text-text hover:text-accent">
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <Clock className="mt-0.5 shrink-0 text-accent" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Giờ làm việc</p>
                  <p className="mt-1 font-medium text-text">{working_hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl">
              <iframe
                src={map_embed_url ?? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ"
              />
            </div>
          </div>

          <QuoteForm title="Gửi yêu cầu tư vấn" />
        </div>
      </section>
    </>
  );
}
