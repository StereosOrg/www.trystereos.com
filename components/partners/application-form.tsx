"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { usePostHog } from "posthog-js/react"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const partnerTypes = [
  "Individual",
  "Organization",
  "Government Agency",
] as const

const industries = [
  "SaaS / Software",
  "Education",
  "Healthcare",
  "Finance / Fintech",
  "E-Commerce / Retail",
  "Media / Entertainment",
  "Government",
  "Non-Profit",
  "Consulting / Agency",
  "Other",
] as const

const audienceSizes = [
  "1 - 100",
  "101 - 1,000",
  "1,001 - 10,000",
  "10,001 - 100,000",
  "100,000+",
] as const

const audienceSizeToNumber: Record<string, number> = {
  "1 - 100": 100,
  "101 - 1,000": 1000,
  "1,001 - 10,000": 10000,
  "10,001 - 100,000": 100000,
  "100,000+": 100001,
}

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company / Organization is required"),
  industry: z.enum(industries, {
    message: "Please select an industry",
  }),
  audienceSize: z.enum(audienceSizes, {
    message: "Please select an audience size",
  }).optional().transform((val) => (val ? audienceSizeToNumber[val] : undefined)),
  partnerType: z.enum(partnerTypes, {
    message: "Please select a partner type",
  }),
  imageUrl: z.string().url("Please provide a valid image URL"),
  message: z.string().max(1000, "Message must be 1000 characters or less").optional(),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

export function ApplicationForm() {
  const router = useRouter()
  const posthog = usePostHog()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      industry: undefined,
      audienceSize: undefined,
      partnerType: undefined,
      imageUrl: "",
      message: "",
    },
  })

  async function onSubmit(data: ApplicationFormValues) {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || "Something went wrong. Please try again.")
      }

      const response = await res.json()
      posthog.capture("Partner Application Submitted")
      router.push(response.redirect)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)] p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 2-column grid for name, email, company, industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                    Company / Organization
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                    Industry
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Full-width fields */}
          <FormField
            control={form.control}
            name="audienceSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                  Audience Size
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {audienceSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="partnerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                  Partner Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a partner type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {partnerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                  Profile Image URL
                </FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/your-photo.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#2b2e3a]">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your audience and why you'd like to partner with Stereos..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#2b2e3a] text-white font-medium shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:bg-[#1a1c24] transition-colors h-12 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </Form>
    </div>
  )
}
