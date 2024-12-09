"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from "@paypal/react-paypal-js"
import { Loader2, CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavbarLayout from "@/components/navbar-layout"

// Static data for the cart items
const cartItems = [
  { id: 1, name: "Web Development", variation: "Advanced", price: 799 },
  { id: 2, name: "Mobile App Development", variation: "iOS", price: 1299 },
  { id: 3, name: "UI/UX Design", variation: "Premium", price: 499 },
]

export default function PaymentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setStep(prev => prev - 1)
  }

  const handlePayPalApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setStep(3) // Move to confirmation step
      }, 2000)
    })
  }

  return (
    <NavbarLayout>
      <div className="container mx-auto mt-8 p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} ({item.variation})</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="pt-4">
                  <h4 className="text-md font-semibold mb-2">Payment Method</h4>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount.toString(),
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={handlePayPalApprove}
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center space-y-4">
                {loading ? (
                  <Loader2 className="h-16 w-16 animate-spin mx-auto" />
                ) : (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h3 className="text-2xl font-semibold">Payment Successful!</h3>
                    <p>Thank you for your purchase. Your order has been confirmed.</p>
                    <Button onClick={() => router.push('/')}>Return to Home</Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && step < 3 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            )}
            {step === 1 && (
              <Button onClick={handleNextStep}>
                Continue to Payment
              </Button>
            )}
          </CardFooter>
        </Card>
        <div className="mt-8 max-w-2xl mx-auto text-sm text-muted-foreground">
          <h4 className="font-semibold mb-2">Important Payment Information:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>All transactions are secure and encrypted.</li>
            <li>You will receive an email confirmation of your purchase.</li>
            <li>For any issues or refunds, please contact our support team within 14 days of purchase.</li>
            <li>By completing this purchase, you agree to our Terms of Service and Privacy Policy.</li>
          </ul>
        </div>
      </div>
    </NavbarLayout>
  )
}

