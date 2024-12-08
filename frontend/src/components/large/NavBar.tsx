'use client'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Home() {
    return (
        <div className='w-screen border-black border-2 flex flex-row p-5 pr-10 pl-10 justify-between items-center'>

            <Link href={'/home'}>
                <p className='text-2xl font-bold font-mono'>Seekr</p>
            </Link>

            <NavigationMenu className='border-1 border-black'>
                <NavigationMenuItem className='flex flex-row space-x-4'>
                    {/* Left-aligned item */}
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About Us
                        </NavigationMenuLink>
                    </Link>

                    {/* Right-aligned items */}
                    <div className='ml-auto flex flex-row space-x-4'>
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Services
                            </NavigationMenuLink>
                        </Link>
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                How it Works
                            </NavigationMenuLink>
                        </Link>
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Category
                            </NavigationMenuLink>
                        </Link>
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Logout
                            </NavigationMenuLink>
                        </Link>
                    </div>
                </NavigationMenuItem>
            </NavigationMenu>
        </div>
    );
}
