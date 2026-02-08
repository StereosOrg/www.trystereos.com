// Utility functions for the marketplace

import type { MissionStatus } from './types/marketplace'

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Calculate platform fee based on rate and percentage
 */
export function calculatePlatformFee(rate: number, percent: number): number {
  return Math.round(rate * (percent / 100))
}

/**
 * Calculate total cost including platform fee
 */
export function calculateTotalCost(rate: number, percent: number): number {
  return rate + calculatePlatformFee(rate, percent)
}

/**
 * Get color class for mission status badge
 */
export function getMissionStatusColor(status: MissionStatus): string {
  switch (status) {
    case 'open':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    case 'disputed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

/**
 * Get readable label for mission status
 */
export function getMissionStatusLabel(status: MissionStatus): string {
  switch (status) {
    case 'open':
      return 'Open'
    case 'in_progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    case 'disputed':
      return 'Disputed'
    default:
      return status
  }
}

/**
 * Format a date string to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`
}

/**
 * Format a date for display (e.g., "Jan 15, 2026")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Check if a deadline is approaching (within 3 days)
 */
export function isDeadlineApproaching(deadlineString?: string): boolean {
  if (!deadlineString) return false

  const deadline = new Date(deadlineString)
  const now = new Date()
  const diffInDays = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return diffInDays >= 0 && diffInDays <= 3
}

/**
 * Check if a deadline has passed
 */
export function isDeadlinePassed(deadlineString?: string): boolean {
  if (!deadlineString) return false

  const deadline = new Date(deadlineString)
  const now = new Date()

  return deadline < now
}
