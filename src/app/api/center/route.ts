import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.center.findMany();
  return Response.json(data);
}
