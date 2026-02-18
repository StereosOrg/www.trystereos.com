import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  label: string
  status: "in-progress" | "complete" | "planned"
  className?: string
}

const statusStyles = {
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  "complete": "bg-[#88edc3]/20 text-[#2b2e3a] border-[#88edc3]/40",
  "planned": "bg-gray-50 text-[#718096] border-[#E2E8F0]",
}

export function StatusBadge({ label, status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "in-progress" && "bg-amber-500",
          status === "complete" && "bg-[#2b2e3a]",
          status === "planned" && "bg-[#718096]"
        )}
      />
      {label}
    </span>
  )
}
