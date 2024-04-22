import Header from "@/components/header";
import SideNav from "@/components/side-nav";
import { Badge } from "@/components/ui/badge";
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
          <section className="text-center mt-20">
            <Badge>Carara State University</Badge>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2">
              OVPRIE MANAGEMENT SYSTEM
            </h1>
            <p className="text-xl text-muted-foreground mt-3 max-w-6xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero pariatur eligendi facere numquam aspernatur dignissimos odio quae alias culpa soluta fugit ipsam suscipit, vitae nihil porro? Iure possimus tempore ab?

            </p>
          </section>
        </main>
      </div>
    </main>
  );
}
