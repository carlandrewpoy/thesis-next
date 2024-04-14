import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.faculty.findMany();
  return Response.json(data);
}
