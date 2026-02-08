"use client";

import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Users,
} from "lucide-react";

interface MeetingViewProps {
  meetingId: string;
  token: string;
  participantName: string;
  isHost: boolean;
  onLeave: () => void;
}

function ParticipantView({ participantId }: { participantId: string }) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      videoStream.current = mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) =>
          console.error("Error playing audio:", error)
        );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border">
      {webcamOn && videoStream.current ? (
        <video
          autoPlay
          playsInline
          muted={isLocal}
          ref={(ref) => {
            if (ref && videoStream.current) {
              ref.srcObject = videoStream.current;
            }
          }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-primary">
                {displayName?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{displayName}</p>
          </div>
        </div>
      )}
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
          {displayName}
        </div>
        {!micOn && (
          <div className="bg-red-500/80 backdrop-blur-sm p-1 rounded">
            <MicOff className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare, localMicOn, localWebcamOn, localScreenShareOn } =
    useMeeting();

  const handleToggleScreenShare = () => {
    try {
      toggleScreenShare();
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={localMicOn ? "default" : "destructive"}
        size="icon"
        onClick={() => toggleMic()}
        className="rounded-full h-12 w-12"
      >
        {localMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
      <Button
        variant={localWebcamOn ? "default" : "destructive"}
        size="icon"
        onClick={() => toggleWebcam()}
        className="rounded-full h-12 w-12"
      >
        {localWebcamOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
      </Button>
      <Button
        variant={localScreenShareOn ? "default" : "outline"}
        size="icon"
        onClick={handleToggleScreenShare}
        className="rounded-full h-12 w-12"
      >
        {localScreenShareOn ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => leave()}
        className="rounded-full h-12 w-12"
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
}

function MeetingContainer({ onLeave }: { onLeave: () => void }) {
  const [joinCalled, setJoinCalled] = useState(false);
  const [meetingJoined, setMeetingJoined] = useState(false);

  const { join, participants, localParticipant } = useMeeting({
    onMeetingJoined: () => {
      console.log("✓ Meeting joined successfully");
      setMeetingJoined(true);
    },
    onMeetingLeft: () => {
      console.log("Meeting left");
      setMeetingJoined(false);
      onLeave();
    },
    onParticipantJoined: (participant) => {
      console.log("Participant joined:", participant);
    },
    onParticipantLeft: (participant) => {
      console.log("Participant left:", participant);
    },
    onError: (error) => {
      console.error("Meeting error:", error);
    },
  });

  const participantsList = [...participants.values()];

  useEffect(() => {
    if (!joinCalled && join) {
      console.log("Calling join()...");
      join();
      setJoinCalled(true);
    }
  }, [join, joinCalled]);

  useEffect(() => {
    console.log("Meeting state:", { joinCalled, meetingJoined, participantCount: participantsList.length, hasLocalParticipant: !!localParticipant });
  }, [joinCalled, meetingJoined, participantsList.length, localParticipant]);

  return (
    <div className="h-full flex flex-col">
      {/* Participants Grid */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Show local participant */}
          {localParticipant && (
            <ParticipantView participantId={localParticipant.id} />
          )}
          {/* Show remote participants only (filter out local) */}
          {participantsList
            .filter((p) => p.id !== localParticipant?.id)
            .map((participant) => (
              <ParticipantView
                key={participant.id}
                participantId={participant.id}
              />
            ))}
        </div>
        {participantsList.length === 0 && !localParticipant && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Waiting for participants to join...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="border-t border-border bg-card p-4">
        {meetingJoined || localParticipant ? (
          <Controls />
        ) : (
          <div className="flex items-center justify-center flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {joinCalled ? "Connecting to meeting..." : "Initializing..."}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Check console for connection status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function MeetingView({
  meetingId,
  token,
  participantName,
  isHost,
  onLeave,
}: MeetingViewProps) {
  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: participantName,
      }}
      token={token}
    >
      <MeetingContainer onLeave={onLeave} />
    </MeetingProvider>
  );
}
