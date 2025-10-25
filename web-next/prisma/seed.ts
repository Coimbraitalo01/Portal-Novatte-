import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function run(){
  const count = await prisma.property.count()
  if(count>0) return
  const p1 = await prisma.property.create({ data: {
    title: 'Casa Moderna no Centro', price: 650000,
    description: 'Excelente casa com 3 quartos, 2 banheiros, garagem para 2 carros.',
    address: 'Rua A, 123', city: 'Santo Antônio de Pádua', area: 320, status: 'Venda'
  }})
  await prisma.propertyImage.createMany({ data: [
    { propertyId: p1.id, url: '/img/sample-house-1.jpg' },
  ]})
}
run().finally(()=>prisma.$disconnect())
