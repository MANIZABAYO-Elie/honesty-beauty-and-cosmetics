"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@nexuslabs.com", href: "mailto:hello@nexuslabs.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-0000", href: "tel:+15550100000" },
  { icon: MapPin, label: "Address", value: "100 Innovation Drive, San Francisco, CA 94016" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri: 9AM - 6PM PST" },
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
    <>
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl container-px">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Let&apos;s <span className="text-gradient">talk</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Have a question or need support? Fill out the form and our team will get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-success mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Message sent!</h2>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="name">Name *</Label><Input id="name" name="name" placeholder="Your name" required /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" placeholder="you@example.com" required /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" placeholder="+1 555 010 0000" /></div>
                    <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="How can we help?" /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" placeholder="Tell us more..." rows={6} required /></div>
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? "Sending..." : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                  </Button>
                </form>
              )}
            </Card>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <Card key={info.label} className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3"><info.icon className="h-5 w-5" /></div>
                    <h3 className="text-sm font-semibold mb-1">{info.label}</h3>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{info.value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    )}
                  </Card>
                ))}
              </div>
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <iframe title="Company Location" src="https://www.openstreetmap.org/export/embed.html?bbox=-122.52%2C37.70%2C-122.35%2C37.85&layer=mapnik&marker=37.7749%2C-122.4194" className="w-full h-full border-0" loading="lazy" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
