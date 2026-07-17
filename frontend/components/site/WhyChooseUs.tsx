"use client";

import { motion } from "motion/react";
import { Factory, Clock, ShieldCheck, Award } from "lucide-react";

const ITEMS = [
  { icon: Factory, title: "Xưởng sản xuất trực tiếp", desc: "Không qua trung gian, giá thành tối ưu, kiểm soát chất lượng chặt chẽ." },
  { icon: Clock, title: "Thi công đúng tiến độ", desc: "Cam kết bàn giao đúng thời gian đã thỏa thuận trong hợp đồng." },
  { icon: ShieldCheck, title: "Vật liệu chất lượng", desc: "Sử dụng sắt thép chính hãng, sơn tĩnh điện chống gỉ sét bền bỉ." },
  { icon: Award, title: "Bảo hành dài hạn", desc: "Chế độ bảo hành từ 12-24 tháng, hỗ trợ bảo trì trọn đời." },
];

export function WhyChooseUs() {
  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Cam kết</span>
          <h2 className="mt-2 font-heading text-4xl text-primary sm:text-5xl">Vì sao chọn chúng tôi</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <item.icon size={28} />
              </div>
              <h3 className="mt-5 font-heading text-xl text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
