import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.college.findMany();
  return Response.json(data);
}
