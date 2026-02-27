declare global {
  interface Window {
    posthog: any
  }
}

export function useAnalytics() {
  const getPosthog = () => {
    if (typeof window !== 'undefined') {
      return window.posthog
    }
    return null
  }

  const identify = (userId: string, traits?: Record<string, any>) => {
    const ph = getPosthog()
    if (ph) {
      ph.identify(userId, traits)
    }
  }

  const track = (event: string, properties?: Record<string, any>) => {
    const ph = getPosthog()
    if (ph) {
      ph.capture(event, properties)
    }
  }

  const page = (name?: string, properties?: Record<string, any>) => {
    const ph = getPosthog()
    if (ph) {
      ph.capture('$pageview', { name, ...properties })
    }
  }

  return { identify, track, page }
} 