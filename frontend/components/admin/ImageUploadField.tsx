"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { Input, Label } from "@/components/ui/Input";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const session = getSession();
    if (!session) return;
    setUploading(true);
    try {
      const { url } = await adminApi.upload(session.token, file);
      onChange(url);
    } catch {
      alert("Tải ảnh lên thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... hoặc tải ảnh lên"
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? "Đang tải..." : "Tải ảnh"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {value && (
        <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-lg ring-1 ring-gray-200">
          <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
