'use client'
import React, { useState } from 'react'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Badge } from '@/components/ui/badge'

const LoginForm = () => {
    const router = useRouter();
    const [error, seterror] = useState<string | null>(null)
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            callbackUrl: "http://localhost:3000",
        });

        if (res?.ok) {
            router.push("/")
            toast({
                duration: 1500,
                title: "Login successfuly",
            })
        } else {
            seterror("Invalid email of password!")

        }
    };
    return (
        <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>

                </div>
                <Input ref={passwordRef} id="password" type="password" required />
            </div>
            {error && <Badge className='px-2.5 py-1 rounded-sm' variant={'destructive'}>{error}</Badge>}
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
    )
}

export default LoginForm