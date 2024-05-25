import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import LoginForm from "./login.form"
export const metadata: Metadata = {
  title: "Login",
  description: "A task and issue tracker build using Tanstack Table.",
}
export default function Login() {


  // if(!res?.error) {
  //   router.push('/')
  // }

  // if (res === undefined) {
  //   toast({
  //     duration: 1500,
  //     title: "Account not found!",
  //   })
  // }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />

        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://webcodeits.com/wp-content/uploads/2021/02/csu-1-e1643418396913.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
