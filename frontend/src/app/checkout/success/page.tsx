import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NavbarLayout from "@/components/navbar-layout"

export default function CheckoutSuccessPage() {
  return (
    <NavbarLayout>
      <div className="container mx-auto mt-8 p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Thank you for your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <p className="mb-4">Your order has been confirmed and will be processed shortly.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </NavbarLayout>
  )
}

