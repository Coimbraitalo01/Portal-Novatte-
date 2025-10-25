import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')||''
  const status = searchParams.get('status')||undefined
  const city = searchParams.get('city')||undefined
  const page = parseInt(searchParams.get('page')||'1')
  const take = Math.min(parseInt(searchParams.get('take')||'12'), 50)
  const skip = (page-1)*take

  const where:any = {}
  if(q) where.OR = [
    { title: { contains: q, mode: 'insensitive' }},
    { description: { contains: q, mode: 'insensitive' }},
    { city: { contains: q, mode: 'insensitive' }},
  ]
  if(status) where.status = status
  if(city) where.city = { contains: city, mode: 'insensitive' }

  const [items, total] = await Promise.all([
    prisma.property.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, include: { images: true } }),
    prisma.property.count({ where })
  ])
  return NextResponse.json({ items, page, take, total })
}
