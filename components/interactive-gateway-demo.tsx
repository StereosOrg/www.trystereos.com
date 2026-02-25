'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CopyButton } from '@/components/copy-button'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircle2, Activity, KeyRound, ServerCog, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { GlowEffect } from '@/components/glow-effect'

const PROXY_ENDPOINT = 'https://api.trystereos.com/v1/chat/completions'

function ProviderIcon({ provider }: { provider: string }) {
  const icons: Record<string, string> = {
    openai: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/openai-icon.png',
    anthropic: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg',
  }
  const src = icons[provider]
  if (src) {
    return (
      <img
        src={src}
        alt={provider}
        className="w-7 h-7 rounded-full shrink-0 object-contain"
      />
    )
  }
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
      style={{ backgroundColor: '#718096', color: 'white' }}
    >
      ?
    </div>
  )
}

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
    <div className="rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl font-mono text-xs select-none flex-1 flex flex-col">
      {/* macOS traffic lights + title bar */}
      <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2.5 border-b border-[#3d3d3d]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-[#888] text-[11px]">www.trystereos.com — Kilo Code</span>
      </div>

      {/* Content area: sidebar + editor */}
      <div className="flex flex-1">
        {/* Left sidebar - Kilo Code panel */}
        <div className="w-[280px] bg-[#252526] border-r border-[#3d3d3d] flex flex-col overflow-hidden">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#3d3d3d]">
            <span className="text-[#cccccc] font-bold text-[11px] tracking-wider">KILO CODE</span>
            <div className="flex gap-1.5">
              {['+', '⊞', '↺', '▷', '⚙', '⤢'].map((icon, i) => (
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
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#3d3d3d]">
                  <span className="text-[#cccccc] text-[13px] font-semibold">← Settings</span>
                  <button className="ml-auto bg-[#5865F2] text-white text-[10px] px-2 py-0.5 rounded">Save</button>
                </div>
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
                    Context Window: 128,000 tokens<br />
                    <span className="text-[#4ec9b0]">✓</span> Supports images<br />
                    <span className="text-[#888]">✗</span> Prompt caching<br />
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
                <div className="px-3 py-2 border-b border-[#3d3d3d]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#888] text-[10px]">▶</span>
                    <span className="text-[#cccccc] text-[10px]">Task: Route requests via Ste...</span>
                    <span className="text-[#888] cursor-pointer ml-auto">✕</span>
                  </div>
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

                <div className="px-3 py-1.5 border-b border-[#3d3d3d] flex items-center gap-2">
                  <span className="text-[#888] text-[9px]">⇄</span>
                  <span className="text-[#888] text-[9px]">API Request</span>
                  <motion.span
                    className="text-[#88edc3] text-[9px]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    20:08
                  </motion.span>
                </div>

                <div className="px-3 py-1.5 border-b border-[#3d3d3d] flex items-center gap-1.5">
                  <span className="text-[#888] text-[9px]">⊹</span>
                  <span className="text-[#888] text-[9px]">Checkpoint</span>
                  <span className="text-[#4ec9b0] text-[9px]">(Current)</span>
                </div>

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

                <div className="px-3 py-2 flex gap-2">
                  <button className="flex-1 bg-[#4ec9b0] text-[#1e1e1e] text-[10px] font-semibold py-1 rounded">Approve All</button>
                  <button className="flex-1 bg-[#3c3c3c] text-[#cccccc] text-[10px] font-semibold py-1 rounded">Deny All</button>
                </div>

                <div className="mt-auto px-3 pb-2">
                  <div className="bg-[#3c3c3c] rounded px-2 py-1.5 text-[#888] text-[9px]">Type a message...</div>
                </div>

                <div className="px-3 py-1.5 border-t border-[#3d3d3d] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#10a37f] flex items-center justify-center">
                      <span className="text-[7px] text-white font-bold">O</span>
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
          <div className="flex items-center bg-[#2d2d2d] border-b border-[#3d3d3d] overflow-x-hidden">
            {[
              { name: 'interactive-gateway-demo.tsx', active: true, dot: 'text-[#4ec9b0]' as string | undefined },
              { name: 'pricing-cards.tsx', active: false, dot: undefined },
              { name: 'glow-effect.tsx', active: false, dot: 'text-[#f97316]' as string | undefined },
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

          <div className="p-3 space-y-0.5 overflow-hidden">
            {[
              { n: 30, code: <><span className="text-[#569cd6]">export function</span> <span className="text-[#dcdcaa]">GlowEffect</span><span className="text-[#ffd700]">{'({'}</span></> },
              { n: 46, code: <><span className="text-[#9cdcfe]">  const</span> <span className="text-[#4fc1ff]">animations</span> <span className="text-[#cccccc]">{'= {'}</span></> },
              { n: 56, code: <><span className="text-[#cccccc]">{'    pulse: {'}</span></> },
              { n: 63, code: <><span className="text-[#cccccc]">{'      transition: {'}</span></> },
              { n: 64, code: <><span className="text-[#cccccc]">        ...(</span><span className="text-[#9cdcfe]">transition</span> <span className="text-[#cccccc]">{'?? {'}</span></> },
              { n: 66, code: <><span className="text-[#9cdcfe]">          repeatType</span><span className="text-[#cccccc]">: </span><span className="text-[#ce9178]">&apos;mirror&apos;</span><span className="text-[#cccccc]">,</span></> },
              { n: 67, code: <><span className="text-[#ffd700]">{'        }'}</span><span className="text-[#cccccc]">),</span></> },
              { n: 70, code: <><span className="text-[#cccccc]">{'    breathe: {'}</span></> },
              { n: 71, code: <><span className="text-[#9cdcfe]">      background</span><span className="text-[#cccccc]">: [</span></> },
              { n: 74, code: <><span className="text-[#ce9178]">        `radial-gradient(circle at 50% 50%,</span><span className="text-[#9cdcfe]"> color </span><span className="text-[#ce9178]">0%, transparent 100%)`</span></> },
              { n: 77, code: <><span className="text-[#9cdcfe]">      scale</span><span className="text-[#cccccc]">: [1 * </span><span className="text-[#9cdcfe]">scale</span><span className="text-[#cccccc]">, 1.05 * </span><span className="text-[#9cdcfe]">scale</span><span className="text-[#cccccc]">],</span></> },
              { n: 85, code: <><span className="text-[#cccccc]">{'    colorShift: {'}</span></> },
              { n: 86, code: <><span className="text-[#9cdcfe]">      background</span><span className="text-[#cccccc]">: </span><span className="text-[#4fc1ff]">colors</span><span className="text-[#cccccc]">.map((</span><span className="text-[#9cdcfe]">color</span><span className="text-[#cccccc]">, </span><span className="text-[#9cdcfe]">index</span><span className="text-[#cccccc]">{') => {'}</span></> },
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

export default function InteractiveGatewayDemo() {
  const [otel, setOtel] = useState('https://api.trystereos.com/v1/traces')
  const [selectedSpan, setSelectedSpan] = useState<typeof recentSpans[number] | null>(recentSpans[0])
  const { toast } = useToast()

  return (
    <div className="relative overflow-hidden rounded-xl bg-white border border-[#E2E8F0] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2b2e3a]">Private Organizational AI Gateway</h3>
            <p className="text-[#718096] text-sm">Route AI requests through your gateway with rate limiting, caching, and observability.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Provisioned</span>
          </div>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[#2b2e3a] font-semibold">
                <KeyRound className="w-4 h-4" />
                Gateway Status
              </div>
              <span className="inline-flex items-center gap-1 text-emerald-700 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Provisioned
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Virtual Key with GlowEffect trial CTA */}
              <div className="relative overflow-hidden rounded-lg p-0.5">
                <label className="text-xs text-[#718096] px-0.5">Virtual Key</label>
                <div className="mt-1 relative">
                  <Input
                    readOnly
                    disabled
                    value="stereos_7ae80c44"
                    className="pr-10 opacity-40 cursor-not-allowed"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden">
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
                    className="relative z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#88edc3] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#2b2e3a] hover:bg-white shadow-sm transition-all hover:shadow-md whitespace-nowrap"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Start a 14-day trial for a key!
                    <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                  </a>
                </div>
              </div>
              <div>
                <label className="text-xs text-[#718096]">Proxy endpoint</label>
                <div className="mt-1 relative">
                  <Input readOnly value={PROXY_ENDPOINT} className="pr-10" />
                  <CopyButton text={PROXY_ENDPOINT} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2b2e3a] font-semibold mb-3">
              <ServerCog className="w-4 h-4" /> Observability
            </div>
            <label className="text-xs text-[#718096]">OTEL endpoint URL</label>
            <Input value={otel} onChange={(e) => setOtel(e.target.value)} className="mt-1" />
            <Button
              size="sm"
              className="mt-3 rounded-md bg-[#2b2e3a] hover:bg-[#1a1c24]"
              onClick={() => toast({ title: 'Destination saved', description: 'Your gateway will export traces to the configured endpoint.' })}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Kilo Code animation + spans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <p className="text-sm text-[#718096] mb-3">Drop-in via any OpenAI-compatible tool</p>
            <KiloCodeMock />
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-2 text-[#2b2e3a] font-semibold mb-3">
                <Activity className="w-4 h-4" /> Recent Spans
              </div>
              <div className="space-y-2">
                {recentSpans.map((s) => (
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
                ))}
              </div>
            </div>

            {selectedSpan && (
              <div className="mt-3 rounded-lg border border-[#E2E8F0] bg-white p-4">
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-[#E2E8F0]">
                  <ProviderIcon provider={selectedSpan.provider} />
                  <div>
                    <div className="font-bold text-[#2b2e3a] text-sm">{selectedSpan.model}</div>
                    <div className="text-[10px] text-[#718096]">{selectedSpan.provider} · {selectedSpan.model}</div>
                  </div>
                  <span className="ml-auto inline-flex items-center bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-emerald-200">
                    {selectedSpan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  <div>
                    <span className="text-[#718096] uppercase tracking-wide text-[9px]">Start Time</span>
                    <div className="text-[#2b2e3a] text-[10px] font-medium">{selectedSpan.startedAt}</div>
                  </div>
                  <div>
                    <span className="text-[#718096] uppercase tracking-wide text-[9px]">Duration</span>
                    <div className="text-[#2b2e3a] text-[10px] font-medium">{selectedSpan.durationMs} ms</div>
                  </div>
                  <div>
                    <span className="text-[#718096] uppercase tracking-wide text-[9px]">Span Kind</span>
                    <div className="text-[#2b2e3a] text-[10px] font-medium">{selectedSpan.kind}</div>
                  </div>
                  <div>
                    <span className="text-[#718096] uppercase tracking-wide text-[9px]">Service</span>
                    <div className="text-[#2b2e3a] text-[10px] font-medium">{selectedSpan.service}</div>
                  </div>
                </div>

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
          </div>
        </div>
      </div>

      <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#88edc3]/30 rounded-full blur-2xl" />
    </div>
  )
}
