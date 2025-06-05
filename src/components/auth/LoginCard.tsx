"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleLoginButton } from "./GoogleLoginButton";

function OrDivider() {
  return (
    <div className="relative my-4">
      <Separator />
      <span className="text-muted-foreground bg-card absolute inset-0 -top-2.5 m-auto w-fit px-4 text-sm">
        또는
      </span>
    </div>
  );
}

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-3xl">
          <Link
            href="/"
            className="focus-visible:ring-ring decoration-2 underline-offset-10 hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2"
          >
            MMGG
          </Link>
        </CardTitle>
        <CardDescription hidden>MMGG 로그인</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="login-id">아이디</Label>
            <div className="relative">
              <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="login-id"
                type="text"
                placeholder="아이디"
                className="pl-9"
                autoComplete="username"
                aria-label="아이디 또는 이메일"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="login-password">비밀번호</Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className="pr-10 pl-9"
                autoComplete="current-password"
                aria-label="비밀번호"
              />
              <button
                type="button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                className="text-muted-foreground hover:bg-muted/40 absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/register"
              className="text-primary text-sm hover:underline"
            >
              회원가입
            </Link>
            <Link
              href="/register"
              className="text-primary text-sm hover:underline"
            >
              아이디/비밀번호 찾기
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full rounded-[4px]"
          >
            로그인
          </Button>

          <OrDivider />

          <GoogleLoginButton />
        </form>
      </CardContent>
    </Card>
  );
}
