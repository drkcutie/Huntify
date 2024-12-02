'use client'
import { FormEvent, useState } from "react";
import { Montserrat } from "@next/font/google";
import Link from "next/link";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = zod.object({
    username: zod.string().min(6, { message: "Username must be at least 6 characters long." }),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

export default function LoginPage() {
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.status === 201) {
                // Successfully Registered
                console.log("User registered successfully.");
            } else if (response.status === 400) {
                // Error, not registered
                const errorData = await response.json();
                if (errorData.errors) {
                    console.error("Error registering user:", errorData.errors);
                }
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <>
            <div className="flex w-full h-screen justify-center items-center font-mont">
                <div id="left" className="flex flex-col w-1/2 p-2 gap-2 justify-center items-center">
                    <h1 className="font-mont font-bold text-3xl">Welcome to Huntify!</h1>
                    <p className="text-lg mb-5">Expert Services at Your Fingertips</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col items-center gap-4">
                            <div className="w-1/2 gap-2 flex flex-col">
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                    <p>
                        Don't have an account?
                        <Link href="/auth/register" className="font-bold"> Register</Link>
                    </p>
                </div>
                <div className="w-1/2 h-full border-black shadow flex flex-col">
                    <div id="right" className="area">
                        <ul className="circles">
                            {Array.from({ length: 19 }, (_, i) => <li key={i}></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
