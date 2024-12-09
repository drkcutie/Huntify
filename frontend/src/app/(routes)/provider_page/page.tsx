'use client'
import React from "react";
import Footer from "@/components/large/Footer";
import {PostService} from "@/app/api/route";

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Skeleton} from "@/components/ui/skeleton"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {DollarSign, Clock} from 'lucide-react'
import NavbarLayout from "@/components/navbar-layout";


interface Service {
    serviceId: number;
    serviceType: string;
    title: string;
    description: string;
}

const mapExperienceToLabel = (experience: string) => {
    switch (experience) {
      case 'LessThanOneYear':
        return 'Less than 1 Year';
      case 'OneToThreeYears':
        return '1-3 Years';
      case 'ThreeToFiveYears':
        return '3-5 Years';
      case 'MoreThanFiveYears':
        return 'More than 5 Years';
      default:
        return 'No experience selected';
    }
  };


const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const selectedServiceData = services.find(service => service.title === selectedService);
        if (!selectedServiceData) {
            throw new Error("Selected service not found");
        }

        const result = await PostService({
            serviceProviderId: 1, // Replace with actual service provider ID
            serviceProvider: "test", // Replace with actual service provider name
            serviceId: selectedServiceData.serviceId,
            service: selectedServiceData.title,
            rate: parseFloat(rate),
            rateType: rateType === 'hourly' ? "PerHour" : "PerOrder",
            description: description,
            yearsOfExperience: experience  
        });

        console.log("Service posted successfully: ", result);
    } catch (error: any) {
        console.error("Service posting failed: ", error.message || "An error occurred");
    }
};



export default function ProviderPage() {

    const [services, setService] = React.useState<Service[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [rate, setRate] = React.useState('');
    const [selectedService, setSelectedService] = React.useState<string>('')
    const [rateType, setRateType] = React.useState('hourly')
    const [description, setDescription] = React.useState('')
    const [experience, setExperience] = React.useState('')

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Service', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
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


    return (
        <>
            <NavbarLayout>


    {loading ? (
        <div className="flex flex-col space-y-3">
        <Skeleton className="min-h-[300px] w-10/12 rounded-xl" />
        
      </div>
    ):    error ? ( <p className="text-red-500">Error: {error}</p>
    ): services.length >0 ? (
    <div className="container mx-auto max-w-3xl p-4 my-14">
    <Card>
        <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Showcase Your Expertise</CardTitle>
            <CardDescription className="text-center text-lg">
                Let potential clients discover your primary service
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">What is your primary service?</Label>
                    <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                        <div className="grid grid-cols-2 gap-4">
                            {services.map((service) => (
                                <div key={service.serviceId} className="flex items-center space-x-2">
                                    <RadioGroupItem value={service.title} id={service.title}/>
                                    <Label htmlFor={service.title}>{service.title}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold">Describe your
                        service:</Label>
                    <Textarea
                        id="description"
                        placeholder="Provide a detailed description of your service and what makes it unique..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-32"
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="rate" className="text-lg font-semibold">Your rate:</Label>
                        <div className="flex">
                <span
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    <DollarSign className="h-5 w-5"/>
                </span>
                            <Input
                                id="rate"
                                type="number"
                                placeholder="e.g. 50"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="rateType" className="text-lg font-semibold">Rate type:</Label>
                        <Select value={rateType} onValueChange={setRateType}>
                            <SelectTrigger id="rateType">
                                <SelectValue placeholder="Select rate type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Per Hour</SelectItem>
                                <SelectItem value="fixed">Fixed Price</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="experience" className="text-lg font-semibold">Years of
                        experience:</Label>
                        <Select value={experience} onValueChange={setExperience}>
                            <SelectTrigger id="experience">
                                <SelectValue placeholder="Select Experience Duration"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LessThanOneYear">Less than 1 Year</SelectItem>
                                <SelectItem value="OneToThreeYears">1-3 Years</SelectItem>
                                <SelectItem value="ThreeToFiveYears">3-5 Years</SelectItem>
                                <SelectItem value="MoreThanFiveYears">More Than 5 Years</SelectItem>
                            </SelectContent>
                        </Select>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full text-lg py-6">
                        Publish Your Service
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>

    <Card className="mt-8">
        <CardHeader>
            <CardTitle className="text-xl font-bold">Preview</CardTitle>
            <CardDescription>This is how your service listing will appear to potential clients</CardDescription>
        </CardHeader>
        <CardContent>
            <h3 className="text-2xl font-bold mb-2">Your Service</h3>
            {selectedService && (
                <Badge variant="secondary" className="mb-4">
                    {services.find(s => s.title === selectedService)?.title}
                </Badge>
            )}
            <p className="mb-4">{description || "No description provided."}</p>
            <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600"/>
                <span
                    className="font-semibold">{rate || '0'} {rateType === 'hourly' ? '/ hour' : 'fixed price'}</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-blue-600"/>
                
                <span className="font-semibold">{mapExperienceToLabel(experience)}</span>

            </div>                                                                                      

        </CardContent>
    </Card>
    </div>
    ):(<div>No services created yet</div>
    )}



<Footer/>
</NavbarLayout>
        </>
    )

}