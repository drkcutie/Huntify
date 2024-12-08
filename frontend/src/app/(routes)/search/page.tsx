'use client'
import React from "react";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"



// Define the Skill interface based on your backend model
interface Service {
    serviceId: number;
    serviceType: string;
    title: string;
    description: string;
}
interface Skill {
    skillId: number;
    skillName: string;
}
interface ServiceProvider{
    serviceProviderId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    skills: Skill[];
}

export default function SearchPage() {
    
    const [services, setService] = React.useState<Service[]>([]);
    const [skills, setSkill] = React.useState<Skill[]>([]);
    const [serviceProvider, setServiceProvider] = React.useState<ServiceProvider[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [activeTab, setActiveTab] = React.useState('recommendations');
    const [key, setKey] = React.useState(0);

    React.useEffect(() => {
        setKey(key + 1);
    }, [activeTab]);    

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesResponse, skillsResponse] = await Promise.all([
                  fetch('http://localhost:5000/api/Service', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                  }),
                  fetch('http://localhost:5000/api/Skill', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                  }),
                ]);

                if (!servicesResponse.ok ) {
                    throw new Error('Failed to fetch services');
                }

                const servicesData = await servicesResponse.json();
                const skillsData = await skillsResponse.json();
                setService(servicesData);
                setSkill(skillsData);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const groupedServices = services.reduce((acc, service) => {
        if (!acc[service.serviceType]) {
            acc[service.serviceType] = [];
        }
        acc[service.serviceType].push(service);
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Lets Hunt for the Service</h1>
                <h1 className="text-4xl font-bold mb-4">You Need!</h1>
                <Command className="rounded-lg border shadow-md w-[400px]">
                <CommandInput placeholder="Type a command or search..." />
                </Command>


            </div>
            <div className="flex-1 flex flex-col items-center justify-start w-screen overflow-y-auto">            
            <Tabs key={key} defaultValue={activeTab} className="w-10/12">
            <h1 className="text-4xl font-bold mb-4">Categories:</h1>
            <TabsList>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                {services.map((serviceItem) => (
                    <TabsTrigger key={serviceItem.serviceId} value={serviceItem.title}>
                        {serviceItem.title.toUpperCase()}
                    </TabsTrigger>
                ))}
            </TabsList>
                            
                <TabsContent value="recommendations" className="py-10">
                    
                    {loading ? (
                            <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : services.length > 0 ? (
                            Object.keys(groupedServices).map((serviceType) => (
                                <div key={serviceType} className="mb-10">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {serviceType.toUpperCase()}
                                    </h2>
                                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                                        {groupedServices[serviceType].map((service) => (
                                            <div
                                            key={service.serviceId}
                                            className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                            onClick={() => {
                                                setActiveTab(service.title);
                                            }}
                                            >
                                            <p className="font-semibold text-center">
                                                {service.title}
                                            </p>
                                            <p className="text-center">
                                                {service.description}
                                            </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                        <div>No services created yet</div>
                        )}
                </TabsContent>
        {services.map((service) => (
        <TabsContent key={service.serviceId} value={service.title} className="py-10">
            {/* New section for service providers */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Service Providers</h2>
                <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {serviceProvider.map((provider) => (
                        <div
                        key={provider.serviceProviderId}
                        className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                        <p className="font-semibold text-center">
                            {provider.name}
                        </p>
                        <p className="text-center">
                            {provider.description}
                        </p>
                        </div>
                    ))}
                </div>
            </div>
        </TabsContent>
    ))}
                </Tabs>
            </div>



            <Footer />

        </>

    )
}