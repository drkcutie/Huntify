'use client'
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import {Button} from "@/components/ui/button";
import {CarIcon} from "@/components/statics/Icons";
import React from "react";
import ServiceCard from "@/components/large/ServiceCard";
import ProviderCard from "@/components/large/ProviderCard";


export default function LandingPage() {

    return (
        <>
            <Navbar></Navbar>
            <div className='w-full h-auto bg-white flex flex-col pb-5'>
                <section className='w-full  min-h-80  border-2 flex-col flex items-center justify-center'>
                    <p className='text-5xl font-bold text-center'>Find Your<br/> Trusted Tasker</p>
                    <p className='text-m
                    '>
                        Expert Services at your fingertips
                    </p>


                </section>
                <section className='w-full  border-2 flex-col flex items-center justify-center gap-10 p-7'>
                    <p className='font-mono'>Our platform connects you with trusted, verified professionals,
                        ensuring quality and reliability. We offer <strong>seamless experience </strong>
                        with a <strong>user-friendly interface</strong> and <strong>simple booking process</strong>.
                        Your satisfaction is our top priority, backed by dedicated support and
                        a satisfaction guarantee.
                    </p>
                    <div id='highlights-section' className='flex flex-row w-full gap-5'>
                        <div id='highlight-box1'
                             className='flex flex-col justify-center items-center w-1/3 p-2 border rounded-2xl'>
                            <i> </i>
                            <p className='font-bold text-2xl'>200+ Services</p>
                            <p className='text-gray-600 text-center'>Choose over 200 different services from
                                home cleaning, to event support. We're
                                Constantly expanding to meat all of your needs</p>
                        </div>
                        <div id='highlight-box2'
                             className='flex flex-col justify-center items-center w-1/3 p-2 border rounded-2xl'>
                            <i> </i>
                            <p className='font-bold text-2xl'>200+ Services</p>
                            <p className='text-gray-600 text-center'>Choose over 200 different services from
                                home cleaning, to event support. We're
                                Constantly expanding to meat all of your needs</p>
                        </div>
                        <div id='highlight-box3'
                             className='flex flex-col justify-center items-center w-1/3 p-2 border rounded-2xl'>
                            <i> </i>
                            <p className='font-bold text-2xl'>200+ Services</p>
                            <p className='text-gray-600 text-center'>Choose over 200 different services from
                                home cleaning, to event support. We're
                                Constantly expanding to meat all of your needs</p>
                        </div>
                    </div>


                </section>
                <section className='w-full  resize-y border-2 flex-col flex items-center justify-center'>
                    <p className='font-bold text-2xl'>Discover our Most Popular Services</p>
                    <p className='text-gray-600'>Explore our most in-demand services, trusted by customers for their
                        quality and reliability</p>
                    {/*Make cards component*/}
                </section>
                <section className='w-full  border-2 flex-row flex items-center justify-center p-20 gap-10'>
                    <div id='texts' className='flex flex-col w-1/2'>
                        <p className='font-bold text-3xl'>
                            Step-By-Step Guide
                            on Getting your Tasks
                            Done with Ease
                        </p>
                        <p className='text-gray-600'>
                            Discover how simple it is to get professional help for your everyday needs.
                            Follow these three straightforward steps to connect with skilled service providers and
                            complete your
                            task effortlessly.
                        </p>
                    </div>
                    <div className='w-1/2 flex flex-col gap-5' id='steps-container'>
                        <div id='step-1' className='flex-col flex'>
                            <i>

                            </i>
                            <div id='step-1-text'>
                                <p className='font-bold text-2xl'>
                                    Choose your service
                                </p>
                                <p className='text-gray-600'>Browse our wide range of service categories and select the
                                    one
                                    that fits your needs. Whether it's home maintenance, cleaning, moving, or personal
                                    assistance, we've got you covered./</p>
                            </div>
                        </div>
                        <div id='step-1' className='flex-col flex'>
                            <i>

                            </i>
                            <div id='step-1-text'>
                                <p className='font-bold text-2xl'>
                                    Choose your service
                                </p>
                                <p className='text-gray-600'>Browse our wide range of service categories and select the
                                    one
                                    that fits your needs. Whether it's home maintenance, cleaning, moving, or personal
                                    assistance, we've got you covered./</p>
                            </div>

                        </div>
                        <div id='step-1' className='flex-col flex'>
                            <i>

                            </i>
                            <div id='step-1-text'>
                                <p className='font-bold text-2xl'>
                                    Choose your service
                                </p>
                                <p className='text-gray-600'>Browse our wide range of service categories and select the
                                    one
                                    that fits your needs. Whether it's home maintenance, cleaning, moving, or personal
                                    assistance, we've got you covered.</p>
                            </div>
                        </div>


                    </div>
                </section>
                <section className='w-full border-2 flex-col flex items-center justify-center p-20 gap-10'>
                    <div id='header_categories' className='flex flex-row justify-between w-full pl-10 pr-10'>
                        <div className='w-full flex flex-row justify-between'>
                            <div className='flex flex-col justify-between items-start'>
                                <p className='font-bold text-2xl'>Explore our Service Categories</p>
                                <p className='text-gray-600'>Connecting you with skilled professionals for your
                                    needs.</p>
                            </div>
                            <Button>
                                All Categories
                            </Button>
                        </div>
                    </div>
                    <div id='card_container'
                         className='flex flex-row scroll-auto  no-scrollbar overflow-x-auto whitespace-nowrap justify-start items-start w-full pt-2 pb-2 pr-20 pl-20 gap-5'>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>
                        <ServiceCard icon={<CarIcon/>} title="Car Services"></ServiceCard>

                    </div>
                </section>

                <section className='w-full border-2 flex-col flex items-center justify-center p-20 gap-10'>
                    <p className='text-5xl'>Meet our Top Rated Tasker</p>
                    <Button>View all Taskers</Button>
                    <div
                        className='w-full flex flex-row justify-center items-center no-scrollbar overflow-x-auto gap-7 pl-10 pr-10 p-2'>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                        <ProviderCard name='Derrick' image='' rate='500' rating='4.9' reviews_count='100'
                                      skills={[]}></ProviderCard>
                    </div>
                </section>
                <section
                    className='w-full rounded-xl bg-green-900  border-2 flex-row flex items-center justify-center p-20 gap-10'>
                    <div className='flex flex-col gap-2 self-start border-2'>
                        <p className='font-bold text-5xl text-white'>Want to offer your services?</p>
                        <p className='text-gray-200  '>Sign up today and connect with people around you</p>
                        <Button className='w-36 mt-5'>Sign up</Button>
                    </div>
                </section>

            </div>
            <Footer></Footer>
        </>
    )


}
