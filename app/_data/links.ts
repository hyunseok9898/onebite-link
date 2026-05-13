export type LinkItem = {
  id: number
  title: string
  url: string
  folder: string
  badgeColor: string
  description?: string
  thumbnail?: string
}

export const LINKS: LinkItem[] = [
  { id: 1, title: "React 공식 문서", url: "https://react.dev", folder: "개발", badgeColor: "bg-blue-500" },
  { id: 2, title: "Next.js 공식 문서", url: "https://nextjs.org", folder: "개발", badgeColor: "bg-gray-900" },
  { id: 3, title: "Tailwind CSS", url: "https://tailwindcss.com", folder: "개발", badgeColor: "bg-cyan-500" },
  { id: 4, title: "GitHub", url: "https://github.com", folder: "개발", badgeColor: "bg-gray-700" },
  { id: 5, title: "TypeScript 공식 문서", url: "https://typescriptlang.org", folder: "개발", badgeColor: "bg-blue-700" },
  { id: 6, title: "Figma", url: "https://figma.com", folder: "디자인", badgeColor: "bg-purple-500" },
  { id: 7, title: "Dribbble", url: "https://dribbble.com", folder: "디자인", badgeColor: "bg-pink-500" },
  { id: 8, title: "Hacker News", url: "https://news.ycombinator.com", folder: "뉴스", badgeColor: "bg-orange-500" },
  { id: 9, title: "네이버 뉴스", url: "https://news.naver.com", folder: "뉴스", badgeColor: "bg-green-600" },
  { id: 10, title: "Medium", url: "https://medium.com", folder: "읽을거리", badgeColor: "bg-gray-800" },
  { id: 11, title: "브런치스토리", url: "https://brunch.co.kr", folder: "읽을거리", badgeColor: "bg-yellow-600" },
  { id: 12, title: "YouTube", url: "https://youtube.com", folder: "유튜브", badgeColor: "bg-red-500" },
]
