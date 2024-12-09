"use client"

import * as React from "react"
import { useRef } from "react"
import { Minus, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample service data
const services = [
  {
    id: 1,
    name: "Web Development",
    image: "/placeholder.svg?height=80&width=80",
    variations: ["Basic", "Advanced", "Enterprise"],
    originalPrice: 999,
    discountedPrice: 799,
  },
  {
    id: 2,
    name: "Mobile App Development",
    image: "/placeholder.svg?height=80&width=80",
    variations: ["iOS", "Android", "Cross-platform"],
    originalPrice: 1499,
    discountedPrice: 1299,
  },
  {
    id: 3,
    name: "UI/UX Design",
    image: "/placeholder.svg?height=80&width=80",
    variations: ["Basic", "Premium", "Custom"],
    originalPrice: 599,
    discountedPrice: 499,
  },
]

export function ServiceCart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [quantities, setQuantities] = React.useState<{ [key: number]: number }>(
    services.reduce((acc, service) => ({ ...acc, [service.id]: 1 }), {})
  )
  const router = useRouter()

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }))
  }

  const totalPrice = services.reduce(
    (total, service) => total + service.discountedPrice * quantities[service.id],
    0
  )

  const handleBuyNow = () => {
    router.push('/checkout')
  }

  return (
    <div ref={containerRef} className="container mx-auto py-8">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-20 w-20 rounded-lg border object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="font-medium">{service.name}</div>
                      <Select defaultValue={service.variations[0]}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {service.variations.map((variation) => (
                            <SelectItem key={variation} value={variation}>
                              {variation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground line-through">
                      ${service.originalPrice}
                    </span>
                    <span className="font-medium">${service.discountedPrice}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(service.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">
                      {quantities[service.id]}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(service.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${service.discountedPrice * quantities[service.id]}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Find Similar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                🚚
              </div>
              $50 off shipping with min order of $999
              <Button variant="link" className="h-auto p-0 text-sm">
                Learn more
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                Total: ${totalPrice}
              </div>
              <Button size="lg" onClick={handleBuyNow}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

