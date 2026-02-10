"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
/*  TOC definitions per tab                                            */
/* ------------------------------------------------------------------ */

const providerSections: TocSection[] = [
  { id: "provider-overview", title: "Overview", level: 2 },
  { id: "provider-auth", title: "Authentication", level: 3 },
  { id: "provider-traces", title: "POST /v1/traces", level: 2 },
  { id: "provider-traces-schema", title: "Trace Schema", level: 3 },
  { id: "provider-traces-fields", title: "Field → UI Mapping", level: 3 },
  { id: "provider-traces-vendor", title: "Vendor Detection", level: 3 },
  { id: "provider-traces-checklist", title: "Instrumentation Checklist", level: 3 },
  { id: "provider-logs", title: "POST /v1/logs", level: 2 },
  { id: "provider-logs-schema", title: "Log Schema", level: 3 },
  { id: "provider-logs-fields", title: "Field → UI Mapping", level: 3 },
  { id: "provider-metrics", title: "POST /v1/metrics", level: 2 },
  { id: "provider-metrics-schema", title: "Metric Schema", level: 3 },
  { id: "provider-metrics-names", title: "Metric Name Reference", level: 3 },
  { id: "provider-genai", title: "Gen AI Conventions", level: 2 },
]

const endUserSections: TocSection[] = [
  { id: "user-overview", title: "Dashboard Overview", level: 2 },
  { id: "user-events", title: "Events Feed", level: 2 },
  { id: "user-events-table", title: "Event Elements", level: 3 },
  { id: "user-tools", title: "Tool Profiles", level: 2 },
  { id: "user-tools-list", title: "List View", level: 3 },
  { id: "user-tools-detail", title: "Detail View", level: 3 },
  { id: "user-tools-metrics", title: "Metrics Tab", level: 3 },
  { id: "user-tools-logs", title: "Logs Tab", level: 3 },
  { id: "user-tools-spans", title: "Spans / Timeline", level: 3 },
  { id: "user-field-ref", title: "Field Reference", level: 2 },
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
/*  Checklist item                                                     */
/* ------------------------------------------------------------------ */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 border-2 border-black px-4 py-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black bg-emerald-100 text-xs font-bold">
        ✓
      </span>
      <span className="text-sm leading-relaxed">{children}</span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("providers")

  const tocSections = activeTab === "providers" ? providerSections : endUserSections

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
                Docs
              </span>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Telemetry Documentation
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Everything you need to send and visualize OpenTelemetry data with Stereos.
              </p>

              {/* Tabs */}
              <Tabs
                defaultValue="providers"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10 h-auto p-1">
                  <TabsTrigger
                    value="providers"
                    className="flex-1 font-bold data-[state=active]:bg-primary data-[state=active]:shadow-none py-2.5"
                  >
                    Providers
                  </TabsTrigger>
                  <TabsTrigger
                    value="end-users"
                    className="flex-1 font-bold data-[state=active]:bg-primary data-[state=active]:shadow-none py-2.5"
                  >
                    End-users
                  </TabsTrigger>
                </TabsList>

                {/* ============================================================ */}
                {/*  PROVIDERS TAB                                                */}
                {/* ============================================================ */}
                <TabsContent value="providers">
                  <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
                    {/* ------- Overview ------- */}
                    <section id="provider-overview" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Overview
                      </h2>
                      <p className="mb-4">
                        Stereos accepts standard{" "}
                        <strong className="text-foreground">OTLP/HTTP JSON</strong>{" "}
                        payloads on three endpoints. Any OpenTelemetry SDK or
                        exporter that speaks OTLP/HTTP can send data to Stereos
                        with minimal configuration.
                      </p>

                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Property</TableHead>
                            <TableHead className="font-bold">Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Base URL</TableCell>
                            <TableCell>
                              <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">
                                https://api.trystereos.com
                              </code>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Protocol</TableCell>
                            <TableCell>OTLP/HTTP (JSON)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Content-Type</TableCell>
                            <TableCell>
                              <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">
                                application/json
                              </code>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    {/* ------- Auth ------- */}
                    <section id="provider-auth" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Authentication
                      </h3>
                      <p className="mb-4">
                        Every request must include an API key in the{" "}
                        <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">
                          x-api-key
                        </code>{" "}
                        header. You can generate keys from the Stereos dashboard
                        under <strong className="text-foreground">Settings → API Keys</strong>.
                      </p>
                      <CodeBlock language="bash" title="Example header">
{`curl -X POST https://api.trystereos.com/v1/traces \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: sk_live_your_key_here" \\
  -d @payload.json`}
                      </CodeBlock>
                    </section>

                    {/* ------- POST /v1/traces ------- */}
                    <section id="provider-traces" className="scroll-mt-24 mb-16">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        POST /v1/traces
                      </h2>
                      <p className="mb-4">
                        Send distributed traces representing LLM invocations, tool
                        calls, and agent workflows. Each trace is a tree of spans
                        that Stereos maps to the{" "}
                        <strong className="text-foreground">Events feed</strong> and{" "}
                        <strong className="text-foreground">Tool profiles</strong>{" "}
                        in the dashboard.
                      </p>
                    </section>

                    <section id="provider-traces-schema" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Trace Schema
                      </h3>
                      <CodeBlock language="json" title="Minimal trace payload">
{`{
  "resourceSpans": [
    {
      "resource": {
        "attributes": [
          { "key": "service.name", "value": { "stringValue": "my-app" } },
          { "key": "service.version", "value": { "stringValue": "1.2.0" } }
        ]
      },
      "scopeSpans": [
        {
          "scope": { "name": "stereos-sdk", "version": "0.3.0" },
          "spans": [
            {
              "traceId": "abc123...",
              "spanId": "def456...",
              "name": "chat openai.chat",
              "kind": 3,
              "startTimeUnixNano": "1700000000000000000",
              "endTimeUnixNano": "1700000001500000000",
              "attributes": [
                { "key": "gen_ai.system", "value": { "stringValue": "openai" } },
                { "key": "gen_ai.request.model", "value": { "stringValue": "gpt-4o" } },
                { "key": "gen_ai.usage.input_tokens", "value": { "intValue": "350" } },
                { "key": "gen_ai.usage.output_tokens", "value": { "intValue": "120" } },
                { "key": "gen_ai.response.model", "value": { "stringValue": "gpt-4o-2024-08-06" } }
              ],
              "status": { "code": 1 }
            }
          ]
        }
      ]
    }
  ]
}`}
                      </CodeBlock>
                    </section>

                    <section id="provider-traces-fields" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Field → UI Mapping
                      </h3>
                      <p className="mb-4">
                        The following attributes control what appears in the
                        dashboard.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Attribute</TableHead>
                            <TableHead className="font-bold">Dashboard Element</TableHead>
                            <TableHead className="font-bold">Required</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.system</TableCell>
                            <TableCell>Vendor icon &amp; filter chip</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.request.model</TableCell>
                            <TableCell>Model badge, tool profile header</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.response.model</TableCell>
                            <TableCell>Resolved model badge (detail view)</TableCell>
                            <TableCell>No</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.usage.input_tokens</TableCell>
                            <TableCell>Token bar chart (input portion)</TableCell>
                            <TableCell>Recommended</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.usage.output_tokens</TableCell>
                            <TableCell>Token bar chart (output portion)</TableCell>
                            <TableCell>Recommended</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">service.name</TableCell>
                            <TableCell>Service column in events feed</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">span.name</TableCell>
                            <TableCell>Event title, timeline label</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">span.kind</TableCell>
                            <TableCell>CLIENT (3) for LLM calls</TableCell>
                            <TableCell>Yes</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    <section id="provider-traces-vendor" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Vendor Detection
                      </h3>
                      <p className="mb-4">
                        Stereos auto-detects the LLM vendor from{" "}
                        <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">
                          gen_ai.system
                        </code>{" "}
                        to display the correct icon and apply vendor-specific cost
                        calculations.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">gen_ai.system value</TableHead>
                            <TableHead className="font-bold">Vendor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            ["openai", "OpenAI"],
                            ["anthropic", "Anthropic"],
                            ["cohere", "Cohere"],
                            ["google_ai", "Google AI / Gemini"],
                            ["mistral", "Mistral AI"],
                            ["aws.bedrock", "AWS Bedrock"],
                            ["azure.openai", "Azure OpenAI"],
                            ["groq", "Groq"],
                            ["together_ai", "Together AI"],
                            ["perplexity", "Perplexity"],
                          ].map(([val, label]) => (
                            <TableRow key={val}>
                              <TableCell className="font-mono text-sm">{val}</TableCell>
                              <TableCell>{label}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </NeuTable>
                    </section>

                    <section id="provider-traces-checklist" className="scroll-mt-24 mb-16">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Instrumentation Checklist
                      </h3>
                      <ul className="space-y-2">
                        <CheckItem>
                          Set <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">service.name</code> on the resource so events are grouped correctly.
                        </CheckItem>
                        <CheckItem>
                          Include <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">gen_ai.system</code> and <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">gen_ai.request.model</code> on every LLM span.
                        </CheckItem>
                        <CheckItem>
                          Report token usage via <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">gen_ai.usage.input_tokens</code> and <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">gen_ai.usage.output_tokens</code>.
                        </CheckItem>
                        <CheckItem>
                          Use <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">span.kind = CLIENT (3)</code> for outbound LLM requests.
                        </CheckItem>
                        <CheckItem>
                          Propagate <code className="bg-muted px-1 py-0.5 text-sm font-mono rounded">traceId</code> across service boundaries to maintain end-to-end visibility.
                        </CheckItem>
                      </ul>
                    </section>

                    {/* ------- POST /v1/logs ------- */}
                    <section id="provider-logs" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        POST /v1/logs
                      </h2>
                      <p className="mb-4">
                        Send structured log records. Logs correlated with a{" "}
                        <code className="bg-muted px-1.5 py-0.5 text-sm font-mono rounded">
                          traceId
                        </code>{" "}
                        appear in the <strong className="text-foreground">Logs tab</strong>{" "}
                        of the corresponding tool profile.
                      </p>
                    </section>

                    <section id="provider-logs-schema" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Log Schema
                      </h3>
                      <CodeBlock language="json" title="Minimal log payload">
{`{
  "resourceLogs": [
    {
      "resource": {
        "attributes": [
          { "key": "service.name", "value": { "stringValue": "my-app" } }
        ]
      },
      "scopeLogs": [
        {
          "scope": { "name": "stereos-sdk" },
          "logRecords": [
            {
              "timeUnixNano": "1700000000000000000",
              "severityNumber": 9,
              "severityText": "INFO",
              "body": { "stringValue": "LLM call completed" },
              "attributes": [
                { "key": "gen_ai.system", "value": { "stringValue": "openai" } },
                { "key": "gen_ai.request.model", "value": { "stringValue": "gpt-4o" } }
              ],
              "traceId": "abc123...",
              "spanId": "def456..."
            }
          ]
        }
      ]
    }
  ]
}`}
                      </CodeBlock>
                    </section>

                    <section id="provider-logs-fields" className="scroll-mt-24 mb-16">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Field → UI Mapping
                      </h3>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Field</TableHead>
                            <TableHead className="font-bold">Dashboard Element</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-mono text-sm">severityText</TableCell>
                            <TableCell>Severity badge (INFO / WARN / ERROR)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">body.stringValue</TableCell>
                            <TableCell>Log message text</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">traceId</TableCell>
                            <TableCell>Links log to trace timeline &amp; tool profile Logs tab</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">timeUnixNano</TableCell>
                            <TableCell>Timestamp column</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">attributes (gen_ai.*)</TableCell>
                            <TableCell>Expandable attribute panel in log detail view</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    {/* ------- POST /v1/metrics ------- */}
                    <section id="provider-metrics" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        POST /v1/metrics
                      </h2>
                      <p className="mb-4">
                        Send aggregated metric data points. Metrics power the
                        charts and summary cards in tool profile detail views.
                      </p>
                    </section>

                    <section id="provider-metrics-schema" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Metric Schema
                      </h3>
                      <CodeBlock language="json" title="Minimal metric payload">
{`{
  "resourceMetrics": [
    {
      "resource": {
        "attributes": [
          { "key": "service.name", "value": { "stringValue": "my-app" } }
        ]
      },
      "scopeMetrics": [
        {
          "scope": { "name": "stereos-sdk" },
          "metrics": [
            {
              "name": "gen_ai.client.token.usage",
              "unit": "{token}",
              "sum": {
                "dataPoints": [
                  {
                    "asInt": "470",
                    "startTimeUnixNano": "1700000000000000000",
                    "timeUnixNano": "1700000001500000000",
                    "attributes": [
                      { "key": "gen_ai.token.type", "value": { "stringValue": "input" } },
                      { "key": "gen_ai.response.model", "value": { "stringValue": "gpt-4o" } }
                    ]
                  }
                ],
                "aggregationTemporality": 2,
                "isMonotonic": true
              }
            }
          ]
        }
      ]
    }
  ]
}`}
                      </CodeBlock>
                    </section>

                    <section id="provider-metrics-names" className="scroll-mt-24 mb-16">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Metric Name Reference
                      </h3>
                      <p className="mb-4">
                        Stereos recognises the following semantic-convention metric
                        names and maps them to dashboard widgets.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Metric Name</TableHead>
                            <TableHead className="font-bold">Unit</TableHead>
                            <TableHead className="font-bold">Dashboard Widget</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.client.token.usage</TableCell>
                            <TableCell>{"{token}"}</TableCell>
                            <TableCell>Token usage bar chart</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.client.operation.duration</TableCell>
                            <TableCell>s</TableCell>
                            <TableCell>Latency histogram / p50-p99</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.server.request.duration</TableCell>
                            <TableCell>s</TableCell>
                            <TableCell>Server-side duration (when available)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">gen_ai.client.error.count</TableCell>
                            <TableCell>{"{error}"}</TableCell>
                            <TableCell>Error rate sparkline</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-sm">llm.openai.chat_completions.tokens</TableCell>
                            <TableCell>{"{token}"}</TableCell>
                            <TableCell>Legacy OpenAI token chart (compat)</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    {/* ------- Gen AI Conventions ------- */}
                    <section id="provider-genai" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Gen AI Semantic Conventions
                      </h2>
                      <p className="mb-4">
                        Stereos follows the{" "}
                        <strong className="text-foreground">
                          OpenTelemetry Gen AI Semantic Conventions
                        </strong>
                        . The table below lists the most important attributes.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Attribute</TableHead>
                            <TableHead className="font-bold">Type</TableHead>
                            <TableHead className="font-bold">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            ["gen_ai.system", "string", "Identifies the LLM vendor (e.g. openai, anthropic)."],
                            ["gen_ai.request.model", "string", "Model requested by the caller."],
                            ["gen_ai.response.model", "string", "Actual model that served the request."],
                            ["gen_ai.usage.input_tokens", "int", "Prompt / input token count."],
                            ["gen_ai.usage.output_tokens", "int", "Completion / output token count."],
                            ["gen_ai.request.max_tokens", "int", "Max tokens parameter sent in request."],
                            ["gen_ai.request.temperature", "double", "Temperature sampling parameter."],
                            ["gen_ai.request.top_p", "double", "Top-p (nucleus) sampling parameter."],
                            ["gen_ai.response.finish_reasons", "string[]", "Why the model stopped (stop, length, tool_calls)."],
                            ["gen_ai.prompt", "string", "The full prompt (optional, may be large)."],
                            ["gen_ai.completion", "string", "The full completion (optional, may be large)."],
                          ].map(([attr, type, desc]) => (
                            <TableRow key={attr}>
                              <TableCell className="font-mono text-sm">{attr}</TableCell>
                              <TableCell className="text-sm">{type}</TableCell>
                              <TableCell className="text-sm">{desc}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </NeuTable>
                    </section>
                  </div>
                </TabsContent>

                {/* ============================================================ */}
                {/*  END-USERS TAB                                                */}
                {/* ============================================================ */}
                <TabsContent value="end-users">
                  <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
                    {/* ------- Dashboard Overview ------- */}
                    <section id="user-overview" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Dashboard Overview
                      </h2>
                      <p className="mb-4">
                        The Stereos dashboard gives you real-time visibility into
                        every LLM call made by your applications. It is organized
                        into two primary views:{" "}
                        <strong className="text-foreground">Events</strong> (a
                        chronological feed of all telemetry) and{" "}
                        <strong className="text-foreground">Tools</strong> (grouped
                        profiles per model/service).
                      </p>
                      <p>
                        All data is ingested via OpenTelemetry. If your engineering
                        team has instrumented your services using the{" "}
                        <strong className="text-foreground">Providers</strong> guide,
                        the dashboard will populate automatically.
                      </p>
                    </section>

                    {/* ------- Events Feed ------- */}
                    <section id="user-events" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Events Feed
                      </h2>
                      <p className="mb-4">
                        The events feed is a reverse-chronological stream of every
                        trace, log, and metric received. Use the filter bar to
                        narrow by vendor, model, service, or severity.
                      </p>
                    </section>

                    <section id="user-events-table" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Event UI Elements
                      </h3>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">UI Element</TableHead>
                            <TableHead className="font-bold">Source</TableHead>
                            <TableHead className="font-bold">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Vendor icon</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.system</TableCell>
                            <TableCell>Logo of the LLM provider</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Event title</TableCell>
                            <TableCell className="font-mono text-sm">span.name</TableCell>
                            <TableCell>Name of the operation (e.g. &quot;chat openai.chat&quot;)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Model badge</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.request.model</TableCell>
                            <TableCell>Chip showing the requested model</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Service tag</TableCell>
                            <TableCell className="font-mono text-sm">service.name</TableCell>
                            <TableCell>Identifies which application sent the event</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Token count</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.usage.*_tokens</TableCell>
                            <TableCell>Input + output token summary</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Latency</TableCell>
                            <TableCell className="font-mono text-sm">span duration</TableCell>
                            <TableCell>Time from span start to span end</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Severity badge</TableCell>
                            <TableCell className="font-mono text-sm">severityText</TableCell>
                            <TableCell>Colored badge for log severity</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Timestamp</TableCell>
                            <TableCell className="font-mono text-sm">timeUnixNano</TableCell>
                            <TableCell>When the event occurred (local time)</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    {/* ------- Tool Profiles ------- */}
                    <section id="user-tools" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Tool Profiles
                      </h2>
                      <p className="mb-4">
                        Tool profiles aggregate telemetry by model and service into
                        dedicated dashboards. Each profile contains summary cards, a
                        metrics tab, a logs tab, and a spans/timeline view.
                      </p>
                    </section>

                    <section id="user-tools-list" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        List View
                      </h3>
                      <p className="mb-4">
                        The tool list shows all detected model/service combinations.
                        Each card displays:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Vendor icon and model name</li>
                        <li>Service name (the application that made the calls)</li>
                        <li>Total request count for the selected time range</li>
                        <li>Aggregate token usage (input + output)</li>
                        <li>Average latency</li>
                        <li>Error rate percentage</li>
                      </ul>
                      <p>
                        Click any card to open the{" "}
                        <strong className="text-foreground">Detail View</strong>.
                      </p>
                    </section>

                    <section id="user-tools-detail" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Detail View
                      </h3>
                      <p className="mb-4">
                        The detail view has three tabs and a header row of summary
                        cards:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong className="text-foreground">Summary cards:</strong>{" "}
                          Total requests, total tokens, average latency, and error
                          rate for the selected time range.
                        </li>
                        <li>
                          <strong className="text-foreground">Metrics tab:</strong>{" "}
                          Time-series charts for token usage, latency percentiles,
                          and error rate.
                        </li>
                        <li>
                          <strong className="text-foreground">Logs tab:</strong>{" "}
                          Filtered log records associated with this model/service.
                        </li>
                        <li>
                          <strong className="text-foreground">Spans tab:</strong>{" "}
                          Full trace timeline showing the waterfall of spans for
                          individual requests.
                        </li>
                      </ul>
                    </section>

                    <section id="user-tools-metrics" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Metrics Tab
                      </h3>
                      <p className="mb-4">
                        The metrics tab contains interactive charts. Hover over data
                        points for exact values. Use the time range selector to zoom
                        in.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Chart</TableHead>
                            <TableHead className="font-bold">What It Shows</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Token Usage</TableCell>
                            <TableCell>Stacked bar chart of input vs. output tokens over time</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Latency Percentiles</TableCell>
                            <TableCell>Line chart with p50, p90, p95, and p99 latency values</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Error Rate</TableCell>
                            <TableCell>Sparkline showing errors / total requests over time</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Request Volume</TableCell>
                            <TableCell>Bar chart of total requests per time bucket</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>

                    <section id="user-tools-logs" className="scroll-mt-24">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Logs Tab
                      </h3>
                      <p className="mb-4">
                        Shows log records filtered to the current tool profile.
                        Logs are sorted newest-first and can be expanded to reveal
                        all attributes. Logs linked to a trace include a{" "}
                        <strong className="text-foreground">View Trace</strong>{" "}
                        button that jumps to the Spans tab.
                      </p>
                    </section>

                    <section id="user-tools-spans" className="scroll-mt-24 mb-16">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        Spans / Timeline
                      </h3>
                      <p className="mb-4">
                        The spans tab renders a waterfall timeline for individual
                        traces. Each bar represents a span — the horizontal length
                        is proportional to duration. Click a span to see its full
                        attributes, including prompt/completion text if the provider
                        sent it.
                      </p>
                    </section>

                    {/* ------- Field Reference ------- */}
                    <section id="user-field-ref" className="scroll-mt-24">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        Field Reference
                      </h2>
                      <p className="mb-4">
                        Consolidated mapping of UI labels to their telemetry source
                        and how to instrument them.
                      </p>
                      <NeuTable>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">UI Label</TableHead>
                            <TableHead className="font-bold">Telemetry Source</TableHead>
                            <TableHead className="font-bold">How to Instrument</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Vendor icon</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.system</TableCell>
                            <TableCell className="text-sm">Set on every LLM span</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Model name</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.request.model</TableCell>
                            <TableCell className="text-sm">Set on every LLM span</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Resolved model</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.response.model</TableCell>
                            <TableCell className="text-sm">Set in span response hook</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Service</TableCell>
                            <TableCell className="font-mono text-sm">service.name</TableCell>
                            <TableCell className="text-sm">Set on the OTel resource</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Input tokens</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.usage.input_tokens</TableCell>
                            <TableCell className="text-sm">Set on LLM span or metric data point</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Output tokens</TableCell>
                            <TableCell className="font-mono text-sm">gen_ai.usage.output_tokens</TableCell>
                            <TableCell className="text-sm">Set on LLM span or metric data point</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Latency</TableCell>
                            <TableCell className="font-mono text-sm">span start/end times</TableCell>
                            <TableCell className="text-sm">Automatic from SDK span lifecycle</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Error rate</TableCell>
                            <TableCell className="font-mono text-sm">span status + error count metric</TableCell>
                            <TableCell className="text-sm">Set span status to ERROR on failure</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Log severity</TableCell>
                            <TableCell className="font-mono text-sm">severityText / severityNumber</TableCell>
                            <TableCell className="text-sm">Use OTel logging API with level</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Log message</TableCell>
                            <TableCell className="font-mono text-sm">body.stringValue</TableCell>
                            <TableCell className="text-sm">Pass message as log body</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Trace link</TableCell>
                            <TableCell className="font-mono text-sm">traceId on log records</TableCell>
                            <TableCell className="text-sm">Emit logs within an active span context</TableCell>
                          </TableRow>
                        </TableBody>
                      </NeuTable>
                    </section>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Table of Contents (right sidebar) */}
          <TableOfContents sections={tocSections} />
        </section>
      </main>
    </div>
  )
}
