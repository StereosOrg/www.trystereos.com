-- BetterAuth Core Tables
CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN DEFAULT FALSE,
    image TEXT,
    role TEXT DEFAULT 'guest',
    "twoFactorEnabled" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMPTZ,
    "refreshTokenExpiresAt" TIMESTAMPTZ,
    scope TEXT,
    "idToken" TEXT,
    password TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL
);

-- Webinar Tables
CREATE TABLE IF NOT EXISTS webinar (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    scheduled_start BIGINT NOT NULL,
    scheduled_end BIGINT,
    duration_minutes INTEGER DEFAULT 60,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'live', 'ended', 'cancelled')),
    meeting_id TEXT UNIQUE,
    room_id TEXT,
    max_participants INTEGER DEFAULT 100,
    created_by TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES "user"(id)
);

CREATE INDEX IF NOT EXISTS idx_webinar_status ON webinar(status);
CREATE INDEX IF NOT EXISTS idx_webinar_scheduled_start ON webinar(scheduled_start);
CREATE INDEX IF NOT EXISTS idx_webinar_slug ON webinar(slug);

-- Webinar Participants (tracks who joined, their role, and state)
CREATE TABLE IF NOT EXISTS webinar_participant (
    id TEXT PRIMARY KEY,
    webinar_id TEXT NOT NULL,
    user_id TEXT,
    participant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'guest' CHECK(role IN ('host', 'guest')),
    join_status TEXT DEFAULT 'pending' CHECK(join_status IN ('pending', 'approved', 'denied', 'joined', 'left')),
    joined_at BIGINT,
    left_at BIGINT,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
    FOREIGN KEY (webinar_id) REFERENCES webinar(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_participant_webinar ON webinar_participant(webinar_id);
CREATE INDEX IF NOT EXISTS idx_participant_user ON webinar_participant(user_id);
CREATE INDEX IF NOT EXISTS idx_participant_status ON webinar_participant(join_status);

-- Webinar Hosts (staff members who can host webinars)
CREATE TABLE IF NOT EXISTS webinar_host (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_host_user ON webinar_host(user_id);

-- Webinar State (tracks live state like who's presenting, recording status, etc.)
CREATE TABLE IF NOT EXISTS webinar_state (
    id TEXT PRIMARY KEY,
    webinar_id TEXT NOT NULL UNIQUE,
    is_recording BOOLEAN DEFAULT FALSE,
    is_streaming BOOLEAN DEFAULT FALSE,
    active_presenter_id TEXT,
    participant_count INTEGER DEFAULT 0,
    started_at BIGINT,
    ended_at BIGINT,
    updated_at BIGINT NOT NULL,
    FOREIGN KEY (webinar_id) REFERENCES webinar(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_state_webinar ON webinar_state(webinar_id);

-- Lobby Queue (for participants waiting to join)
CREATE TABLE IF NOT EXISTS webinar_lobby (
    id TEXT PRIMARY KEY,
    webinar_id TEXT NOT NULL,
    participant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    requested_at BIGINT NOT NULL,
    status TEXT DEFAULT 'waiting' CHECK(status IN ('waiting', 'approved', 'denied')),
    responded_at BIGINT,
    responded_by TEXT,
    FOREIGN KEY (webinar_id) REFERENCES webinar(id) ON DELETE CASCADE,
    FOREIGN KEY (responded_by) REFERENCES "user"(id)
);

CREATE INDEX IF NOT EXISTS idx_lobby_webinar ON webinar_lobby(webinar_id);
CREATE INDEX IF NOT EXISTS idx_lobby_status ON webinar_lobby(status);

-- Passkey Table (for Better Auth passkey plugin)
CREATE TABLE IF NOT EXISTS passkey (
    id TEXT PRIMARY KEY,
    name TEXT,
    public_key TEXT NOT NULL,
    user_id TEXT NOT NULL,
    credential_id TEXT NOT NULL UNIQUE,
    counter INTEGER NOT NULL,
    device_type TEXT NOT NULL,
    backed_up BOOLEAN NOT NULL,
    transports TEXT,
    created_at BIGINT,
    aaguid TEXT,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_passkey_user ON passkey(user_id);
CREATE INDEX IF NOT EXISTS idx_passkey_credential ON passkey(credential_id);

-- Two Factor Authentication Table
CREATE TABLE IF NOT EXISTS "twoFactor" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    secret TEXT,
    "backupCodes" TEXT,
    FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_two_factor_user ON "twoFactor"("userId");
