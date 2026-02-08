// Core types for the Atelier Logos marketplace

export type MissionStatus = 'open' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn'
export type PaymentStatus = 'held' | 'released' | 'refunded'

export interface Organization {
  id: string
  name: string
  slug: string
  billing_email: string
  github_org?: string
  stripe_customer_id?: string
  created_at: string
}

export interface Developer {
  id: string
  email: string
  github_id: number
  github_username: string
  github_avatar_url: string
  stripe_account_id?: string
  stripe_onboarding_complete: boolean
  payout_enabled: boolean
  created_at: string
}

export interface Mission {
  id: string
  organization_id: string
  organization?: Organization
  assigned_developer_id?: string
  assigned_developer?: Developer
  accepted_proposal_id?: string
  name: string
  description: string
  repository: string
  repository_id?: number
  status: MissionStatus
  budget_min?: number
  budget_max?: number
  deadline?: string
  agreed_rate?: number
  platform_fee_percent: number
  total_cost?: number
  funded: boolean
  tags: string[]
  created_at: string
  updated_at: string
  proposal_count?: number
}

export interface Proposal {
  id: string
  mission_id: string
  mission?: Mission
  developer_id: string
  developer?: Developer
  proposed_rate: number
  estimated_days: number
  cover_letter: string
  portfolio_links?: string[]
  status: ProposalStatus
  created_at: string
  accepted_at?: string
}

export interface PullRequest {
  id: string
  mission_id: string
  pr_number: number
  repository: string
  title: string
  author_github_id: number
  state: 'open' | 'closed' | 'merged'
  is_from_fork: boolean
  created_at: string
  merged_at?: string
  additions: number
  deletions: number
  changed_files: number
  billable: boolean
  billed_amount?: number
  github_url: string
}

export interface Payment {
  id: string
  mission_id: string
  organization_id: string
  developer_id: string
  stripe_payment_intent_id: string
  amount: number
  developer_amount: number
  platform_fee: number
  status: PaymentStatus
  created_at: string
  released_at?: string
}

export interface Payout {
  id: string
  mission_id: string
  developer_id: string
  stripe_transfer_id: string
  amount: number
  status: 'pending' | 'paid' | 'failed'
  transferred_at?: string
  created_at: string
}

// Dashboard stats
export interface CompanyDashboardStats {
  active_missions: number
  pending_proposals: number
  total_spent: number
  completed_missions: number
}

export interface DeveloperDashboardStats {
  in_escrow: number
  pending_payout: number
  total_earned: number
  active_missions: number
  pending_proposals: number
}
