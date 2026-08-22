"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplets, Sparkles, Leaf, Shield, Heart, FlaskConical,
  ArrowRight, Check, Search, TestTube, PackageCheck, Truck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Droplets,
    title: "Skin Care",
    description: "A complete skin care range designed to cleanse, tone, hydrate and protect. Our formulas work with your skin's natural balance to deliver a healthy, radiant complexion.",
    features: ["Gentle daily cleansers", "Hydrating moisturisers", "Brightening serums", "SPF protection"],
  },
  {
    icon: Sparkles,
    title: "Body Care",
    description: "Treat your body to the same care you give your face. Our body range is packed with nourishing butters, oils and exfoliants that leave skin irresistibly soft.",
    features: ["Rich body butters", "Exfoliating scrubs", "Nourishing body oils", "Firming lotions"],
  },
  {
    icon: Leaf,
    title: "Hair Care",
    description: "From scalp to tip, our hair care range strengthens, moisturises and restores. Sulphate-free formulas that are gentle enough for daily use and effective enough to transform.",
    features: ["Sulphate-free shampoos", "Deep conditioning masks", "Leave-in treatments", "Scalp care"],
  },
  {
    icon: FlaskConical,
    title: "Natural Formulation",
    description: "Every product is developed by our in-house formulation team using ethically sourced, nature-inspired ingredients. We never use parabens, sulphates or mineral oils.",
    features: ["Paraben-free", "Sulphate-free", "No mineral oils", "Ethically sourced"],
  },
  {
    icon: Shield,
    title: "Dermatologist Tested",
    description: "All our products are clinically tested and approved by dermatologists. Safe for sensitive skin, allergy-tested and suitable for all skin types.",
    features: ["Clinically tested", "Allergy tested", "Sensitive skin safe", "All skin types"],
  },
  {
    icon: Heart,
    title: "Cruelty-Free Beauty",
    description: "We are proudly 100% cruelty-free. No animal testing at any stage of development or production. Beauty that you can feel good about, inside and out.",
    features: ["Never tested on animals", "Certified cruelty-free", "Vegan-friendly options", "Ethical sourcing"],
  },
];

const process = [
  { icon: Search, title: "Research", description: "We study skin science and source the finest natural ingredients from ethical suppliers." },
  { icon: TestTube, title: "Formulate", description: "Our team develops and refines each formula until it meets our strict efficacy standards." },
  { icon: PackageCheck, title: "Test & Certify", description: "Every product is dermatologist tested and certified before it reaches your hands." },
  { icon: Truck, title: "Deliver", description: "Carefully packaged and delivered straight to your door, wherever you are." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl container-px">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Our Products & Services</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Complete care for skin,{" "}
              <span className="text-gradient">body and hair</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need for a clean, effective beauty routine — from your morning face wash
              to your weekly hair treatment. All honest. All natural. All tested.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={service.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col group hover:shadow-lg transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/products">
                      Shop Now
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">How We Work</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">From ingredient to your doorstep</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div key={step.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
                <Card className="p-6 text-center h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Promise */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Promise</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                You always know what&apos;s inside
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe in full transparency. Every product page lists every ingredient with a plain-English explanation of what it does and why it&apos;s there. No jargon, no hiding behind trade names.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Paraben-Free", color: "bg-primary/10 text-primary" },
                  { label: "Sulphate-Free", color: "bg-chart-2/10 text-chart-2" },
                  { label: "Cruelty-Free", color: "bg-chart-3/10 text-chart-3" },
                  { label: "No Mineral Oils", color: "bg-success/10 text-success" },
                  { label: "Dermatologist Tested", color: "bg-warning/10 text-warning" },
                  { label: "Ethically Sourced", color: "bg-destructive/10 text-destructive" },
                ].map((badge) => (
                  <div key={badge.label} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${badge.color}`}>
                    <Check className="h-4 w-4 shrink-0" />
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Natural beauty ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-7xl container-px">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-dots opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to start your honest beauty routine?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Browse our full range of skin care, body care and hair care products — all clean, all tested, all honest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/products">
                    Shop the Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
