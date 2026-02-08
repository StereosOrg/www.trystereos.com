// Mock data for development and testing

import type { Mission, Proposal, Developer, Organization, CompanyDashboardStats, DeveloperDashboardStats } from '@/lib/types/marketplace'

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    billing_email: 'billing@acme.com',
    github_org: 'acme',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'org-2',
    name: 'TechStart Inc',
    slug: 'techstart',
    billing_email: 'finance@techstart.io',
    github_org: 'techstart',
    created_at: '2024-02-20T14:30:00Z'
  }
]

export const mockDevelopers: Developer[] = [
  {
    id: 'dev-1',
    email: 'sarah@example.com',
    github_id: 12345,
    github_username: 'sarah-dev',
    github_avatar_url: 'https://avatars.githubusercontent.com/u/12345',
    stripe_account_id: 'acct_123',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2024-01-10T08:00:00Z'
  },
  {
    id: 'dev-2',
    email: 'alex@example.com',
    github_id: 67890,
    github_username: 'alex-builds',
    github_avatar_url: 'https://avatars.githubusercontent.com/u/67890',
    stripe_account_id: 'acct_456',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2024-01-12T09:30:00Z'
  },
  {
    id: 'dev-3',
    email: 'maria@example.com',
    github_id: 11111,
    github_username: 'maria-codes',
    github_avatar_url: 'https://avatars.githubusercontent.com/u/11111',
    stripe_account_id: 'acct_789',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2024-02-01T11:00:00Z'
  }
]

export const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    organization_id: 'org-1',
    organization: mockOrganizations[0],
    name: 'Add dark mode to mobile app',
    description: 'Implement a dark mode theme for our React Native mobile app. Should include:\n- Theme toggle in settings\n- Persistent theme preference\n- Support for all existing screens\n- Smooth transitions between themes',
    repository: 'acme/mobile-app',
    repository_id: 123456,
    status: 'open',
    budget_min: 500,
    budget_max: 1000,
    deadline: '2026-02-15',
    platform_fee_percent: 10,
    funded: false,
    tags: ['react-native', 'ui', 'mobile', 'theming'],
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-01-20T10:00:00Z',
    proposal_count: 5
  },
  {
    id: 'mission-2',
    organization_id: 'org-1',
    organization: mockOrganizations[0],
    assigned_developer_id: 'dev-1',
    assigned_developer: mockDevelopers[0],
    accepted_proposal_id: 'prop-3',
    name: 'Fix authentication bug',
    description: 'There\'s a bug where users are logged out after 5 minutes of inactivity. Should persist session for 24 hours.',
    repository: 'acme/web-app',
    status: 'in_progress',
    agreed_rate: 350,
    platform_fee_percent: 10,
    total_cost: 385,
    funded: true,
    tags: ['bug-fix', 'auth', 'typescript'],
    created_at: '2026-01-18T14:00:00Z',
    updated_at: '2026-01-22T09:30:00Z'
  },
  {
    id: 'mission-3',
    organization_id: 'org-2',
    organization: mockOrganizations[1],
    assigned_developer_id: 'dev-2',
    assigned_developer: mockDevelopers[1],
    name: 'Implement CSV export',
    description: 'Add CSV export functionality to the user dashboard for analytics data.',
    repository: 'techstart/analytics-dashboard',
    status: 'completed',
    agreed_rate: 600,
    platform_fee_percent: 10,
    total_cost: 660,
    funded: true,
    tags: ['feature', 'export', 'react'],
    created_at: '2026-01-10T11:00:00Z',
    updated_at: '2026-01-15T16:00:00Z'
  },
  {
    id: 'mission-4',
    organization_id: 'org-1',
    organization: mockOrganizations[0],
    name: 'Optimize database queries',
    description: 'Our dashboard is loading slowly. Need to optimize the main queries and add proper indexes.',
    repository: 'acme/backend-api',
    status: 'open',
    budget_min: 400,
    budget_max: 800,
    platform_fee_percent: 10,
    funded: false,
    tags: ['performance', 'database', 'postgresql'],
    created_at: '2026-01-22T15:00:00Z',
    updated_at: '2026-01-22T15:00:00Z',
    proposal_count: 3
  }
]

export const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    mission_id: 'mission-1',
    mission: mockMissions[0],
    developer_id: 'dev-1',
    developer: mockDevelopers[0],
    proposed_rate: 750,
    estimated_days: 3,
    cover_letter: 'I have 5 years of React Native experience and have implemented dark mode in several production apps. My approach would be to create a ThemeProvider context and use styled-components for dynamic theming. I can deliver this in 3 days with full testing coverage.',
    portfolio_links: ['https://github.com/sarah-dev/dark-mode-example'],
    status: 'pending',
    created_at: '2026-01-20T11:30:00Z'
  },
  {
    id: 'prop-2',
    mission_id: 'mission-1',
    developer_id: 'dev-2',
    developer: mockDevelopers[1],
    proposed_rate: 650,
    estimated_days: 4,
    cover_letter: 'I\'ve built dark mode for 3 mobile apps. I would use React Native\'s Appearance API and AsyncStorage for persistence. Timeline is 4 days including thorough testing.',
    portfolio_links: ['https://github.com/alex-builds/theme-switcher'],
    status: 'pending',
    created_at: '2026-01-20T13:00:00Z'
  },
  {
    id: 'prop-3',
    mission_id: 'mission-2',
    developer_id: 'dev-1',
    developer: mockDevelopers[0],
    proposed_rate: 350,
    estimated_days: 1,
    cover_letter: 'This looks like a straightforward session management issue. I\'ll update the JWT expiration and implement proper refresh token logic.',
    status: 'accepted',
    created_at: '2026-01-18T15:00:00Z',
    accepted_at: '2026-01-18T16:30:00Z'
  }
]

export const mockCompanyDashboardStats: CompanyDashboardStats = {
  active_missions: 2,
  pending_proposals: 8,
  total_spent: 1350,
  completed_missions: 3
}

export const mockDeveloperDashboardStats: DeveloperDashboardStats = {
  in_escrow: 350,
  pending_payout: 0,
  total_earned: 2450,
  active_missions: 1,
  pending_proposals: 2
}
