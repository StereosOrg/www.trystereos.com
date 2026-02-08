// Mock API functions that simulate real API calls with delays

import type { Mission, Proposal, CompanyDashboardStats, DeveloperDashboardStats } from '@/lib/types/marketplace'
import { mockMissions, mockProposals, mockCompanyDashboardStats, mockDeveloperDashboardStats, mockDevelopers } from './data'

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// ============================================================================
// COMPANY API
// ============================================================================

export const companyApi = {
  // Get dashboard stats
  async getDashboardStats(): Promise<CompanyDashboardStats> {
    await delay(300)
    return mockCompanyDashboardStats
  },

  // Get all missions for company
  async getMissions(filters?: { status?: string }): Promise<Mission[]> {
    await delay(400)
    let missions = mockMissions.filter(m => m.organization_id === 'org-1') // Simulate current company

    if (filters?.status) {
      missions = missions.filter(m => m.status === filters.status)
    }

    return missions
  },

  // Get single mission
  async getMission(id: string): Promise<Mission | null> {
    await delay(300)
    return mockMissions.find(m => m.id === id) || null
  },

  // Create new mission
  async createMission(data: Partial<Mission>): Promise<Mission> {
    await delay(600)
    const newMission: Mission = {
      id: `mission-${Date.now()}`,
      organization_id: 'org-1',
      name: data.name || '',
      description: data.description || '',
      repository: data.repository || '',
      status: 'open',
      budget_min: data.budget_min,
      budget_max: data.budget_max,
      deadline: data.deadline,
      platform_fee_percent: 10,
      funded: false,
      tags: data.tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    mockMissions.push(newMission)
    return newMission
  },

  // Get proposals for a mission
  async getProposals(missionId: string): Promise<Proposal[]> {
    await delay(400)
    return mockProposals.filter(p => p.mission_id === missionId)
  },

  // Accept a proposal
  async acceptProposal(proposalId: string): Promise<{ checkout_url: string }> {
    await delay(800)
    // Simulate Stripe Checkout URL generation
    return {
      checkout_url: `https://checkout.stripe.com/test/${proposalId}`
    }
  },

  // Reject a proposal
  async rejectProposal(proposalId: string): Promise<void> {
    await delay(400)
    const proposal = mockProposals.find(p => p.id === proposalId)
    if (proposal) {
      proposal.status = 'rejected'
    }
  }
}

// ============================================================================
// DEVELOPER API
// ============================================================================

export const developerApi = {
  // Get dashboard stats
  async getDashboardStats(): Promise<DeveloperDashboardStats> {
    await delay(300)
    return mockDeveloperDashboardStats
  },

  // Browse available missions (marketplace)
  async browseMissions(filters?: {
    tags?: string[]
    budget_min?: number
    budget_max?: number
  }): Promise<Mission[]> {
    await delay(500)
    let missions = mockMissions.filter(m => m.status === 'open')

    if (filters?.tags && filters.tags.length > 0) {
      missions = missions.filter(m =>
        m.tags.some(tag => filters.tags?.includes(tag))
      )
    }

    if (filters?.budget_max) {
      missions = missions.filter(m =>
        !m.budget_min || m.budget_min <= filters.budget_max!
      )
    }

    return missions
  },

  // Get single mission details
  async getMission(id: string): Promise<Mission | null> {
    await delay(300)
    return mockMissions.find(m => m.id === id) || null
  },

  // Submit a proposal
  async submitProposal(data: {
    mission_id: string
    proposed_rate: number
    estimated_days: number
    cover_letter: string
    portfolio_links?: string[]
  }): Promise<Proposal> {
    await delay(600)
    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      mission_id: data.mission_id,
      developer_id: 'dev-1', // Simulate current developer
      developer: mockDevelopers[0],
      proposed_rate: data.proposed_rate,
      estimated_days: data.estimated_days,
      cover_letter: data.cover_letter,
      portfolio_links: data.portfolio_links,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    mockProposals.push(newProposal)
    return newProposal
  },

  // Get my proposals
  async getMyProposals(status?: string): Promise<Proposal[]> {
    await delay(400)
    let proposals = mockProposals.filter(p => p.developer_id === 'dev-1') // Simulate current developer

    if (status) {
      proposals = proposals.filter(p => p.status === status)
    }

    return proposals
  },

  // Get active missions (where my proposal was accepted)
  async getActiveMissions(): Promise<Mission[]> {
    await delay(400)
    return mockMissions.filter(m =>
      m.assigned_developer_id === 'dev-1' &&
      m.status === 'in_progress'
    )
  },

  // Withdraw a proposal
  async withdrawProposal(proposalId: string): Promise<void> {
    await delay(400)
    const proposal = mockProposals.find(p => p.id === proposalId)
    if (proposal && proposal.status === 'pending') {
      proposal.status = 'withdrawn'
    }
  }
}

// ============================================================================
// AUTH / ONBOARDING API
// ============================================================================

export const authApi = {
  // Check if user has completed onboarding
  async getOnboardingStatus(): Promise<{
    github_connected: boolean
    stripe_connected: boolean
    onboarding_complete: boolean
  }> {
    await delay(200)
    // Mock response - in reality this would check the user's auth state
    return {
      github_connected: false,
      stripe_connected: false,
      onboarding_complete: false
    }
  },

  // Connect GitHub account
  async connectGitHub(): Promise<{ auth_url: string }> {
    await delay(300)
    return {
      auth_url: '/api/auth/github'
    }
  },

  // Connect Stripe account
  async connectStripe(): Promise<{ onboarding_url: string }> {
    await delay(300)
    return {
      onboarding_url: 'https://connect.stripe.com/express/onboarding/test'
    }
  }
}
