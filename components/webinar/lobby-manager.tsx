"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCheck, UserX, Users } from "lucide-react";
import { useMeeting } from "@videosdk.live/react-sdk";

interface LobbyEntry {
  id: string;
  participant_id: string;
  name: string;
  email: string | null;
  requested_at: number;
  status: string;
}

interface LobbyManagerProps {
  webinarId: string;
}

export function LobbyManager({ webinarId }: LobbyManagerProps) {
  const [lobbyQueue, setLobbyQueue] = useState<LobbyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const meeting = useMeeting({
    onEntryRequested: (data) => {
      // VideoSDK's entry request event
      console.log("Entry requested:", data);
      fetchLobbyQueue();
    },
  });

  const fetchLobbyQueue = async () => {
    try {
      const response = await fetch(`/api/webinars/${webinarId}/lobby`);
      if (response.ok) {
        const data = await response.json();
        setLobbyQueue(data.queue || []);
      }
    } catch (error) {
      console.error("Error fetching lobby queue:", error);
    }
  };

  useEffect(() => {
    fetchLobbyQueue();
    const interval = setInterval(fetchLobbyQueue, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [webinarId]);

  const handleAction = async (
    entry: LobbyEntry,
    action: "approve" | "deny"
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/webinars/${webinarId}/lobby`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entryId: entry.id,
          participantId: entry.participant_id,
          action,
        }),
      });

      if (response.ok) {
        // Use VideoSDK's allow/deny methods if available
        if (action === "approve") {
          // In a real implementation, you'd need to map the participant_id
          // to VideoSDK's participant object and call allow()
          console.log("Participant approved:", entry.participant_id);
        } else {
          console.log("Participant denied:", entry.participant_id);
        }

        await fetchLobbyQueue();
      }
    } catch (error) {
      console.error(`Error ${action}ing participant:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  if (lobbyQueue.length === 0) {
    return null;
  }

  return (
    <Card className="absolute top-4 right-4 w-80 max-h-96 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="h-4 w-4" />
          Waiting Room ({lobbyQueue.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {lobbyQueue.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-sm font-medium truncate">{entry.name}</p>
                  {entry.email && (
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.email}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.requested_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="default"
                    className="h-8 w-8"
                    onClick={() => handleAction(entry, "approve")}
                    disabled={isLoading}
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => handleAction(entry, "deny")}
                    disabled={isLoading}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
