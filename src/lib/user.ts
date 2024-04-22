'use client'
import { useSession } from "next-auth/react"

export function User() {
  const { data: session } = useSession()

  
  return session?.user.id
}