'use client'
import React from "react";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import {PostService} from "@/app/api/route";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface Service {
    serviceId: number;
    serviceType: string;
    title: string;
    description: string;
}


const handleSubmit = async (values: any) => {
  try {
    const result = await PostService({
      providerServiceId: 1,
      serviceProviderId: 1,
      serviceProvider: "test",
      serviceId: 1,
      service: "plumbing",
    });
    console.log("Service posted successfully: ", result);
  } catch (error: any) {
    console.error("Service posting failed: ", error.message || "An error occurred");
  }
};

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })
   



export default function ProviderPage() {

    const [services, setService] = React.useState<Service[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    
    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/Service', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch services');
            }
    
            const servicesData = await response.json();
            setService(servicesData);
            setLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
          }
        };

        fetchData();
    }, []);
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          items: ["recents", "home"],
        },
      })

    const onSubmit=(data: z.infer<typeof FormSchema>) => {
        handleSubmit(data);
      };
     
    

    

  return(
    <>
        <Navbar />
        <div className="flex flex-col items-center justify-center">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4 flex flex-col justify-center items-center ">
                <FormLabel className="text-base">What Services do you Offer?</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              <div className="flex flex-row"> 
              {services.map((service) => (
                <FormField 
                  key={service.title}
                  control={form.control}
                  name="items"
                  
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.title}
                        className="flex flex-row items-start space-x-3 space-y-0 mx-10"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.title)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service.title])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== service.title
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {service.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              </div>
              <FormMessage  />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>

        <Footer />
        
    </>
  )

}