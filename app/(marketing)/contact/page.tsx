"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@honestbeauty.com", href: "mailto:hello@honestbeauty.com" },
  { icon: Phone, label: "Phone", value: "+250 788 000 000", href: "tel:+250788000000" },
  { icon: MapPin, label: "Location", value: "Kigali, Rwanda" },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 9:00 – 18:00" },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: (formData.get("subject") as string) || undefined,
      message: formData.get("message") as string,
    };

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to send message. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 dark:bg-zinc-950">
      <section className="border-b border-zinc-200/80 px-2 py-8 sm:px-3 md:px-4 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-playfair text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Contact
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Questions about a product or order? Send us a message — we typically reply within one business day.
          </p>
        </div>
      </section>

      <section className="px-2 py-10 sm:px-3 md:px-4">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Thank you</h2>
                  <p className="mt-2 text-sm text-zinc-500">We&apos;ll be in touch shortly.</p>
                  <Button variant="outline" className="mt-6 rounded-lg" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required className="rounded-lg" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" name="phone" className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject (optional)</Label>
                      <Input id="subject" name="subject" className="rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={5} required className="rounded-lg resize-none" />
                  </div>
                  <Button type="submit" className="w-full rounded-lg sm:w-auto" disabled={submitting}>
                    {submitting ? "Sending…" : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <aside className="lg:col-span-2">
            <ul className="space-y-5">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-zinc-900 hover:text-[#b5651d] dark:text-zinc-100">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
