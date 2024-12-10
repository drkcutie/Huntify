"use client"
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Textarea
} from "@/components/ui/textarea"
import {
    PhoneInput
} from "@/components/ui/phone-input";
import {
    Input
} from "@/components/ui/input"

const formSchema = z.object({
    biographyInput: z.string(),
    phoneNumberInput: z.string(),
    name_4142876016: z.string(),
    addressInput: z.string().max(255),
    additionalDetailsInput: z.string(),
    identificationCardUpload: z.string()
});

export default function ProfileSettingsPage() {
    const [editable, setEditable] = useState < boolean > (false)
    const [countryName, setCountryName] = useState < string > ('')
    const [stateName, setStateName] = useState < string > ('')

    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),

    })

    function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="biographyInput"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write about yourself or your project here. Keep it short and meaningful!"
                                    className="resize-none"
                                    disable = {editable ? "true" : "false"}
                                    userSelect = {editable ? "auto" : "none"}
                                    readOnly = {!editable}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>You can @mention other users and organizations.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumberInput"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel>Phone number</FormLabel>
                            <FormControl className="w-full">
                                <PhoneInput
                                    placeholder="Placeholder"
                                    {...field}
                                    defaultCountry="TR"
                                />
                            </FormControl>
                            <FormDescription>Enter your phone number.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="name_4142876016"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"

                                    type=""
                                    {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="addressInput"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your address here (e.g., Street, City, Province, ZIP Code)."

                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="additionalDetailsInput"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide any additional details or notes here."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

         

                <FormField
                    control={form.control}
                    name="identificationCardUpload"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Identification Card</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"

                                    type="file"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Upload your ID to be verified</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex flex-row gap-2'>
                <Button>Edit</Button>
                <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}