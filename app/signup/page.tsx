import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-(--text) text-center mb-8">한입링크</h1>
        <div className="bg-white rounded-lg border border-(--border) p-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-(--text) mb-1.5">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
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
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>
          <button
            type="button"
            className="w-full bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors"
          >
            회원가입
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
