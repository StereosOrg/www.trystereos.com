import { Code, FileText, Zap, Sparkles, GlassesIcon, User2Icon } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              The Magic
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-5xl">
               We use strong specs {" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-black">
                to contextualize AI-assisted sprints
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              We specialize in building powerful and efficient software by taking advantage of the latest AI-assisted development tools and methodologies. <a href="/guides/llm-assisted-coding" className="text-primary hover:underline font-semibold">Learn our approach</a>.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16 lg:mt-20">
          <div className="group relative rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-black bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <User2Icon className="h-7 w-7 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                Agentic DevEx
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                Plan the interaction flow between AI agents, your developers, and your software to maximize user experience and efficiency.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-black bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Code className="h-7 w-7 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                Demo Implementation
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                Show the value of MCP to stakeholders with a working technical demo of core features and architecture.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-black bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="h-7 w-7 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                MCP Support
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                Leverage Model Context Protocol to connect your agents to external tools seamlessly.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-black bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="h-7 w-7 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                Product Roadmap
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                Strategize and plan your product development with expert guidance and insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
