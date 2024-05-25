import Header from "@/components/header";
import SideNav from "@/components/side-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import React from 'react'
export const metadata: Metadata = {
  title: "Home",
  description: "A task and issue tracker build using Tanstack Table.",
}


export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <div className="flex flex-col gap-4  sm:pl-14">
        <Header />
        <main>
          <section className="text-center mt-10">
            <Badge className="px-5 py-2 text-base">Caraga State University</Badge>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2">
              OVPRIE MANAGEMENT SYSTEM
            </h1>
            <p className="text-xl text-muted-foreground mt-3 max-w-6xl mx-auto">
              The Office of the Vice President for Research, Innovation, and Extension (OVPRIE) is the driving force behind the research, innovation, and extension endeavors of the university. Led by the VPRIE, it advises the University President on policies, strategies, and budgetary matters in these domains.
            </p>
          </section>
          {/* <section className="flex max-w-6xl mx-auto mt-16 gap-10">
            <Card >
              <CardContent className="p-10">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
                  The OVPRIE Management System serves as the university's nerve center for coordinating research, innovation, and extension efforts. Through meticulous planning and oversight, it ensures alignment with institutional goals and priorities, empowering stakeholders to maximize their impact.
                </h4>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-10">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  With its intuitive interface and comprehensive features, the OVPRIE Management System streamlines processes, facilitates collaboration, and enables effective decision-making. From coordinating interdisciplinary projects to managing budgets and tracking performance, it drives a culture of innovation and excellence within the university ecosystem.
                </h4>
              </CardContent>
            </Card>
          </section> */}
        </main>
      </div>
    </main>
  );
}
