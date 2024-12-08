'use client';
import Link from 'next/link';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import '@/components/animations/background_circles.css';
import { registerUser } from '@/app/api/route';
import {redirect} from "next/navigation";

const formSchema = zod.object({
    firstName: zod.string().min(2).max(40),
    lastName: zod.string().min(2).max(40),
    dateOfBirth: zod
        .union([zod.string(), zod.null()])
        .refine(
            (value) =>
                value === null ||
                (!isNaN(Date.parse(value)) && new Date(value) > new Date(1950, 0, 1) && new Date(value) < new Date()),
            {
                message: 'Date must be valid and in the past, after January 1, 1950.',
            }
        ),
    email: zod.string().email(),
    username: zod.string().min(6, { message: 'Username must be at least 6 characters long.' }),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    passwordConfirm: zod.string(),
    accountType: zod.enum(['Client', 'Service Provider']),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match.',
});

export default function RegisterPage() {
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: null, // Set to null as default
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            accountType: undefined,
        },
    });

    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {
        console.log("Registering user")
        
        try {
            const result = await registerUser({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                dateOfBirth: values.dateOfBirth,
                username: values.username,
                accountType: values.accountType == "Client" ? 0: 1, 
                password: values.password,
            });
        } catch (error: any) {
        }
    };

    return (
        <>
            <div className="flex w-full h-screen justify-center items-center font-mont">
                <div id="left" className="flex flex-col w-1/2 p-2 gap-2 justify-center items-center">
                    <h1 className="font-mont font-bold text-3xl">Welcome to Huntify!</h1>
                    <p className="text-lg mb-5">Expert Services at Your Fingertips</p>
                    <div className="max-h-[70vh] overflow-auto w-full">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="w-full gap-4 flex flex-col items-center justify-center"
                            >
                                <div className="w-1/2 flex flex-col gap-2">
                                    <div id="names" className="flex flex-row gap-1">
                                        <FormField
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="First Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            name="firstName"
                                            control={form.control}
                                        />
                                        <FormField
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Last Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            name="lastName"
                                            control={form.control}
                                        />
                                    </div>
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Birthdate</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        placeholder="Enter Birthdate (YYYY-MM-DD)"
                                                        value={field.value || ''}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="dateOfBirth"
                                        control={form.control}
                                    />
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Email address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="email"
                                        control={form.control}
                                    />
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="username"
                                        control={form.control}
                                    />
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Account Type</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select an account type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Client">Client</SelectItem>
                                                        <SelectItem value="Service Provider">Service Provider</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="accountType"
                                        control={form.control}
                                    />
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="password"
                                        control={form.control}
                                    />
                                    <FormField
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Confirm Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        name="passwordConfirm"
                                        control={form.control}
                                    />
                                </div>
                                <Button type="submit" className="w-1/2">
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <p className="mb-2">Create an account and join us!</p>
                    <p>
                        Already have an account? <Link href="/auth/login" className="font-bold">Login</Link>
                    </p>
                </div>
                <div className="w-1/2 h-full border-black shadow flex flex-col">
                    <div id="right" className="area">
                        <ul className="circles">
                            {[...Array(19)].map((_, i) => (
                                <li key={i}></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
