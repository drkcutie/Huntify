"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from "@paypal/react-paypal-js"
import { CreditCard, Banknote, MapPin } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import NavbarLayout from "@/components/navbar-layout"
import {PiContactlessPayment} from "react-icons/pi";

// Static data for the cart items
const cartItems = [
  { id: 1, name: "Web Development", variation: "Advanced", price: 799, quantity: 1 },
  { id: 2, name: "Mobile App Development", variation: "iOS", price: 1299, quantity: 2 },
  { id: 3, name: "UI/UX Design", variation: "Premium", price: 499, quantity: 1 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [deliveryAddress, setDeliveryAddress] = useState('')

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For now, we'll just simulate a successful payment
    router.push('/checkout/success')
  }

  const handleCashOnDelivery = () => {
    if (deliveryAddress.trim() === '') {
      alert('Please enter a delivery address')
      return
    }
    router.push('/checkout/success')
  }

  return (
    <NavbarLayout>
      <div className="container mx-auto mt-8 p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Item</th>
                      <th className="text-left pb-2">Quantity</th>
                      <th className="text-right pb-2">Price</th>
                      <th className="text-right pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">
                          {item.name} ({item.variation})
                        </td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="text-right py-2">${item.price}</td>
                        <td className="text-right py-2">${item.price * item.quantity}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td colSpan={3} className="text-right pt-4">Total:</td>
                      <td className="text-right pt-4">${totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Address</h3>
                <Textarea 
                  placeholder="Enter your full delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gcash" id="gcash" />
                    <PiContactlessPayment className="mr-2 h-4 w-4"/>
                    <Label htmlFor="gcash">GCash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <Banknote className="mr-2 h-4 w-4" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {paymentMethod === 'card' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Pay ${totalAmount}</Button>
                </form>
              )}
              {paymentMethod === 'gcash' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Full Name</Label>
                        <Input id="cardName" placeholder="John Doe" required/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gcashNumber">Phone Number</Label>
                        <Input id="gcashNumber" placeholder="09123456789" required/>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Pay ${totalAmount}</Button>
                  </form>
              )}
              {paymentMethod === 'cash' && (
                  <div>
                    <p className="mb-4">You will pay ${totalAmount} upon delivery to the address provided above.</p>
                    <Button onClick={handleCashOnDelivery} className="w-full">
                      Place Order (Cash on Delivery)
                    </Button>
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </NavbarLayout>
  )
}

