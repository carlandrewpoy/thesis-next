"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/server-actions/auth/auth";
import React from "react";

const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader className="text-center font-semibold">
          Create your account.
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-4" action={createUser}>
            <div className="flex gap-x-2">
              <div>
                <Label htmlFor="email">Firstname</Label>
                <Input required name="firstname" />
              </div>
              <div>
                <Label htmlFor="email">Lastname</Label>
                <Input required name="lastname" />
              </div>
            </div>
            <Label htmlFor="email">Email</Label>
            <Input required type="email" name="email" />
            <Label htmlFor="password">Password</Label>
            <Input required type="password" name="password" />
            <Button type="submit">Signup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
