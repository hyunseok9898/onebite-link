import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

const PROTECTED_PATHS = ["/", "/new"]

function isProtected(pathname: string) {
  if (PROTECTED_PATHS.includes(pathname)) return true
  if (pathname.startsWith("/folder/")) return true
  return false
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isProtected(pathname)) return NextResponse.next({ request })

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
}
