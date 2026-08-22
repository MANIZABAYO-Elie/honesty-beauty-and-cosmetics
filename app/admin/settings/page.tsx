"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your site settings and preferences.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Company Information</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Honest Beauty and Cosmetics Ltd" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Contact Email</Label>
              <Input id="company-email" type="email" defaultValue="hello@honestbeauty.com" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" defaultValue="+250 788 000 000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-hours">Business Hours</Label>
              <Input id="company-hours" defaultValue="Mon – Sat: 9:00 – 18:00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Address</Label>
            <Textarea id="company-address" rows={2} defaultValue="Kigali, Rwanda" />
          </div>
          <Button onClick={() => toast.success("Settings saved.")}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input id="meta-title" defaultValue="Honest Beauty and Cosmetics Ltd — Premium Beauty & Skincare" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea id="meta-description" rows={3} defaultValue="Premium beauty and cosmetics — honest ingredients, dermatologist-tested formulas, made for everyday confidence." />
          </div>
          <Button onClick={() => toast.success("SEO settings saved.")}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
