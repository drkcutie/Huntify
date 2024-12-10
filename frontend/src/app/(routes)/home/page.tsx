"use client";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Button } from "@/components/ui/button";
import { CarIcon } from "@/components/statics/Icons";
import React from "react";
import ServiceCard from "@/components/large/ServiceCard";
import ProviderCard from "@/components/large/ProviderCard";
import NavbarLayout from "@/components/navbar-layout";
import ServiceCart from "@/app/(routes)/cart/page";
import { Input } from "@/components/ui/input";
import { SearchIcon, SettingsIcon } from "lucide-react";
import { GoPeople } from "react-icons/go";
import { BsPersonCheck } from "react-icons/bs";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

export default function LandingPage() {
  return (
    <>
      <NavbarLayout>
        <div className="flex h-auto w-full flex-col bg-white pb-5">
          <section className="flex min-h-96 w-full flex-col items-center justify-center border-2 bg-green-900 text-white shadow-2xl">
            <p className="text-center text-5xl font-bold">
              Find Your
              <br /> Trusted Tasker
            </p>
            <p className="text-m">Expert Services at your fingertips</p>
            <div className="mt-3 flex flex-row items-center justify-center gap-2">
              <SearchIcon className="w-6"></SearchIcon>
              <Input
                className="w-96 rounded-2xl border-0 bg-slate-200 bg-opacity-95 text-gray-800 placeholder-white shadow-2xl"
                placeholder="Find the perfect service you need!"
              ></Input>
              <Button className="w-28 rounded-2xl bg-green-600 shadow-2xl hover:bg-green-700">
                Search
              </Button>
            </div>
          </section>
          <section className="flex w-full flex-col items-center justify-center gap-10 border-2 bg-orange-50 p-7 pl-48 pr-48">
            <p className="font-monospace text-center text-2xl text-gray-800">
              Our platform connects you with trusted, verified professionals,
              ensuring quality and reliability. We offer{" "}
              <strong>seamless experience </strong>
              with a <strong>user-friendly interface</strong> and{" "}
              <strong>simple booking process</strong>. Your satisfaction is our
              top priority, backed by dedicated support and a satisfaction
              guarantee.
            </p>
            <div
              id="highlights-section"
              className="flex w-full flex-row gap-5 text-center"
            >
              <div
                id="highlight-box1"
                className="flex w-2/3 cursor-pointer flex-col items-center justify-center rounded border bg-white p-4 shadow-lg hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-400">
                  <SettingsIcon className="h-10 w-10 text-black" />
                </div>
                <p className="text-2xl font-bold">200+ Services</p>
                <p className="text-center text-gray-600">
                  Choose over 200 different services from home cleaning, to
                  event support. We're Constantly expanding to meat all of your
                  needs
                </p>
              </div>
              <div
                id="highlight-box2"
                className="flex w-2/3 cursor-pointer flex-col items-center justify-center rounded border bg-white p-4 shadow-lg hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-400">
                  <BsPersonCheck className="h-10 w-10 text-black" />
                </div>
                <p className="text-2xl font-bold">799+ Service Providers</p>
                <p className="text-center text-gray-600">
                  Choose over 200 different services from home cleaning, to
                  event support. We're Constantly expanding to meat all of your
                  needs
                </p>
              </div>
              <div
                id="highlight-box3"
                className="flex w-2/3 cursor-pointer flex-col items-center justify-center rounded border bg-white p-4 shadow-lg hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-400">
                  <GoPeople className="h-10 w-10 text-black" />
                </div>
                <p className="text-2xl font-bold">10k+ Happy Customers</p>
                <p className="text-center text-gray-600">
                  Choose over 200 different services from home cleaning, to
                  event support. We're Constantly expanding to meat all of your
                  needs
                </p>
              </div>
            </div>
          </section>
          <section className="flex w-full resize-y flex-col items-center justify-center border-2 p-10">
            <p className="mb-4 text-4xl font-bold text-gray-700">
              Discover Our Most Popular Services
            </p>
            <p className="text-center font-bold text-gray-600">
              Explore the services trusted by our customers for exceptional
              quality and reliability. Find the perfect solution tailored to
              your needs.
            </p>
            {/* Placeholder for card components showcasing services */}
          </section>

          <section className="flex w-full flex-row items-center justify-center gap-10 border-2 bg-orange-50 p-20 pl-48 pr-48">
            <div id="texts" className="flex w-1/2 flex-col">
              <p className="text-3xl font-bold leading-snug">
                Step-By-Step Guide on Getting Your Tasks Done With Ease
              </p>
              <p className="mt-4 text-gray-600">
                Discover how simple it is to get professional help for your
                everyday needs. Follow these three straightforward steps to
                connect with skilled service providers and complete your tasks
                effortlessly.
              </p>
            </div>
            <div id="steps-container" className="flex w-1/2 flex-col gap-10">
              <div
                id="step-1"
                className="flex flex-col rounded-2xl bg-white p-5 shadow hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black">
                  <RiNumber1 />
                </div>
                <div id="step-1-text">
                  <p className="text-2xl font-bold">Find the Right Service</p>
                  <p className="mt-2 text-gray-600">
                    Browse through our extensive range of service categories.
                    Whether it's home maintenance, cleaning, or personal
                    assistance, you'll find the help you need in just a few
                    clicks.
                  </p>
                </div>
              </div>
              <div
                id="step-2"
                className="flex flex-col rounded-2xl bg-white p-5 shadow hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black">
                  <RiNumber2 />
                </div>
                <div id="step-2-text">
                  <p className="text-2xl font-bold">
                    Connect with Professionals
                  </p>
                  <p className="mt-2 text-gray-600">
                    Select from top-rated professionals who meet your
                    requirements. Compare their profiles, reviews, and rates to
                    find your perfect match.
                  </p>
                </div>
              </div>
              <div
                id="step-3"
                className="flex flex-col rounded-2xl bg-white p-5 shadow hover:scale-105"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black">
                  <RiNumber3 />
                </div>
                <div id="step-3-text">
                  <p className="text-2xl font-bold">Relax as We Handle It</p>
                  <p className="mt-2 text-gray-600">
                    Let the experts take care of your task with precision and
                    care. Enjoy a stress-free experience while we ensure quality
                    service delivery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col items-center justify-center gap-10 border-2 p-20">
            <div
              id="header_categories"
              className="flex w-full flex-row justify-between pl-10 pr-10"
            >
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col items-start justify-between">
                  <p className="text-2xl font-bold">
                    Explore our Service Categories
                  </p>
                  <p className="text-gray-600">
                    Connecting you with skilled professionals for your needs.
                  </p>
                </div>
                <Button>All Categories</Button>
              </div>
            </div>
            <div
              id="card_container"
              className="flex w-full flex-row items-start justify-start gap-5 overflow-x-auto scroll-auto whitespace-nowrap pb-2 pl-20 pr-20 pt-2 no-scrollbar"
            >
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
              <ServiceCard
                icon={<CarIcon />}
                title="Car Services"
              ></ServiceCard>
            </div>
          </section>

          <section className="flex w-full flex-col items-center justify-center gap-10 border-2 p-20">
            <p className="text-5xl">Meet our Top Rated Tasker</p>
            <Button>View all Taskers</Button>
            <div className="flex w-full flex-row items-center justify-center gap-7 overflow-x-auto p-2 pl-10 pr-10 no-scrollbar">
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
              <ProviderCard
                name="Derrick"
                image=""
                rate="500"
                rating="4.9"
                reviews_count="100"
                skills={[]}
              ></ProviderCard>
            </div>
          </section>
          <section className="flex w-full flex-row items-center justify-center gap-10 rounded-xl border-2 bg-green-900 p-20">
            <div className="flex flex-col gap-2 self-start border-2">
              <p className="text-5xl font-bold text-white">
                Want to offer your services?
              </p>
              <p className="text-gray-200">
                Sign up today and connect with people around you
              </p>
              <Button className="mt-5 w-36">Sign up</Button>
            </div>
          </section>
        </div>
        <Footer></Footer>
      </NavbarLayout>
    </>
  );
}
