import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.facultyEngagement.findMany();
  return Response.json(data);
}
