'use client'
import Link from "next/link";
import * as zod from 'zod'
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import '@/components/animations/background_circles.css'
import {DatePickerDemo} from "@/components/ui/datepicker";
import {redirect} from "next/navigation";
import {useState} from "react";
// import '@/components/animations/gradient_border.css'

const formSchema = zod.object({
    firstName : zod.string().min(2, ).max(40),
    lastName: zod.string().min(2, ).max(40),
    birthDate: zod.date(),
    emailAddress: zod.string().email(),
    username: zod.string().min(6, {message: "Username must be at least 6 characters long."}),
    password: zod.string().min(6, {message: 'Password must be at least 6 characters long.'}),
    passwordConfirm: zod.string(),
    accountType: zod.enum(['client', 'service provider']),
    

}).refine((data)=>{
    return data.password === data.passwordConfirm
    }, {
    message: 'Password do not match',
    }
)


const role :string[] = ['Client', 'Service Provider']

export default function RegisterPage(){
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            username: "",
            password: "",
            passwordConfirm: ""
        }
    });

    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        try {
            const response = await fetch('/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.status === 201) {
                // Successfully Registered
                console.log("User registered successfully.");
                redirect('/auth/login');
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
           <div className={`flex w-full h-screen justify-center items-center font-mont`}>
               <div id="left" className="flex flex-col w-1/2 p-2 gap-2 justify-center items-center">
                   <h1 className='font-mont font-bold text-3xl'>Welcome to Huntify!</h1>
                   <p className='text-lg mb-5'>Expert Services at Your Fingertips</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full gap-4  flex flex-col items-center justify-center'>
                            <div className='w-1/2 flex flex-col gap-2'>
                                <div id = 'names' className='flex flex-row gap-1'>
                                    
                                    
                                <FormField render={({field}) =>{
                                    return <FormItem className='w-full'>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='First Name' {...field} className=''/>
                                        </FormControl>
                                        <FormMessage/>

                                    </FormItem>
                                }} name="firstName" control={form.control}/>
                                
                                
                                <FormField render={({field}) =>{
                                    return <FormItem className='w-full'>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Last Name' {...field} className=''/>
                                        </FormControl>
                                        <FormMessage/>

                                    </FormItem>
                                }} name="lastName" control={form.control}/>
                                </div>
                                
                                <FormField render={({field}) =>{
                                    return <FormItem className='w-full'>
                                        <FormLabel>BirthDate</FormLabel>
                                        <FormControl>
                                            {/*<DatePickerDemo {...field}/>*/}
                                        </FormControl>
                                        <FormMessage/>

                                    </FormItem>
                                }} name="birthDate" control={form.control}/> 
                                

                                <FormField render={({field}) =>{
                                return <FormItem className='w-full'>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email address' {...field} className=''/>
                                    </FormControl>
                                     <FormMessage/>

                                </FormItem>
                            }} name="emailAddress" control={form.control}/>
                            <FormField render={({field}) =>{
                                return <FormItem className = 'w-full'>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Username' {...field} className=''/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            }} name="username" control={form.control}/>

                            <FormField render={({field}) =>{
                                return <FormItem className='w-full'>
                                    <FormLabel>Account Type</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder = 'Select an account type'/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = 'client'>Client</SelectItem>
                                            <SelectItem value='service provider'>Service Provider</SelectItem>
                                        </SelectContent>


                                    </Select>
                                    <FormMessage/>

                                </FormItem>
                            }} name="accountType" control={form.control}/>


                            <FormField render={({field}) =>{
                                return <FormItem className='w-full'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Password' type = 'password' {...field} className=''/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            }} name="password" control={form.control}/>

                            <FormField render={({field}) =>{
                                return <FormItem className='w-full'>
                                    <FormLabel>Password confirm</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Password confirm' type = 'password' {...field} className=''/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            }} name="passwordConfirm" control={form.control}/>
                            </div>
                        <Button type = 'submit' className='w-1/2' >Submit</Button>


                        </form>

                    </Form>
                   <p className='mb-2'>Create an account and join us!</p>
                    <form className='flex flex-col w-full h-full justify-center items-center gap-2' >

                   <p>Already have an account? <Link href={'/auth/login'} className="font-bold">Login</Link></p>


                    </form>
               </div>
               <div className='w-1/2 h-full  border-black shadow flex flex-col '>
                   <div id="right" className="area">
                       <ul className="circles">
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                           <li></li>
                       </ul>
                   </div>
                <p></p>
               </div>


           </div>
       </>

   )


}