"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, ApiError } from "@/lib/api";
import { saveSession, getSession } from "@/lib/auth";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getSession()) router.replace("/admin");
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(username, password);
      saveSession(res);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo variant="dark" />
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">Admin Dashboard</p>

        <div className="mt-8 grid gap-4">
          <div>
            <Label htmlFor="username">Tài khoản</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
      </form>
    </div>
  );
}
