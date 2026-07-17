import type { Metadata } from "next";
import Image from "next/image";
import { Award, CheckCircle2, Cog, Users } from "lucide-react";
import { PageBanner } from "@/components/site/PageBanner";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Xưởng cơ khí & kỹ nghệ sắt với hơn 15 năm kinh nghiệm, 500+ công trình đã thi công.",
};

const MACHINES = [
  "Máy cắt CNC Plasma",
  "Máy hàn tự động",
  "Máy uốn sắt thủy lực",
  "Dây chuyền sơn tĩnh điện",
];

const COMMITMENTS = [
  "Báo giá minh bạch, không phát sinh chi phí",
  "Vật liệu đúng chủng loại như hợp đồng",
  "Thi công đúng tiến độ cam kết",
  "Bảo hành, bảo trì tận tâm sau bàn giao",
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Về chúng tôi"
        title="Giới thiệu"
        description="Hơn 15 năm kinh nghiệm trong lĩnh vực cơ khí & kỹ nghệ sắt"
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Câu chuyện</span>
          <h2 className="mt-2 font-heading text-3xl text-primary sm:text-4xl">Xưởng cơ khí Kỹ Nghệ Sắt</h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            Thành lập từ năm 2011, Kỹ Nghệ Sắt là xưởng sản xuất trực tiếp chuyên thi công cửa sắt, cầu
            thang, lan can, cổng sắt, mái che và hàng rào theo yêu cầu. Với đội ngũ kỹ thuật giàu kinh
            nghiệm và hệ thống máy móc hiện đại, chúng tôi cam kết mang đến những sản phẩm bền đẹp, an
            toàn và đúng tiến độ cho mọi công trình.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Đến nay, chúng tôi đã hoàn thành hơn 500 công trình lớn nhỏ trên khắp cả nước, từ nhà phố, biệt
            thự đến các dự án căn hộ, nhà xưởng quy mô lớn.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="https://images.pexels.com/photos/29224609/pexels-photo-29224609.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Xưởng Kỹ Nghệ Sắt"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Cơ sở vật chất</span>
            <h2 className="mt-2 font-heading text-3xl text-primary sm:text-4xl">Xưởng sản xuất</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              "https://images.pexels.com/photos/29224610/pexels-photo-29224610.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/6036672/pexels-photo-6036672.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/16243157/pexels-photo-16243157.jpeg?auto=compress&cs=tinysrgb&w=600",
            ].map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt="Xưởng sản xuất"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Cog className="mx-auto text-accent" size={36} />
          <h2 className="mt-4 font-heading text-3xl text-primary sm:text-4xl">Máy móc thiết bị</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MACHINES.map((m) => (
              <div key={m} className="flex items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5">
                <CheckCircle2 className="shrink-0 text-accent" size={20} />
                <span className="text-text">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto text-accent" size={36} />
            <h2 className="mt-4 font-heading text-3xl text-primary sm:text-4xl">Đội ngũ</h2>
            <p className="mt-4 text-gray-600">30+ nhân sự giàu kinh nghiệm, tận tâm với từng công trình.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { name: "Anh Tùng", src: "https://images.pexels.com/photos/32845660/pexels-photo-32845660.jpeg?auto=compress&cs=tinysrgb&w=300" },
              { name: "Anh Hải", src: "https://images.pexels.com/photos/19544217/pexels-photo-19544217.jpeg?auto=compress&cs=tinysrgb&w=300" },
              { name: "Anh Long", src: "https://images.pexels.com/photos/4486212/pexels-photo-4486212.jpeg?auto=compress&cs=tinysrgb&w=300" },
              { name: "Anh Đức", src: "https://images.pexels.com/photos/16984315/pexels-photo-16984315.jpeg?auto=compress&cs=tinysrgb&w=300" },
            ].map(({ name, src }) => (
              <div key={name} className="text-center">
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <p className="mt-3 font-semibold text-text">{name}</p>
                <p className="text-xs text-gray-500">Kỹ thuật viên</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Award className="mx-auto text-accent" size={36} />
          <h2 className="mt-4 font-heading text-3xl text-primary sm:text-4xl">Cam kết</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5">
                <CheckCircle2 className="shrink-0 text-accent" size={20} />
                <span className="text-text">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
