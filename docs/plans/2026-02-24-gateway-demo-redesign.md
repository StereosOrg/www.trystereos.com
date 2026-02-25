# Gateway Demo Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `components/interactive-gateway-demo.tsx` to match the app's visual design, fix copy buttons, replace the code snippet block with a mock Kilo Code / VS Code animation, rename Gateway ID to Virtual Key with a GlowEffect trial CTA, and polish span designs to match the app dashboard.

**Architecture:** All changes are self-contained to `interactive-gateway-demo.tsx` and `components/copy-button.tsx`. The Kilo Code mock is a pure CSS/Framer Motion animated component rendered inline. The GlowEffect overlay uses the existing `glow-effect.tsx` component with brand colors layered over the disabled Virtual Key input.

**Tech Stack:** React, Next.js, Tailwind CSS, Framer Motion (`motion/react`), Lucide icons, existing UI primitives (`Input`, `Button`, `Select`)

---

### Task 1: Fix the CopyButton component

**Files:**
- Modify: `components/copy-button.tsx`

**Context:** The current `CopyButton` has `border-2 border-black bg-white` which is jarring against the clean app design. The app screenshot shows a simple icon button with no border, positioned inside the input.

**Step 1: Update copy-button.tsx**

Replace the button's className to match the app's subtle style:

```tsx
"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#718096] hover:text-[#2b2e3a] hover:bg-[#F7FAFC] transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
    </button>
  )
}
```

**Step 2: Verify in browser** — copy buttons in the gateway demo inputs should now look like clean icon-only buttons.

**Step 3: Commit**
```bash
git add components/copy-button.tsx
git commit -m "fix: update CopyButton to match app design system"
```

---

### Task 2: Build the Kilo Code mock animation component (inline in interactive-gateway-demo.tsx)

**Files:**
- Modify: `components/interactive-gateway-demo.tsx`

**Context:** Replace the code block + provider/SDK selectors entirely with a mock VS Code window animating through two states:
1. **Settings panel** — showing API Provider "OpenAI Compatible", Base URL `https://api.trystereos.com/v1/`, API Key `•••••`, Model `openai/gpt-5`
2. **Task running panel** — showing a Kilo Code task sidebar with file reads, API Request indicator, token counter, and "OpenAI / Gpt 5" footer

The animation loops: Settings (3s) → fade → Task running (4s) → fade → back to Settings. Use `motion/react` `AnimatePresence` + `motion.div` for cross-fade. The outer shell is a dark VS Code-style window frame.

**Step 1: Add imports to interactive-gateway-demo.tsx**

Add at the top:
```tsx
import { motion, AnimatePresence } from 'motion/react'
```

**Step 2: Add the KiloCodeMock component (before `InteractiveGatewayDemo`)**

