"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GalleryVerticalEnd, Menu, ShoppingCart, User } from "lucide-react";
import { decode } from "@/app/api/route";
import { ServiceCart } from "@/components/service-cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { deleteCookie } from "@/app/api/route";
import { redirect } from "next/navigation";
import { FaUsersViewfinder } from "react-icons/fa6";
import { getEmail, getName, getUsername } from "@/app/api/user/route";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Feed",
          url: "/feed",
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
    {
      title: "Browse Services",
      url: "/search",
      items: [
        {
          title: "Search Services",
          url: "/search",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "Work",
      url: "#",
      items: [
        {
          title: "Check Your Services",
          url: "/services_page",
        },
        {
          title: "Create A Service",
          url: "/provider_page",
        },
      ],
    },
  ],
};

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 w-full items-center justify-between pl-5 pr-5">
          <div className="flex items-center space-x-4 pl-10">
            <Link href="/home" className="flex items-center gap-2 space-x-2">
              <FaUsersViewfinder className="h-7 w-7" />
              <span className="text-xl font-bold">Seekr</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center space-x-4 pr-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Service Cart
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <DialogHeader>
                  <DialogTitle>Service Cart</DialogTitle>
                </DialogHeader>
                <ServiceCart />
              </DialogContent>
            </Dialog>
            <UserMenu />
            <MobileNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

function MainNav() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const decoded = await decode();
        console.log("Data " + decoded);
        if (!decoded) throw new Error("Invalid token");
        setRole(decoded.role); // Assuming the role is stored in the decoded object
      } catch (err) {
        setError("Failed to load role");
        console.log(err);
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };
    fetchRole();
  }, []);
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {data.navMain
          .filter((item) => {
            if (item.title === "Work" && role !== "ServiceProvider") {
              return false;
            }
            return true;
          })
          .map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.items.map((subItem) => (
                    <li key={subItem.title}>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href={subItem.url}
                        >
                          <div className="text-sm font-medium leading-none">
                            {subItem.title}
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function UserMenu() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const decoded = await decode();
        console.log("Data " + decoded);
        if (!decoded) throw new Error("Invalid token");
        const fetchedFullName = await getName(); // Assume this returns a string or null
        setName(fetchedFullName); // Directly store the string (or null)
      } catch (err) {
        setError("Failed to load full name");
        console.log(err);
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };
    const fetchEmail = async () => {
      try {
        const fetchEmail = await getEmail();
        setEmail(fetchEmail);
      } catch (err) {
        setError("Failed to load email");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmail();
    fetchName();
  }, []); //
  function handleLogout() {
    deleteCookie();
    redirect("auth/login");
  }

  function handleProfile() {
    redirect("profile");
  }

  function handleSetting() {
    redirect("/settings");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSetting}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={() => {}}
        >
          <GalleryVerticalEnd className="mr-2 h-4 w-4" />
          <span className="font-bold">Seekr</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] overflow-y-auto pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {data.navMain.map((item) => (
              <div key={item.title}>
                <h4 className="font-medium">{item.title}</h4>
                {item.items?.length && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 py-1 text-sm">
                      Submenu
                      <Menu className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-4 left-4">
          <Button variant="outline">Service Cart</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  href: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = {
    push: (path: string) => {
      console.log(`Navigating to: ${path}`);
    },
  };
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
