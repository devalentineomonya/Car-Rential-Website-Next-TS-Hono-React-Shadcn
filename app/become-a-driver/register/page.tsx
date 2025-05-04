"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import MainLayout from "@/components/common/layouts/MainLayout"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <MainLayout>


      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Driver Application</h1>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">
                Step {step} of {totalSteps}
              </p>
              <p className="text-sm font-medium">
                {step === 1 && "Personal Information"}
                {step === 2 && "Vehicle Details"}
                {step === 3 && "Driver's License"}
                {step === 4 && "Final Steps"}
              </p>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gray-500 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-gray-200 shadow-sm">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself so we can create your driver account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City you want to drive in</Label>
                    <Select>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                        <SelectItem value="miami">Miami</SelectItem>
                        <SelectItem value="san-francisco">San Francisco</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>How did you hear about us?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="friend">Friend or Family</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Vehicle Details</CardTitle>
                  <CardDescription>Tell us about the vehicle you plan to drive with</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Do you have a vehicle to drive with?</Label>
                    <RadioGroup defaultValue="yes" className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="yes" id="have-vehicle-yes" className="peer sr-only" />
                        <Label
                          htmlFor="have-vehicle-yes"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-500 [&:has([data-state=checked])]:border-gray-500"
                        >
                          <Check className="mb-3 h-6 w-6 text-gray-500 opacity-0 [&:has([data-state=checked])]:opacity-100 peer-data-[state=checked]:opacity-100" />
                          Yes
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="no" id="have-vehicle-no" className="peer sr-only" />
                        <Label
                          htmlFor="have-vehicle-no"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-500 [&:has([data-state=checked])]:border-gray-500"
                        >
                          <Check className="mb-3 h-6 w-6 text-gray-500 opacity-0 [&:has([data-state=checked])]:opacity-100 peer-data-[state=checked]:opacity-100" />
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-make">Vehicle make</Label>
                      <Select>
                        <SelectTrigger id="vehicle-make">
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="chevrolet">Chevrolet</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-model">Vehicle model</Label>
                      <Input id="vehicle-model" placeholder="e.g. Camry, Civic" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-year">Year</Label>
                      <Select>
                        <SelectTrigger id="vehicle-year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 15 }, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-color">Color</Label>
                      <Input id="vehicle-color" placeholder="e.g. Black, Silver" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license-plate">License plate number</Label>
                    <Input id="license-plate" placeholder="Enter license plate number" />
                  </div>

                  <div className="space-y-2">
                    <Label>Vehicle type</Label>
                    <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="standard" id="vehicle-standard" className="peer sr-only" />
                        <Label
                          htmlFor="vehicle-standard"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-500 [&:has([data-state=checked])]:border-gray-500"
                        >
                          <Check className="mb-3 h-6 w-6 text-gray-500 opacity-0 [&:has([data-state=checked])]:opacity-100 peer-data-[state=checked]:opacity-100" />
                          Standard
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="comfort" id="vehicle-comfort" className="peer sr-only" />
                        <Label
                          htmlFor="vehicle-comfort"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-500 [&:has([data-state=checked])]:border-gray-500"
                        >
                          <Check className="mb-3 h-6 w-6 text-gray-500 opacity-0 [&:has([data-state=checked])]:opacity-100 peer-data-[state=checked]:opacity-100" />
                          Comfort
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="xl" id="vehicle-xl" className="peer sr-only" />
                        <Label
                          htmlFor="vehicle-xl"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-500 [&:has([data-state=checked])]:border-gray-500"
                        >
                          <Check className="mb-3 h-6 w-6 text-gray-500 opacity-0 [&:has([data-state=checked])]:opacity-100 peer-data-[state=checked]:opacity-100" />
                          XL
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Driver's License</CardTitle>
                  <CardDescription>Provide your driver's license information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="license-number">Driver's license number</Label>
                    <Input id="license-number" placeholder="Enter your license number" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="license-state">State issued</Label>
                      <Select>
                        <SelectTrigger id="license-state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="il">Illinois</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-expiry">Expiration date</Label>
                      <Input id="license-expiry" type="date" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Upload driver's license photos</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                        <div className="flex flex-col items-center justify-center py-4">
                          <ArrowUp className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Front of license</p>
                          <p className="text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                        <div className="flex flex-col items-center justify-center py-4">
                          <ArrowUp className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Back of license</p>
                          <p className="text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Your privacy is important</p>
                      <p className="mt-1">
                        Your documents are securely stored and only used for verification purposes. We follow strict
                        data protection guidelines.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {step === 4 && (
              <>
                <CardHeader>
                  <CardTitle>Final Steps</CardTitle>
                  <CardDescription>Review and complete your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Background check consent</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <p>
                        I understand and agree that Bolt will conduct a background check, which may include a review of
                        my driving record, criminal history, and other relevant information. I authorize Bolt to obtain
                        this information for the purpose of evaluating my eligibility to drive on the platform.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="consent" />
                      <Label htmlFor="consent" className="text-sm">
                        I consent to a background check
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Terms and conditions</h3>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-gray-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-gray-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Communication preferences</h3>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing" className="text-sm">
                        I would like to receive updates, promotions, and news via email
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="sms" defaultChecked />
                      <Label htmlFor="sms" className="text-sm">
                        I would like to receive SMS notifications about my application status
                      </Label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">What happens next?</h3>
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                      <li>We'll review your application (typically within 2-3 business days)</li>
                      <li>We'll conduct a background check</li>
                      <li>Once approved, you'll receive an email with next steps</li>
                      <li>Download the driver app and start earning!</li>
                    </ol>
                  </div>
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-between pt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </Link>
              )}

              {step < totalSteps ? (
                <Button onClick={nextStep}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-gray-500 hover:bg-gray-600">
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>


    </MainLayout>
  )
}

interface ArrowUpProps extends React.SVGProps<SVGSVGElement> {}

function ArrowUp(props: ArrowUpProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
        </svg>
    )
}
