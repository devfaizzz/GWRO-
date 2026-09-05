export type Project = {
  id: string
  number: string
  title: string
  category: string
  year: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'voiceup',
    number: '01',
    title: 'VoiceUp',
    category: 'Mobile App',
    year: '2026',
    image: '/voiceup.png',
  },
  {
    id: 'creatoros',
    number: '02',
    title: 'Creator OS',
    category: 'SaaS Platform',
    year: '2025',
    image: '/creatoros.png',
  },
  {
    id: 'gitdecodex',
    number: '03',
    title: 'GitDecodeX',
    category: 'Developer Tool',
    year: '2025',
    image: '/gitdecodex.png',
  },
  {
    id: 'gwro',
    number: '04',
    title: 'GWRO!',
    category: 'Web Application',
    year: '2026',
    image: '/gwro.png',
  },
]

