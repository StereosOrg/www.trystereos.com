"use client"

import { Sidebar } from "@/components/sidebar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { CodeBlock } from "@/components/code-block"
import { TableOfContents, type TocSection } from "@/components/docs/table-of-contents"

/* ------------------------------------------------------------------ */
/*  TOC definition                                                      */
/* ------------------------------------------------------------------ */

const tocSections: TocSection[] = [
  { id: "ext-overview", title: "Extension Overview", level: 2 },
  { id: "ext-commands", title: "Commands", level: 3 },
  { id: "ext-lm-tool", title: "Language Model Tool", level: 3 },
  { id: "ext-architecture", title: "Architecture", level: 2 },
  { id: "ext-config", title: "Configuration", level: 2 },
  { id: "ext-auth", title: "Authentication & Tokens", level: 2 },
  { id: "ext-auth-storage", title: "Token Storage", level: 3 },
  { id: "ext-auth-deeplink", title: "Deep Linking Flow", level: 3 },
  { id: "ext-events", title: "Event Handling", level: 2 },
  { id: "ext-events-auto", title: "Auto-Tracking Flow", level: 3 },
  { id: "ext-events-types", title: "Event Types", level: 3 },
  { id: "ext-ai-detect", title: "AI Tool Detection", level: 2 },
  { id: "ext-diff", title: "Diff Handling", level: 2 },
  { id: "ext-api", title: "API Contract", level: 2 },
  { id: "ext-api-events", title: "Event Ingestion", level: 3 },
  { id: "ext-api-otlp", title: "OTLP Telemetry", level: 3 },
  { id: "ext-api-query", title: "Query Endpoints", level: 3 },
  { id: "ext-api-telemetry-query", title: "Telemetry Query", level: 3 },
  { id: "ext-data-models", title: "Data Models", level: 2 },
  { id: "ext-span-conversion", title: "Span-to-Event Conversion", level: 2 },
  { id: "ext-billing", title: "Billing & Usage", level: 2 },
  { id: "ext-statusbar", title: "Status Bar & UI", level: 2 },
]

/* ------------------------------------------------------------------ */
/*  Neumorphic table wrapper                                           */
/* ------------------------------------------------------------------ */

function NeuTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
      <Table>{children}</Table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ExtensionDocsPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-black/[0.02]">
      <Sidebar />

      <main className="md:ml-64 pt-20 md:pt-0">
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto xl:mr-72">
            {/* Card */}
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Badge */}
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-emerald-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
                Extension
              </span>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Extension Documentation
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Stereos is an LLM Provenance Platform — an engineering-first system that records how code came to exist by capturing structured events from AI agents and tools, linking them to Git artifacts.
              </p>

              <div className="space-y-8 text-base leading-relaxed text-muted-foreground">

                {/* ------- Extension Overview ------- */}
                <section id="ext-overview" className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Extension Overview
                  </h2>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Property</TableHead>
                        <TableHead className="font-bold">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">stereos-provenance</code>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Type</TableCell>
                        <TableCell>VS Code Extension</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Version</TableCell>
                        <TableCell>1.0.4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Activation Events</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">onStartupFinished</code>,{" "}
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">onUri</code> (deep linking)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                  <p>
                    The extension is the primary capture mechanism in the IDE. It watches file changes, detects which AI tool is active, collects Git context (branch, commit, diffs), and sends structured provenance events to the Stereos API.
                  </p>
                </section>

                {/* ------- Commands ------- */}
                <section id="ext-commands" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Commands
                  </h3>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Command</TableHead>
                        <TableHead className="font-bold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["stereos.trackChange", "Manually track a code change with a user-provided intent"],
                        ["stereos.openDashboard", "Open the Stereos web dashboard"],
                        ["stereos.openEvent", "Open a specific event by ID in the dashboard"],
                        ["stereos.connectAccount", "Deep link to the web app for account connection"],
                        ["stereos.configure", "Manually paste an API token"],
                        ["stereos.toggleAutoTrack", "Enable/disable automatic file change tracking"],
                      ].map(([cmd, desc]) => (
                        <TableRow key={cmd}>
                          <TableCell className="font-mono text-sm">{cmd}</TableCell>
                          <TableCell>{desc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>
                </section>

                {/* ------- Language Model Tool ------- */}
                <section id="ext-lm-tool" className="scroll-mt-24 mb-16">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Language Model Tool
                  </h3>
                  <p className="mb-4">
                    The extension registers a Language Model Tool (<code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">stereos_recordProvenance</code>) that allows Copilot/Cursor agents to call it directly after making edits:
                  </p>
                  <CodeBlock language="typescript" title="Input Schema">
{`{
  files_changed: string[]   // File paths relative to workspace
  summary: string           // What was changed and why (required)
  model?: string            // Optional model override
}`}
                  </CodeBlock>
                  <p>
                    This enables edit-level attribution when AI agents make changes — the agent itself reports what it did.
                  </p>
                </section>

                {/* ------- Architecture ------- */}
                <section id="ext-architecture" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Architecture
                  </h2>
                  <CodeBlock language="text" title="System architecture">
{`┌─────────────────────────────────────────────────────────┐
│  VS Code Extension                                       │
│                                                          │
│  File System Watcher ──► PendingChange Map               │
│                              │                           │
│                        (debounce: 5s)                    │
│                              │                           │
│                         Flush Batch                      │
│                              │                           │
│  ┌───────────────────────────┼──────────────────────┐    │
│  │ Collect Git Info          │ Detect AI Tool       │    │
│  │ (branch, commit, repo)    │ (cursor, copilot...) │    │
│  │ Retrieve Diff             │ Resolve Model        │    │
│  └───────────────────────────┼──────────────────────┘    │
│                              │                           │
│                    Build Event Payload                    │
└──────────────────────────────┼───────────────────────────┘
                               │
                    POST /v1/events (Bearer token)
                               │
                               ▼
┌──────────────────────────────────────────────────────────┐
│  Stereos API (Hono)                                       │
│                                                          │
│  authMiddleware ──► Validate token, customer, billing     │
│         │                                                │
│         ├─► Store ProvenanceEvent + ArtifactLink          │
│         ├─► Track Usage (billing meter)                   │
│         └─► Return { success: true, event_id }            │
│                                                          │
│  OTLP Endpoints ──► /v1/traces, /v1/logs, /v1/metrics   │
│         │                                                │
│         ├─► Flatten attributes, canonicalize vendor       │
│         ├─► Upsert ToolProfile                           │
│         ├─► Insert TelemetrySpans / Logs / Metrics        │
│         └─► Merge into unified event feed                │
│                                                          │
│  Query Endpoints ──► /v1/dashboard, /v1/events/search    │
│         │                                                │
│         └─► Merge provenance + telemetry into timeline    │
└──────────────────────────────────────────────────────────┘
                               │
                               ▼
                  ┌──────────────────────┐
                  │  PostgreSQL           │
                  │  (append-only store)  │
                  └──────────────────────┘`}
                  </CodeBlock>
                </section>

                {/* ------- Configuration ------- */}
                <section id="ext-config" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Extension Configuration
                  </h2>
                  <p className="mb-4">
                    Users configure the extension via VS Code settings:
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Setting</TableHead>
                        <TableHead className="font-bold">Type</TableHead>
                        <TableHead className="font-bold">Default</TableHead>
                        <TableHead className="font-bold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["stereos.apiToken", "string", '""', "API token (prefer deep link over manual entry)"],
                        ["stereos.autoTrack", "boolean", "true", "Automatically track file changes"],
                        ["stereos.debounceMs", "number", "5000", "Milliseconds to wait before batching and sending events"],
                        ["stereos.actorId", "string", '"vscode"', "Actor identifier sent with events"],
                      ].map(([setting, type, def, desc]) => (
                        <TableRow key={setting}>
                          <TableCell className="font-mono text-sm">{setting}</TableCell>
                          <TableCell className="text-sm">{type}</TableCell>
                          <TableCell className="font-mono text-sm">{def}</TableCell>
                          <TableCell className="text-sm">{desc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>
                </section>

                {/* ------- Authentication ------- */}
                <section id="ext-auth" className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Authentication & Token Management
                  </h2>
                  <p className="mb-4">
                    API tokens follow the pattern{" "}
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">sk_&lt;32-char hex&gt;</code>{" "}
                    (e.g., <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">sk_a1b2c3d4e5f6...</code>).
                  </p>
                </section>

                <section id="ext-auth-storage" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Token Storage
                  </h3>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Priority</TableHead>
                        <TableHead className="font-bold">Source</TableHead>
                        <TableHead className="font-bold">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">context.secrets</code> (VS Code SecretStorage)
                        </TableCell>
                        <TableCell>Encrypted, preferred</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">stereos.apiToken</code> setting
                        </TableCell>
                        <TableCell>Plaintext in settings.json, fallback</TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                </section>

                <section id="ext-auth-deeplink" className="scroll-mt-24 mb-16">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Deep Linking Flow
                  </h3>
                  <CodeBlock language="text" title="Deep link connection flow">
{`1. User clicks "Connect" in extension
2. Browser opens: https://app.trystereos.com/connect
3. Web app generates token, redirects to:
   vscode://stereos.stereos-provenance/connect?token=sk_...&baseUrl=...
4. Extension receives URI via onUri handler
5. Token stored in SecretStorage (encrypted)
6. Watchers installed, status bar updated`}
                  </CodeBlock>
                </section>

                {/* ------- Event Handling ------- */}
                <section id="ext-events" className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Event Handling
                  </h2>
                  <p className="mb-4">
                    The extension uses a debounced batch-send model to efficiently capture and transmit code changes.
                  </p>
                </section>

                <section id="ext-events-auto" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Auto-Tracking Flow
                  </h3>
                  <CodeBlock language="text" title="Auto-tracking pipeline">
{`File Change (create/modify/delete)
       │
       ▼
PendingChange Map (keyed by file URI)
       │
       │  Each change resets the debounce timer
       ▼
Schedule Flush (waits debounceMs)
       │
       ▼
trackChanges()
       │
       ├── Collect Git info (branch, commit, repo URL)
       ├── Detect active AI tool + model
       ├── Retrieve diff from working tree or last commit
       ├── Generate intent summary
       ├── Build event payload
       └── POST /v1/events`}
                  </CodeBlock>

                  <p className="mt-4 mb-4">
                    The <strong className="text-foreground">PendingChange</strong> structure:
                  </p>
                  <CodeBlock language="typescript" title="PendingChange interface">
{`interface PendingChange {
  uri: vscode.Uri;
  timestamp: number;
  action: 'created' | 'modified' | 'deleted';
  lineCount?: number;
}`}
                  </CodeBlock>

                  <p className="mt-4 mb-4">
                    Intent summaries are generated from batched changes:
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Scenario</TableHead>
                        <TableHead className="font-bold">Intent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Single action type</TableCell>
                        <TableCell className="font-mono text-sm">{'"Modified 3 file(s) (.ts, .tsx)"'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Creates only</TableCell>
                        <TableCell className="font-mono text-sm">{'"Created 1 file(s)"'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mixed</TableCell>
                        <TableCell className="font-mono text-sm">{'"Changed 5 file(s) - 2 created, 3 modified"'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                </section>

                <section id="ext-events-types" className="scroll-mt-24 mb-16">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Event Types
                  </h3>
                  <p className="mb-4">
                    The system has two primary event types:
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">agent_action</code>
                  </h4>
                  <p className="mb-4">
                    Represents an AI-assisted code change captured at the IDE level.
                  </p>
                  <CodeBlock language="typescript" title="agent_action event payload">
{`{
  event_type: 'agent_action',
  actor_type: 'agent',
  actor_id: string,              // "vscode", "cursor-v1", etc.
  intent: string,                // "Modified 3 files (.ts)"
  tool: string,                  // "cursor", "github-copilot", "vscode"
  model?: string,                // "gpt-4", "claude-3-sonnet", etc.
  files_written?: string[],      // ["src/auth.ts", "src/utils.ts"]
  timestamp?: string,            // ISO 8601 (defaults to now)
  repo: string,                  // Repository folder name
  branch?: string,               // Current Git branch
  commit?: string,               // Current HEAD commit SHA
  diff_hash?: string,            // SHA-256(repo + commit + sorted files)
  diff_content?: string,         // Structured JSON diff (see Diff Handling)
  metadata?: {
    repo_url?: string,
    file_count: number,
    created_count: number,
    modified_count: number,
    deleted_count: number,
    total_lines: number,
    session_duration_seconds: number,
    workspace: string,
    vscode_version: string,
    extension_version: string
  }
}`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">outcome</code>
                  </h4>
                  <p className="mb-4">
                    Links an agent action to its final disposition — was the AI-generated code accepted, rejected, or superseded?
                  </p>
                  <CodeBlock language="typescript" title="outcome event payload">
{`{
  event_type: 'outcome',
  original_event_id: string,     // UUID of the agent_action
  status: 'accepted' | 'rejected' | 'superseded',
  linked_commit?: string         // Optional final commit SHA
}`}
                  </CodeBlock>
                </section>

                {/* ------- AI Tool Detection ------- */}
                <section id="ext-ai-detect" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    AI Tool Detection
                  </h2>
                  <p className="mb-4">
                    The extension auto-detects which AI tool is active in the IDE:
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Tool</TableHead>
                        <TableHead className="font-bold">Detection Method</TableHead>
                        <TableHead className="font-bold">Default Model</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["Cursor", 'App name contains "Cursor"', "Read from Cursor settings"],
                        ["GitHub Copilot", "Extension github.copilot active", "gpt-4"],
                        ["Sourcegraph Cody", "Extension sourcegraph.cody-ai active", "claude-3-sonnet"],
                        ["Continue.dev", "Extension continue.continue active", "claude-3-sonnet"],
                        ["Supermaven", "Extension supermaven.supermaven active", "—"],
                        ["Codeium", "Extension codeium.codeium active", "—"],
                        ["Fallback", "None of the above", '"vscode"'],
                      ].map(([tool, detection, model]) => (
                        <TableRow key={tool}>
                          <TableCell className="font-medium">{tool}</TableCell>
                          <TableCell className="text-sm">{detection}</TableCell>
                          <TableCell className="font-mono text-sm">{model}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>
                </section>

                {/* ------- Diff Handling ------- */}
                <section id="ext-diff" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Diff Handling
                  </h2>
                  <p className="mb-4">
                    Diffs are collected with the following priority:
                  </p>
                  <CodeBlock language="text" title="Diff collection priority">
{`1. git diff HEAD [files...]          ← If there are unstaged changes
2. git diff HEAD~1 HEAD [files...]   ← If working tree is clean`}
                  </CodeBlock>

                  <p className="mt-4 mb-4">
                    Raw unified diffs are parsed into a structured JSON format for storage and visualization:
                  </p>
                  <CodeBlock language="typescript" title="Structured diff format">
{`type DiffJson = Array<{
  path: string;
  hunks: Array<{
    oldStart: number;
    oldCount: number;
    newStart: number;
    newCount: number;
    lines: Array<{
      type: 'add' | 'remove' | 'context';
      content: string;
    }>;
  }>;
}>;`}
                  </CodeBlock>

                  <p className="mt-4">
                    <strong className="text-foreground">Size limit:</strong> 512KB. Diffs exceeding this are truncated with{" "}
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">{'"...(truncated)"'}</code>. Stored in the{" "}
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">artifact_links.diff_content</code> column as a JSON string.
                  </p>
                </section>

                {/* ------- API Contract ------- */}
                <section id="ext-api" className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    API Contract
                  </h2>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Property</TableHead>
                        <TableHead className="font-bold">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Base URL (production)</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">https://api.trystereos.com</code>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Base URL (development)</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">http://localhost:3000</code>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Authentication</TableCell>
                        <TableCell>
                          <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">Authorization: Bearer sk_&lt;token&gt;</code>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                </section>

                {/* ------- Event Ingestion ------- */}
                <section id="ext-api-events" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Event Ingestion — POST /v1/events
                  </h3>
                  <p className="mb-4">
                    Ingests provenance events (agent actions and outcomes).
                  </p>
                  <CodeBlock language="json" title="Request body (agent_action)">
{`{
  "event_type": "agent_action",
  "actor_type": "agent",
  "actor_id": "cursor-v1",
  "intent": "Modified 3 file(s) (.ts, .tsx)",
  "tool": "cursor",
  "model": "claude-3-sonnet",
  "files_written": ["src/auth.ts", "src/utils.ts"],
  "repo": "my-project",
  "branch": "feature/auth",
  "commit": "abc123def456...",
  "diff_hash": "sha256...",
  "diff_content": "[{\\"path\\":\\"src/auth.ts\\",\\"hunks\\":[...]}]",
  "metadata": {
    "file_count": 2,
    "created_count": 0,
    "modified_count": 2,
    "deleted_count": 0,
    "total_lines": 150,
    "session_duration_seconds": 120
  }
}`}
                  </CodeBlock>

                  <CodeBlock language="json" title="Request body (outcome)">
{`{
  "event_type": "outcome",
  "original_event_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "accepted",
  "linked_commit": "def789abc..."
}`}
                  </CodeBlock>

                  <CodeBlock language="json" title="Response (201)">
{`{
  "success": true,
  "event_id": "550e8400-e29b-41d4-a716-446655440000"
}`}
                  </CodeBlock>
                </section>

                {/* ------- OTLP Telemetry ------- */}
                <section id="ext-api-otlp" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    OTLP Telemetry Ingestion
                  </h3>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    POST /v1/traces
                  </h4>
                  <p className="mb-4">
                    Ingests OpenTelemetry trace data (OTLP JSON format).
                  </p>
                  <CodeBlock language="json" title="Trace request body">
{`{
  "resourceSpans": [
    {
      "resource": {
        "attributes": [
          { "key": "service.name", "value": { "stringValue": "my-service" } }
        ]
      },
      "scopeSpans": [
        {
          "spans": [
            {
              "traceId": "abc123...",
              "spanId": "def456...",
              "name": "HTTP GET /api/users",
              "kind": 2,
              "startTimeUnixNano": "1700000000000000000",
              "endTimeUnixNano": "1700000000500000000",
              "status": { "code": 1, "message": "" },
              "attributes": [
                { "key": "http.method", "value": { "stringValue": "GET" } }
              ]
            }
          ]
        }
      ]
    }
  ]
}`}
                  </CodeBlock>

                  <CodeBlock language="json" title="Trace response">
{`{
  "partialSuccess": {
    "acceptedSpans": 10,
    "rejectedSpans": 0
  }
}`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    POST /v1/logs
                  </h4>
                  <p className="mb-4">
                    Ingests OpenTelemetry log data. For logs with trace context (<code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">traceId</code> + <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">spanId</code>), a synthetic <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">TelemetrySpan</code> is created with <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">signal_type: &apos;log&apos;</code> so the log appears in the span timeline.
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    POST /v1/metrics
                  </h4>
                  <p className="mb-4">
                    Ingests OpenTelemetry metric data. Supported metric types: sum, gauge, histogram, exponential_histogram, summary.
                  </p>
                </section>

                {/* ------- Query Endpoints ------- */}
                <section id="ext-api-query" className="scroll-mt-24">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Query Endpoints
                  </h3>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    GET /v1/dashboard
                  </h4>
                  <p className="mb-4">
                    Returns stats and recent merged events (provenance + telemetry).
                  </p>
                  <CodeBlock language="json" title="Dashboard response">
{`{
  "total_events": 142,
  "total_commits": 38,
  "active_agents": 3,
  "recent_events": [
    {
      "id": "uuid",
      "type": "provenance",
      "intent": "Modified 2 files",
      "actor_id": "cursor-v1",
      "tool": "cursor",
      "model": "claude-3-sonnet",
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ]
}`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    GET /v1/events/search
                  </h4>
                  <p className="mb-4">
                    Full-text search across provenance events and telemetry spans.
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Param</TableHead>
                        <TableHead className="font-bold">Type</TableHead>
                        <TableHead className="font-bold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["actor_id", "string", "Filter by actor ID"],
                        ["tool", "string", "Filter by tool name"],
                        ["intent", "string", "Substring search (ILIKE)"],
                        ["start_date", "ISO string", "Start of date range"],
                        ["end_date", "ISO string", "End of date range"],
                        ["limit", "number", "Max results (default 50, max 100)"],
                        ["offset", "number", "Pagination offset"],
                      ].map(([param, type, desc]) => (
                        <TableRow key={param}>
                          <TableCell className="font-mono text-sm">{param}</TableCell>
                          <TableCell className="text-sm">{type}</TableCell>
                          <TableCell className="text-sm">{desc}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Other Provenance Endpoints
                  </h4>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Endpoint</TableHead>
                        <TableHead className="font-bold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/events/:eventId</TableCell>
                        <TableCell>Single provenance event with artifact links and outcomes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/events/:eventId/file</TableCell>
                        <TableCell>Diff for a single file from an event&apos;s artifacts (query: path)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/provenance/by-commit/:sha</TableCell>
                        <TableCell>All provenance events linked to a commit SHA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/provenance/by-file</TableCell>
                        <TableCell>Events where a file appears in files_written (query: path, repo)</TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                </section>

                {/* ------- Telemetry Query ------- */}
                <section id="ext-api-telemetry-query" className="scroll-mt-24 mb-16">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Telemetry Query Endpoints
                  </h3>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Endpoint</TableHead>
                        <TableHead className="font-bold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles</TableCell>
                        <TableCell>All tool profiles, ordered by last_seen_at DESC</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles/:id</TableCell>
                        <TableCell>Profile with latency percentiles (p50, p95, p99, avg)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles/:id/spans</TableCell>
                        <TableCell>Paginated telemetry spans for a profile</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles/:id/metrics</TableCell>
                        <TableCell>Aggregated metrics by name/type</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles/:id/llm-stats</TableCell>
                        <TableCell>LLM vendor stats: model usage, daily/hourly tokens, latency</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">GET /v1/tool-profiles/:id/timeline</TableCell>
                        <TableCell>Last 24h hourly spans with error count and latency</TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    POST /v1/tokens
                  </h4>
                  <p className="mb-4">
                    Creates a new API token for the authenticated customer (session auth).
                  </p>
                  <CodeBlock language="json" title="Token creation response">
{`{
  "token": "sk_a1b2c3d4e5f6...",
  "id": "uuid",
  "name": "My Token",
  "created_at": "2025-01-15T10:00:00Z"
}`}
                  </CodeBlock>
                </section>

                {/* ------- Data Models ------- */}
                <section id="ext-data-models" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Data Models
                  </h2>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    Provenance Tables
                  </h4>
                  <CodeBlock language="text" title="Provenance schema">
{`provenanceEvents
├── id: UUID (PK)
├── customer_id: UUID (FK → customers)
├── user_id: UUID (FK → users, nullable)
├── title: enum (engineer, manager, cto, ...)
├── actor_type: 'agent'
├── actor_id: string
├── tool: string
├── model: string (nullable)
├── intent: string
├── files_written: string[]
├── timestamp: timestamp
└── event_hash: string (nullable)

artifactLinks
├── id: UUID (PK)
├── event_id: UUID (FK → provenanceEvents)
├── repo: string
├── branch: string (nullable)
├── commit: string (nullable)
├── diff_hash: string (nullable)
└── diff_content: text (nullable, JSON string)

outcomes
├── id: UUID (PK)
├── event_id: UUID (FK → provenanceEvents)
├── status: 'accepted' | 'rejected' | 'superseded'
├── linked_commit: string (nullable)
└── created_at: timestamp`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Telemetry Tables
                  </h4>
                  <CodeBlock language="text" title="Telemetry schema">
{`toolProfiles
├── id: UUID (PK)
├── customer_id: UUID (FK)
├── vendor: string (canonical slug)
├── display_name: string
├── logo_url: string (nullable)
├── vendor_category: string
├── total_spans: integer
├── total_traces: integer
├── total_errors: integer
├── first_seen_at: timestamp
└── last_seen_at: timestamp
    UNIQUE(customer_id, vendor)

telemetrySpans
├── id: UUID (PK)
├── customer_id: UUID (FK)
├── tool_profile_id: UUID (FK, nullable)
├── trace_id: string
├── span_id: string
├── parent_span_id: string (nullable)
├── span_name: string
├── span_kind: string
├── start_time: timestamp
├── end_time: timestamp (nullable)
├── duration_ms: integer (nullable)
├── status_code: 'ERROR' | 'OK' | 'UNSET'
├── status_message: string (nullable)
├── vendor: string
├── service_name: string (nullable)
├── resource_attributes: jsonb
├── span_attributes: jsonb
├── signal_type: 'trace' | 'log'
└── ingested_at: timestamp

telemetryLogs
├── id: UUID (PK)
├── customer_id: UUID (FK)
├── vendor: string
├── trace_id, span_id: string (nullable)
├── severity: string
├── body: text
├── resource_attributes: jsonb
├── log_attributes: jsonb
├── timestamp: timestamp
└── ingested_at: timestamp

telemetryMetrics
├── id: UUID (PK)
├── customer_id: UUID (FK)
├── vendor: string
├── metric_name: string
├── metric_type: string
├── unit: string (nullable)
├── value_double, value_int: numeric (nullable)
├── count, sum, min, max: numeric (nullable)
├── bucket_counts, explicit_bounds: jsonb (nullable)
├── quantile_values: jsonb (nullable)
├── data_point: jsonb (nullable)
├── start_time, time: timestamp
└── ingested_at: timestamp`}
                  </CodeBlock>
                </section>

                {/* ------- Span-to-Event Conversion ------- */}
                <section id="ext-span-conversion" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Telemetry API: Span-to-Event Conversion
                  </h2>
                  <p className="mb-4">
                    This section details how raw OTLP spans are transformed into stored telemetry events and merged into the unified provenance timeline.
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    Step 1: Attribute Flattening
                  </h4>
                  <p className="mb-4">
                    OTEL attributes arrive in a nested format and are flattened to a plain key-value map:
                  </p>
                  <CodeBlock language="text" title="Attribute flattening">
{`Input:  [{ key: "http.method", value: { stringValue: "GET" } }]
Output: { "http.method": "GET" }

Supported: stringValue, intValue, boolValue, doubleValue
Arrays are dropped.`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Step 2: Vendor Canonicalization
                  </h4>
                  <p className="mb-4">
                    Flattened resource attributes are matched against a Vendor Registry to determine the canonical vendor slug:
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Slug</TableHead>
                        <TableHead className="font-bold">Display Name</TableHead>
                        <TableHead className="font-bold">Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["cloudflare-workers", "Cloudflare Workers", "runtime"],
                        ["arcade", "Arcade Dev", "tool-server"],
                        ["vscode", "VS Code", "ide"],
                        ["cursor", "Cursor", "ide"],
                        ["codex", "OpenAI Codex", "ide"],
                        ["e2b", "E2B Sandbox", "sandbox"],
                        ["anthropic", "Anthropic (Claude)", "llm"],
                        ["google-gemini", "Google (Gemini)", "llm"],
                        ["openai", "OpenAI", "llm"],
                        ["kilo-code", "Kilo Code", "llm"],
                      ].map(([slug, name, cat]) => (
                        <TableRow key={slug}>
                          <TableCell className="font-mono text-sm">{slug}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell className="text-sm">{cat}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>
                  <p className="mt-2">
                    <strong className="text-foreground">Fallback:</strong> If no matcher hits, the{" "}
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">service.name</code> is slugified.
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Step 3: LLM Detection
                  </h4>
                  <p className="mb-4">
                    A span is classified as LLM if the vendor category is <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">&quot;llm&quot;</code>, or <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">gen_ai.system</code> / <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">gen_ai.request.model</code> / <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">gen_ai.response.model</code> attributes are present. <strong className="text-foreground">LLM spans are NOT stored</strong> in the telemetrySpans table — they are filtered out. Their metrics and logs are still tracked.
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Step 4: ToolProfile Upsert
                  </h4>
                  <p className="mb-4">
                    For each unique <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">(customer_id, vendor)</code> pair, a ToolProfile is upserted — incrementing total_spans, total_traces, total_errors and updating last_seen_at.
                  </p>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Step 5: Span Conversion & Storage
                  </h4>
                  <CodeBlock language="text" title="OTEL span → TelemetrySpan mapping">
{`OTEL Span Field              → TelemetrySpan Column
─────────────────────────────────────────────────────
traceId                      → trace_id
spanId                       → span_id
parentSpanId                 → parent_span_id
name                         → span_name
kind (0-5)                   → span_kind (UNSPECIFIED/INTERNAL/SERVER/...)
startTimeUnixNano            → start_time (Date)
endTimeUnixNano              → end_time (Date)
(end - start) / 1e6          → duration_ms
status.code                  → status_code (1→'OK', 2→'ERROR', else→'UNSET')
status.message               → status_message
resource attributes (flat)   → resource_attributes (jsonb)
span attributes (flat)       → span_attributes (jsonb)
(derived)                    → vendor (canonical slug)
resource['service.name']     → service_name
(literal)                    → signal_type: 'trace'`}
                  </CodeBlock>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-8">
                    Step 6: Unified Event Feed
                  </h4>
                  <p className="mb-4">
                    The dashboard and search endpoints merge provenance events and telemetry spans into a single timeline:
                  </p>
                  <CodeBlock language="typescript" title="Merged event structure">
{`{
  id: string,
  type: 'provenance' | 'span',        // Source type
  intent: string,                       // Provenance: intent; Span: span_name
  actor_id: string,                     // Provenance: actor_id; Span: vendor slug
  tool: string,                         // Provenance: tool; Span: vendor slug
  model: string | null,                 // Provenance: model; Span: gen_ai attributes
  timestamp: string,                    // ISO 8601
  tool_profile_id?: string,            // Only for spans
  user: UserAttribution | null          // Resolved user profile
}`}
                  </CodeBlock>
                  <p>
                    Events from both sources are interleaved by timestamp to produce a single chronological view of all AI-related activity.
                  </p>
                </section>

                {/* ------- Billing ------- */}
                <section id="ext-billing" className="scroll-mt-24 mb-16">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Billing & Usage Metering
                  </h2>
                  <p className="mb-4">
                    Usage is tracked per event and metered to Stripe:
                  </p>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Billable Event</TableHead>
                        <TableHead className="font-bold">Unit</TableHead>
                        <TableHead className="font-bold">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-sm">tool_profile</TableCell>
                        <TableCell>1 per tool profile</TableCell>
                        <TableCell>Each tool profile</TableCell>
                        <TableCell>$75 per month</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-sm">ledger_event</TableCell>
                        <TableCell>1 per event</TableCell>
                        <TableCell>Each event</TableCell>
                        <TableCell>$0.12 per event</TableCell>
                      </TableRow>
                    </TableBody>
                  </NeuTable>
                  <p>
                    Usage events are stored with an idempotency key to prevent double-counting. Customers with{" "}
                    <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">billing_status: &apos;canceled&apos;</code>{" "}
                    are rejected at the auth middleware level.
                  </p>
                </section>

                {/* ------- Status Bar ------- */}
                <section id="ext-statusbar" className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    Status Bar & UI
                  </h2>
                  <NeuTable>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">State</TableHead>
                        <TableHead className="font-bold">Icon</TableHead>
                        <TableHead className="font-bold">Label</TableHead>
                        <TableHead className="font-bold">Click Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["Not connected", "$(link)", "Stereos: Not connected", "Connect account"],
                        ["Connected (idle)", "$(check)", "Stereos: Connected", "Open dashboard"],
                        ["Pending changes", "$(sync~spin)", "Stereos: N pending", "— (tooltip shows countdown)"],
                        ["Send failed", "$(warning)", "Stereos: Send failed", "Open dashboard"],
                      ].map(([state, icon, label, action]) => (
                        <TableRow key={state}>
                          <TableCell className="font-medium">{state}</TableCell>
                          <TableCell className="font-mono text-sm">{icon}</TableCell>
                          <TableCell className="text-sm">{label}</TableCell>
                          <TableCell className="text-sm">{action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NeuTable>

                  <h4 className="text-base font-bold text-foreground mb-3 mt-6">
                    Sidebar Tree View
                  </h4>
                  <p>
                    When connected, the Provenance sidebar shows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Open Dashboard</li>
                    <li>Track Code Change</li>
                    <li>Toggle auto-tracking (on/off indicator)</li>
                    <li>Open Settings</li>
                  </ul>
                </section>

              </div>
            </div>
          </div>

          {/* Table of Contents (right sidebar) */}
          <TableOfContents sections={tocSections} />
        </section>
      </main>
    </div>
  )
}
