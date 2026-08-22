"use client";

import { useEffect, useState, useCallback } from "react";
import { Mail, Search, Trash2, MailOpen, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("filter", filter);
    if (search) params.set("search", search);
    const data = await fetch(`/api/messages?${params}`).then((r) => r.json());
    setMessages(data ?? []);
    setLoading(false);
  }, [search, filter]);

  useEffect(() => {
    const t = setTimeout(() => fetchMessages(), 300);
    return () => clearTimeout(t);
  }, [fetchMessages]);

  const handleMarkRead = async (msg: ContactMessage) => {
    await fetch(`/api/messages/${msg._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_read: true }) });
    fetchMessages();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/messages/${deleteId}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete message."); return; }
    toast.success("Message deleted.");
    setDeleteId(null);
    fetchMessages();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">View and manage contact form submissions.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread" | "read")}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : messages.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <Mail className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold mb-1">No messages found</h3>
          <p className="text-sm text-muted-foreground">Contact form submissions will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <Card key={msg._id} className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${!msg.is_read ? "border-primary/30 bg-primary/5" : ""}`}
              onClick={() => { setSelectedMessage(msg); if (!msg.is_read) handleMarkRead(msg); }}>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 ${!msg.is_read ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {msg.is_read ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{msg.name}</p>
                    {!msg.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.subject ?? msg.message.slice(0, 60)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(msg.createdAt)}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); setDeleteId(msg._id); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selectedMessage?.subject ?? "No subject"}</DialogTitle></DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">From</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{selectedMessage.phone ?? "Not provided"}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Received</p>
                <p className="text-sm">{formatDate(selectedMessage.createdAt)}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm mb-2">Message</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button asChild variant="outline" className="flex-1">
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject ?? "Your inquiry"}`}>Reply via Email</a>
                </Button>
                <Button variant="outline" className="hover:text-destructive" onClick={() => { setDeleteId(selectedMessage._id); setSelectedMessage(null); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The message will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
