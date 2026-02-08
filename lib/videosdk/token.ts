import jwt from "jsonwebtoken";

const VIDEOSDK_API_KEY = process.env.VIDEOSDK_API_KEY;
const VIDEOSDK_SECRET = process.env.VIDEOSDK_SECRET;

if (!VIDEOSDK_API_KEY || !VIDEOSDK_SECRET) {
  console.warn(
    "⚠️  VIDEOSDK_API_KEY and VIDEOSDK_SECRET must be set in environment variables"
  );
}

export interface VideoSDKTokenPayload {
  apikey: string;
  permissions: string[];
  version?: number;
  roomId?: string;
  participantId?: string;
  roles?: string[];
}

export type VideoSDKPermission = "allow_join" | "ask_join" | "allow_mod";

/**
 * Generate VideoSDK token for participants
 */
export function generateVideoSDKToken(options: {
  permissions: VideoSDKPermission[];
  roomId?: string;
  participantId?: string;
  expiresIn?: string;
  isHost?: boolean;
  isManagement?: boolean;
}): string {
  if (!VIDEOSDK_API_KEY || !VIDEOSDK_SECRET) {
    throw new Error("VideoSDK credentials not configured");
  }

  const {
    permissions,
    roomId,
    participantId,
    expiresIn = "120m",
    isHost = false,
  } = options;

  const payload: VideoSDKTokenPayload = {
    apikey: VIDEOSDK_API_KEY,
    permissions,
  };

  // Add version and roles only for management tokens
  if (options.isManagement) {
    payload.version = 2;
    payload.roles = ["crawler"];
  }

  if (roomId) {
    payload.roomId = roomId;
  }

  if (participantId) {
    payload.participantId = participantId;
  }

  const jwtOptions: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  return jwt.sign(payload, VIDEOSDK_SECRET, jwtOptions);
}

/**
 * Generate host token with full permissions
 */
export function generateHostToken(options: {
  roomId?: string;
  participantId?: string;
  expiresIn?: string;
}): string {
  return generateVideoSDKToken({
    ...options,
    permissions: ["allow_join", "allow_mod"],
    isHost: true,
  });
}

/**
 * Generate guest token with lobby (ask_join)
 */
export function generateGuestToken(options: {
  roomId?: string;
  participantId?: string;
  expiresIn?: string;
}): string {
  return generateVideoSDKToken({
    ...options,
    permissions: ["ask_join"],
    isHost: false,
  });
}

/**
 * Create or get VideoSDK room
 */
export async function createVideoSDKRoom(): Promise<{ roomId: string }> {
  if (!VIDEOSDK_API_KEY || !VIDEOSDK_SECRET) {
    throw new Error("VideoSDK API key not configured");
  }

  // Generate a management token for API calls (crawler role required)
  const token = generateVideoSDKToken({
    permissions: ["allow_join", "allow_mod"],
    expiresIn: "10m",
    isManagement: true,
  });

  const response = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create VideoSDK room: ${error}`);
  }

  const data = await response.json();
  return { roomId: data.roomId };
}

/**
 * Validate VideoSDK room
 */
export async function validateVideoSDKRoom(
  roomId: string
): Promise<boolean> {
  if (!VIDEOSDK_API_KEY) {
    throw new Error("VideoSDK API key not configured");
  }

  try {
    const response = await fetch(
      `https://api.videosdk.live/v2/rooms/validate/${roomId}`,
      {
        headers: {
          Authorization: VIDEOSDK_API_KEY,
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error validating room:", error);
    return false;
  }
}
