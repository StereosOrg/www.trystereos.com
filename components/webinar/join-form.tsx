"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface JoinFormProps {
  webinarId: string;
  webinarTitle: string;
  onJoin: (data: { name: string; email?: string }) => void;
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
}

export function JoinForm({
  webinarId,
  webinarTitle,
  onJoin,
  isAuthenticated,
  userName,
  userEmail,
}: JoinFormProps) {
  const [name, setName] = useState(userName || "");
  const [email, setEmail] = useState(userEmail || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onJoin({ name, email: email || undefined });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join Webinar</CardTitle>
          <CardDescription>{webinarTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isAuthenticated && !!userName}
              />
            </div>

            {!isAuthenticated && (
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We'll use this to send you the recording after the webinar
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !name.trim()}>
              {isLoading ? "Joining..." : "Join Webinar"}
            </Button>

            {!isAuthenticated && (
              <p className="text-xs text-center text-muted-foreground">
                Guests will be placed in a waiting room until approved by the host
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