```tsx
function KiloCodeMock() {
  const [phase, setPhase] = useState<'settings' | 'task'>('settings')

  useEffect(() => {
    const timings: Record<typeof phase, number> = { settings: 4000, task: 5000 }
    const t = setTimeout(() => {
      setPhase(p => p === 'settings' ? 'task' : 'settings')
    }, timings[phase])
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className="rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl font-mono text-xs select-none">
      {/* macOS traffic lights + title bar */}
      <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2.5 border-b border-[#3d3d3d]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-[#888] text-[11px]">www.trystereos.com</span>
      </div>

      {/* Content area: sidebar + editor */}
      <div className="flex h-[320px]">
        {/* Left sidebar - Kilo Code panel */}
        <div className="w-[280px] bg-[#252526] border-r border-[#3d3d3d] flex flex-col overflow-hidden">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#3d3d3d]">
            <span className="text-[#cccccc] font-bold text-[11px] tracking-wider">KILO CODE</span>
            <div className="flex gap-1.5">
              {['+','⊞','↺','▷','⚙','⤢'].map((icon, i) => (
                <span key={i} className="text-[#888] text-[10px] cursor-pointer hover:text-[#ccc]">{icon}</span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 overflow-y-auto"
              >
                {/* Settings header */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#3d3d3d]">
                  <span className="text-[#cccccc] text-[13px] font-semibold">← Settings</span>
                  <button className="ml-auto bg-[#5865F2] text-white text-[10px] px-2 py-0.5 rounded">Save</button>
                </div>
                {/* Providers nav */}
                <div className="px-3 py-1.5 text-[#888] text-[11px] border-b border-[#3d3d3d]">Providers</div>

                <div className="px-3 py-2 space-y-2.5">
                  <div>
                    <div className="text-[#9cdcfe] text-[10px] mb-0.5">Configuration Profile</div>
                    <div className="bg-[#3c3c3c] text-[#cccccc] text-[10px] px-2 py-1 rounded flex justify-between items-center">
                      default (Active) <span className="text-[#888]">▾</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#9cdcfe] text-[10px] mb-0.5">API Provider</div>
                    <div className="bg-[#3c3c3c] text-[#4ec9b0] text-[10px] px-2 py-1 rounded flex justify-between items-center">
                      OpenAI Compatible <span className="text-[#888]">▾</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[#9cdcfe] text-[10px] mb-0.5">Base URL</div>
                    <div className="bg-[#1e1e1e] border border-[#5865F2] text-[#88edc3] text-[10px] px-2 py-1 rounded">
                      https://api.trystereos.com/v1/
                    </div>
                  </div>
                  <div>
                    <div className="text-[#9cdcfe] text-[10px] mb-0.5">API Key</div>
                    <div className="bg-[#1e1e1e] border border-[#3c3c3c] text-[#888] text-[10px] px-2 py-1 rounded tracking-widest">
                      •••••••••••
                    </div>
                  </div>
                  <div>
                    <div className="text-[#9cdcfe] text-[10px] mb-0.5">Model</div>
                    <div className="bg-[#3c3c3c] text-[#cccccc] text-[10px] px-2 py-1 rounded flex justify-between items-center">
                      openai/gpt-5 <span className="text-[#888]">▾</span>
                    </div>
                  </div>
                  <div className="text-[#888] text-[9px] leading-relaxed pt-1">
                    Context Window: 128,000 tokens<br/>
                    <span className="text-[#4ec9b0]">✓</span> Supports images<br/>
                    <span className="text-[#888]">✗</span> Prompt caching<br/>
                    Input: $0.00 / 1M tokens
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="task"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Task header */}
                <div className="px-3 py-2 border-b border-[#3d3d3d]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#888] text-[10px]">▶</span>
                      <span className="text-[#cccccc] text-[10px]">Task: Route requests via Ste...</span>
                      <span className="text-[#888] cursor-pointer">✕</span>
                    </div>
                  </div>
                  {/* Token progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[#888] text-[9px]">20.1k</span>
                    <div className="flex-1 h-1 bg-[#3c3c3c] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#88edc3] to-[#4ec9b0] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[#888] text-[9px]">128.0k ⊹</span>
                  </div>
                </div>

                {/* API Request indicator */}
                <div className="px-3 py-1.5 border-b border-[#3d3d3d] flex items-center gap-2">
                  <span className="text-[#888] text-[9px]">⇄</span>
                  <span className="text-[#888] text-[9px]">API Request</span>
                  <motion.span
                    className="text-[#88edc3] text-[9px]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >20:08</motion.span>
                </div>

                {/* Checkpoint */}
                <div className="px-3 py-1.5 border-b border-[#3d3d3d] flex items-center gap-1.5">
                  <span className="text-[#888] text-[9px]">⊹</span>
                  <span className="text-[#888] text-[9px]">Checkpoint</span>
                  <span className="text-[#4ec9b0] text-[9px]">(Current)</span>
                </div>

                {/* File reads */}
                <div className="px-3 py-2 border-b border-[#3d3d3d]">
                  <div className="text-[#cccccc] text-[10px] mb-1.5">Kilo Code wants to read files</div>
                  <div className="space-y-1">
                    {[
                      'components/interactive-gateway-...',
                      'components/glow-effect.tsx',
                      'components/copy-button.tsx',
                      'app/globals.css',
                    ].map((f, i) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.3 }}
                        className="flex items-center justify-between bg-[#2d2d2d] px-2 py-0.5 rounded text-[9px]"
                      >
                        <span className="text-[#9cdcfe]">{f}</span>
                        <span className="text-[#888] cursor-pointer ml-2">⤢</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Approve/Deny */}
                <div className="px-3 py-2 flex gap-2">
                  <button className="flex-1 bg-[#4ec9b0] text-[#1e1e1e] text-[10px] font-semibold py-1 rounded">Approve All</button>
                  <button className="flex-1 bg-[#3c3c3c] text-[#cccccc] text-[10px] font-semibold py-1 rounded">Deny All</button>
                </div>

                {/* Input area */}
                <div className="mt-auto px-3 pb-2">
                  <div className="bg-[#3c3c3c] rounded px-2 py-1.5 text-[#888] text-[9px]">Type a message...</div>
                </div>

                {/* Footer */}
                <div className="px-3 py-1.5 border-t border-[#3d3d3d] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#888] flex items-center justify-center">
                      <span className="text-[7px] text-white">O</span>
                    </div>
                    <span className="text-[#888] text-[9px]">OpenAI / Gpt 5</span>
                  </div>
                  <span className="text-[#4ec9b0] text-[9px]">⚖ ⊹</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: code editor mock */}
        <div className="flex-1 bg-[#1e1e1e] overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center bg-[#2d2d2d] border-b border-[#3d3d3d] overflow-x-hidden">
            {[
              { name: 'interactive-gateway-demo.tsx', active: true, dot: 'text-[#4ec9b0]' },
              { name: 'pricing-cards.tsx', active: false },
              { name: 'glow-effect.tsx', active: false, dot: 'text-[#f97316]' },
            ].map((tab) => (
              <div
                key={tab.name}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] border-r border-[#3d3d3d] whitespace-nowrap ${tab.active ? 'bg-[#1e1e1e] text-[#cccccc]' : 'text-[#888]'}`}
              >
                {tab.dot && <span className={tab.dot}>●</span>}
                <span>{tab.name}</span>
              </div>
            ))}
          </div>

          {/* Code lines */}
          <div className="p-3 space-y-0.5 overflow-hidden">
            {[
              { n: 30, code: <><span className="text-[#569cd6]">export function</span> <span className="text-[#dcdcaa]">GlowEffect</span><span className="text-[#ffd700]">{'({'}</span></> },
              { n: 46, code: <><span className="text-[#9cdcfe]">  const</span> <span className="text-[#4fc1ff]">animations</span> <span className="text-[#cccccc]">= {'{'}</span></> },
              { n: 56, code: <><span className="text-[#cccccc]">    pulse: {'{'}</span></> },
              { n: 63, code: <><span className="text-[#cccccc]">      transition: {'{'}</span></> },
              { n: 64, code: <><span className="text-[#cccccc]">        ...(</span><span className="text-[#9cdcfe]">transition</span> <span className="text-[#cccccc]">?? {'{'}</span></> },
              { n: 66, code: <><span className="text-[#9cdcfe]">          repeatType</span><span className="text-[#cccccc]">: </span><span className="text-[#ce9178]">'mirror'</span><span className="text-[#cccccc]">,</span></> },
              { n: 67, code: <><span className="text-[#ffd700]">        {'}'}</span><span className="text-[#cccccc]">),</span></> },
              { n: 70, code: <><span className="text-[#cccccc]">    breathe: {'{'}</span></> },
              { n: 71, code: <><span className="text-[#9cdcfe]">      background</span><span className="text-[#cccccc]">: [</span></> },
              { n: 74, code: <><span className="text-[#ce9178]">        `radial-gradient(circle at 50% 50%, ${'{'}</span><span className="text-[#9cdcfe]">color</span><span className="text-[#ce9178]">{'}'} 0%, transparent 100%)`</span></> },
              { n: 77, code: <><span className="text-[#9cdcfe]">      scale</span><span className="text-[#cccccc]">: [1 * </span><span className="text-[#9cdcfe]">scale</span><span className="text-[#cccccc]">, 1.05 * </span><span className="text-[#9cdcfe]">scale</span><span className="text-[#cccccc]">, 1 * </span><span className="text-[#9cdcfe]">scale</span><span className="text-[#cccccc]">],</span></> },
              { n: 85, code: <><span className="text-[#cccccc]">    colorShift: {'{'}</span></> },
              { n: 86, code: <><span className="text-[#9cdcfe]">      background</span><span className="text-[#cccccc]">: </span><span className="text-[#4fc1ff]">colors</span><span className="text-[#cccccc]">.map((</span><span className="text-[#9cdcfe]">color</span><span className="text-[#cccccc]">, </span><span className="text-[#9cdcfe]">index</span><span className="text-[#cccccc]">) =&gt; {'{'}</span></> },
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#5a5a5a] text-[9px] w-4 text-right shrink-0">{line.n}</span>
                <span className="text-[9px] leading-4 whitespace-nowrap">{line.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Note:** Add `useEffect` to the existing import line at the top of the file:
```tsx
import { useMemo, useState, useEffect } from 'react'
```

**Step 3: Replace the code block section in the JSX**

Find and remove this block:
```tsx
<div className="lg:col-span-2">
  <div className="flex flex-wrap items-center gap-2 text-sm text-[#2b2e3a] mb-2">
    ...Select components...
  </div>
  <CodeBlock language={sdk === 'curl' ? 'bash' : 'ts'}>
    {snippet}
  </CodeBlock>
</div>
```

Replace with:
```tsx
<div className="lg:col-span-2">
  <div className="flex items-center gap-2 text-sm text-[#2b2e3a] mb-3">
    <span className="text-[#718096]">Drop-in via any OpenAI-compatible tool</span>
  </div>
  <KiloCodeMock />
</div>
```

Also remove the now-unused imports: `provider`, `setSdk`, `sdk`, `snippet`, `codeExample`, `CodeBlock`, `Tabs*`, and the `Sdk` type + `useMemo`.

**Step 4: Commit**
```bash
git add components/interactive-gateway-demo.tsx
git commit -m "feat: replace code block with Kilo Code mock animation"
```

---

### Task 3: Rename Gateway ID → Virtual Key + GlowEffect CTA overlay

**Files:**
- Modify: `components/interactive-gateway-demo.tsx`

**Context:** The "Gateway ID" field in the top cards section should become "Virtual Key" with:
- Value: `stereos_7ae80c44` (truncated format)
- The entire Virtual Key card row wrapped in a `relative` container
- A `GlowEffect` (mode=`breathe`, colors matching brand) layered under a semi-transparent frosted overlay
- Overlay content: lock icon + "Start a 14-day trial for a key!" + arrow button linking to `https://app.trystereos.com/`

**Step 1: Update the Virtual Key field**

Change the Gateway Status card's first input group from:
```tsx
<div>
  <label className="text-xs text-[#718096]">Gateway ID</label>
  <div className="mt-1 relative">
    <Input readOnly value={gatewayId} className="pr-10" />
    <CopyButton text={gatewayId} />
  </div>
</div>
```

To:
```tsx
<div className="relative">
  <label className="text-xs text-[#718096]">Virtual Key</label>
  <div className="mt-1 relative">
    <Input
      readOnly
      disabled
      value="stereos_7ae80c44"
      className="pr-10 opacity-40 cursor-not-allowed"
    />
  </div>
  {/* Glow + CTA overlay */}
  <div className="absolute inset-0 -inset-x-2 -inset-y-1 rounded-lg overflow-hidden flex items-center justify-center">
    <GlowEffect
      colors={['#88edc3', '#6ddbb0', '#2bb882', '#1aa36e']}
      mode="breathe"
      blur="strong"
      scale={1.1}
      duration={3}
    />
    <a
      href="https://app.trystereos.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#88edc3] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#2b2e3a] hover:bg-white shadow-sm transition-all hover:shadow-md"
    >
      <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
      Start a 14-day trial for a key!
      <ArrowRight className="w-3 h-3 text-emerald-600" />
    </a>
  </div>
</div>
```

**Step 2: Add missing imports**

Ensure `ArrowRight` is imported from `lucide-react` (check if already imported from page.tsx — it's not used in this file yet, add it):
```tsx
import { CheckCircle2, Activity, KeyRound, ServerCog, ShieldCheck, ArrowRight } from 'lucide-react'
```

Also add `GlowEffect` import:
```tsx
import { GlowEffect } from '@/components/glow-effect'
```

**Step 3: Commit**
```bash
git add components/interactive-gateway-demo.tsx
git commit -m "feat: add Virtual Key field with GlowEffect trial CTA"
```

---

### Task 4: Redesign span rows to match app dashboard design

**Files:**
- Modify: `components/interactive-gateway-demo.tsx`

**Context:** The app's Recent Spans list (screenshot 04-02-53) shows each span with:
- A circular provider icon (OpenAI logo style)
- Model name bold + service/provider subtitle
- Timestamp right-aligned

The span detail (screenshot 04-03-02) shows:
- Model icon + name at top
- STATUS, START TIME, END TIME, DURATION in a grid
- SPAN KIND, SERVICE, TRACE ID, SPAN ID in another row
- Span Attributes JSON block with amber background

**Step 1: Add provider icon helper**

Add this above `recentSpans`:
```tsx
function ProviderIcon({ provider }: { provider: string }) {
  const colors: Record<string, { bg: string; text: string; label: string }> = {
    openai: { bg: '#10a37f', text: 'white', label: 'O' },
    anthropic: { bg: '#d97706', text: 'white', label: 'A' },
  }
  const c = colors[provider] ?? { bg: '#718096', text: 'white', label: '?' }
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {c.label}
    </div>
  )
}
```

**Step 2: Update `recentSpans` data** — fix model name for Anthropic:
```tsx
const recentSpans = [
  {
    id: '778dd111adab4f73b980fe33fb56f0b7',
    model: 'gpt-5',
    provider: 'openai',
    kind: 'CLIENT',
    service: 'cloudflare-ai-gateway',
    tokensIn: 15472,
    tokensOut: 1021,
    status: 'OK',
    durationMs: 23248,
    startedAt: '23/02/2026, 09:17:08',
    endedAt: '23/02/2026, 09:17:31',
  },
  {
    id: '9bfe2405c445a1d9c9c22d0f4aa4a1a3',
    model: 'claude-opus-3-7',
    provider: 'anthropic',
    kind: 'CLIENT',
    service: 'cloudflare-ai-gateway',
    tokensIn: 8291,
    tokensOut: 592,
    status: 'OK',
    durationMs: 11842,
    startedAt: '23/02/2026, 09:09:39',
    endedAt: '23/02/2026, 09:09:51',
  },
  {
    id: 'f31c9a0a8d1f44f0a41d7e0a9a66b940',
    model: 'gpt-4o-mini',
    provider: 'openai',
    kind: 'CLIENT',
    service: 'cloudflare-ai-gateway',
    tokensIn: 1290,
    tokensOut: 201,
    status: 'OK',
    durationMs: 2204,
    startedAt: '23/02/2026, 09:08:53',
    endedAt: '23/02/2026, 09:08:55',
  },
]
```

**Step 3: Update span list rows JSX**

Replace each span button's inner content:
```tsx
<button
  key={s.id}
  onClick={() => setSelectedSpan(s)}
  className={`w-full text-left rounded-md border ${selectedSpan?.id === s.id ? 'border-[#2b2e3a] bg-[#F7FAFC]' : 'border-[#E2E8F0] bg-white'} p-2.5 hover:bg-[#F7FAFC] transition-colors`}
>
  <div className="flex items-center gap-2.5">
    <ProviderIcon provider={s.provider} />
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-[#2b2e3a] text-xs truncate">{s.model}</div>
      <div className="text-[10px] text-[#718096] truncate">{s.service} · {s.kind}</div>
    </div>
    <div className="text-[9px] text-[#718096] text-right shrink-0 leading-tight">
      {s.startedAt.split(', ')[1]}
    </div>
  </div>
</button>
```

**Step 4: Update span detail panel**

Replace the `selectedSpan &&` block:
```tsx
{selectedSpan && (
  <div className="mt-3 rounded-lg border border-[#E2E8F0] bg-white p-4">
    {/* Header */}
    <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-[#E2E8F0]">
      <ProviderIcon provider={selectedSpan.provider} />
      <div>
        <div className="font-bold text-[#2b2e3a] text-sm">{selectedSpan.model}</div>
        <div className="text-[10px] text-[#718096]">{selectedSpan.provider} · {selectedSpan.model}</div>
      </div>
      <span className="ml-auto inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-emerald-200">
        {selectedSpan.status}
      </span>
    </div>

    {/* Metadata grid */}
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-[10px]">
      <div><span className="text-[#718096] uppercase tracking-wide text-[9px]">Start Time</span><div className="text-[#2b2e3a] font-medium">{selectedSpan.startedAt}</div></div>
      <div><span className="text-[#718096] uppercase tracking-wide text-[9px]">Duration</span><div className="text-[#2b2e3a] font-medium">{selectedSpan.durationMs} ms</div></div>
      <div><span className="text-[#718096] uppercase tracking-wide text-[9px]">Span Kind</span><div className="text-[#2b2e3a] font-medium">{selectedSpan.kind}</div></div>
      <div><span className="text-[#718096] uppercase tracking-wide text-[9px]">Service</span><div className="text-[#2b2e3a] font-medium">{selectedSpan.service}</div></div>
    </div>

    {/* Span Attributes */}
    <div className="text-[#2b2e3a] text-xs font-semibold mb-1.5">Span Attributes</div>
    <pre className="text-[10px] text-[#2b2e3a] bg-[#FFFBEA] border border-[#FDE68A] rounded-md p-3 overflow-x-auto leading-relaxed">
{`{
  "llm.provider": "${selectedSpan.provider}",
  "gen_ai.request.model": "${selectedSpan.model}",
  "gen_ai.usage.input_tokens": ${selectedSpan.tokensIn},
  "gen_ai.usage.output_tokens": ${selectedSpan.tokensOut}
}`}
    </pre>
  </div>
)}
```

**Step 5: Commit**
```bash
git add components/interactive-gateway-demo.tsx
git commit -m "feat: redesign span rows and detail to match app dashboard"
```

---

### Task 5: Final cleanup and unused import removal

**Files:**
- Modify: `components/interactive-gateway-demo.tsx`

**Step 1: Remove unused imports/state**

Remove:
- `useMemo` from react imports
- `Tabs, TabsContent, TabsList, TabsTrigger` import
- `CodeBlock` import
- `Sdk` type and `sdk` state
- `setSdk`
- `snippet` / `codeExample` function
- `provider` / `setProvider` state (no longer needed for the code block)

**Step 2: Remove the `ShieldCheck` icon if not used**

Check if `ShieldCheck` is referenced in the JSX — if not, remove from import.

**Step 3: Run the dev server and verify visually**
```bash
npm run dev
```
Open `http://localhost:3000` and verify:
- [ ] Kilo Code mock animation plays (settings → task → settings loop)
- [ ] Virtual Key shows glow + CTA overlay
- [ ] Copy buttons look like clean icon-only buttons
- [ ] Span rows show provider icons + clean layout
- [ ] Span detail shows structured metadata + amber JSON block
- [ ] No console errors

**Step 4: Final commit**
```bash
git add components/interactive-gateway-demo.tsx
git commit -m "chore: remove unused imports after gateway demo redesign"
```

---

## Summary of Changes

| File | Change |
|------|--------|
| `components/copy-button.tsx` | Subtle ghost button styling |
| `components/interactive-gateway-demo.tsx` | Replace code block with KiloCode mock, add Virtual Key GlowEffect CTA, redesign span rows/detail, clean up imports |
