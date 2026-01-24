import { cn } from "../lib/utils"

/**
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
