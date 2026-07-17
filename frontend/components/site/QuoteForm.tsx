"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitQuoteRequest } from "@/lib/api";
import { SERVICE_CATEGORY_LABELS, type ServiceCategory } from "@/lib/types";
import { Input, Textarea, Select, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  serviceCategory: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function QuoteForm({
  defaultCategory,
  title = "Nhận báo giá miễn phí",
  className,
}: {
  defaultCategory?: ServiceCategory;
  title?: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceCategory: defaultCategory ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await submitQuoteRequest({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        serviceCategory: (data.serviceCategory || undefined) as ServiceCategory | undefined,
        message: data.message || undefined,
      });
      setSubmitted(true);
      reset();
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline 0984 999 087.");
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl bg-white p-8 text-center shadow-sm ${className ?? ""}`}>
        <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
        <h3 className="font-heading text-2xl text-primary">Cảm ơn bạn đã liên hệ!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Chúng tôi sẽ liên hệ lại trong vòng 24 giờ để tư vấn và khảo sát miễn phí.
        </p>
        <Button variant="outline" className="mt-6 !text-primary !border-primary" onClick={() => setSubmitted(false)}>
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`rounded-2xl bg-white p-8 shadow-sm ${className ?? ""}`}
    >
      {title && <h3 className="font-heading text-2xl text-primary">{title}</h3>}
      <div className="mt-6 grid gap-4">
        <div>
          <Label htmlFor="name">Họ và tên *</Label>
          <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input id="phone" placeholder="09xx xxx xxx" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="serviceCategory">Dịch vụ quan tâm</Label>
          <Select id="serviceCategory" {...register("serviceCategory")}>
            <option value="">-- Chọn dịch vụ --</option>
            {Object.entries(SERVICE_CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="message">Yêu cầu chi tiết</Label>
          <Textarea id="message" placeholder="Mô tả công trình, diện tích, thời gian dự kiến..." {...register("message")} />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </div>
    </form>
  );
}
