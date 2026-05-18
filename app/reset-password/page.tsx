"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "../../utils/supabase/client"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState("")
  const [sent, setSent] = useState(false)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(""), 3000)
  }

  async function handleSend() {
    if (!email.trim() || isLoading) return

    setIsLoading(true)
    try {
      const client = createClient()
      const redirectTo = `${window.location.origin}/reset-password/confirm`
      const { error } = await client.auth.resetPasswordForEmail(email.trim(), { redirectTo })

      if (error) {
        const code = (error as { code?: string }).code
        if (code === "over_email_send_rate_limit") {
          showToast("잠시 후 다시 시도해주세요. (이메일 발송 한도 초과)")
        } else {
          showToast("이메일 발송에 실패했습니다. 다시 시도해주세요.")
        }
        return
      }

      setSent(true)
    } catch {
      showToast("이메일 발송에 실패했습니다. 다시 시도해주세요.")
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
        <h1 className="text-2xl font-bold text-(--text) text-center mb-8">한입링크</h1>
        <div className="bg-white rounded-lg border border-(--border) p-8 space-y-4">
          {sent ? (
            <>
              <p className="text-sm text-(--text) text-center">
                비밀번호 재설정 링크를 <strong>{email}</strong>로 발송했습니다.
                <br />이메일을 확인해주세요.
              </p>
              <Link
                href="/login"
                className="block w-full text-center bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors"
              >
                로그인으로 돌아가기
              </Link>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-(--text) mb-1.5">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="가입한 이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
                  className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={!email.trim() || isLoading}
                className="w-full bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "발송 중..." : "비밀번호 재설정 링크 발송"}
              </button>
              <p className="text-center text-sm text-(--text-sub)">
                <Link href="/login" className="text-(--accent) hover:underline">
                  로그인으로 돌아가기
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
