"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState("")

  const isFormFilled = email.trim() !== "" && password !== "" && confirmPassword !== ""

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(""), 3000)
  }

  async function handleSignup() {
    if (!isFormFilled || isLoading) return

    if (password !== confirmPassword) {
      showToast("비밀번호가 일치하지 않습니다.")
      return
    }

    setIsLoading(true)
    try {
      const client = createClient()
      const { error } = await client.auth.signUp({ email: email.trim(), password })

      if (error) {
        const code = (error as { code?: string }).code
        if (code === "over_email_send_rate_limit") {
          showToast("잠시 후 다시 시도해주세요. (이메일 발송 한도 초과)")
        } else if (error.message.includes("already registered") || error.message.includes("already been registered")) {
          showToast("이미 가입된 이메일입니다.")
        } else if (error.message.includes("at least 6 characters")) {
          showToast("비밀번호는 6자 이상이어야 합니다.")
        } else {
          showToast("회원가입에 실패했습니다. 다시 시도해주세요.")
        }
        return
      }

      router.push("/")
    } catch {
      showToast("회원가입에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-(--text) text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-(--text) text-center mb-8">현석링크</h1>
        <div className="bg-white rounded-lg border border-(--border) p-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-(--text) mb-1.5">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-(--text) mb-1.5">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-(--text) mb-1.5">
              비밀번호 확인
            </label>
            <input
              id="password-confirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            disabled={!isFormFilled || isLoading}
            className="w-full bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "처리 중..." : "회원가입"}
          </button>
          <p className="text-center text-sm text-(--text-sub)">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-(--accent) hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
