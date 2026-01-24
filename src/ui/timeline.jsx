"use client"

import * as React from "react"
import { cn } from "../lib/utils"

/**
 * @typedef {Object} TimelineProps
 * @property {'left' | 'right' | 'alternate'} [position]
 */

/**
 * @param {TimelineProps & React.HTMLAttributes<HTMLDivElement>} props
 */
function Timeline({ className, position = "left", children, ...props }) {
  const childrenArray = React.Children.toArray(children);

  if (position === "alternate") {
    return (
      <div className={cn("relative", className)} {...props}>
        {/* Central timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-px" />

        <div className="space-y-8">
          {childrenArray.map((child, index) => (
            <div key={index} className="relative flex items-center min-h-[80px]">
              {/* Timeline dot positioned at center */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                {React.Children.toArray(child.props?.children || []).find((subChild) =>
                  subChild?.type?.displayName === 'TimelineSeparator'
                )}
              </div>

              {/* Content positioned on alternating sides */}
              <div className={cn(
                "w-1/2 flex items-center",
                index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8 ml-auto"
              )}>
                <div className="w-full max-w-sm">
                  {React.Children.toArray(child.props?.children || []).find((subChild) =>
                    subChild?.type?.displayName === 'TimelineContent'
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative space-y-6", className)} {...props}>
      {children}
    </div>
  )
}

/**
 * @typedef {Object} TimelineItemProps
 * @property {boolean} [isLast]
 * @property {boolean} [alternating]
 * @property {boolean} [isEven]
 */

/**
 * @param {TimelineItemProps & React.HTMLAttributes<HTMLDivElement>} props
 */
function TimelineItem({ className, isLast = false, alternating = false, isEven = true, children, ...props }) {
  return (
    <div className={cn("relative flex items-start gap-4", className)} {...props}>
      {children}
    </div>
  )
}

/**
 * @typedef {Object} TimelineSeparatorProps
 * @property {boolean} [isLast]
 */

/**
 * @param {TimelineSeparatorProps & React.HTMLAttributes<HTMLDivElement>} props
 */
function TimelineSeparator({ className, isLast = false, children, ...props }) {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {children}
    </div>
  )
}

TimelineSeparator.displayName = 'TimelineSeparator'

/**
 * @typedef {Object} TimelineDotProps
 * @property {'default' | 'success' | 'warning' | 'error'} [color]
 * @property {'filled' | 'outlined'} [variant]
 */

/**
 * @param {TimelineDotProps & React.HTMLAttributes<HTMLDivElement>} props
 */
function TimelineDot({
  className,
  color = "default",
  variant = "filled",
  children,
  ...props
}) {
  const colorClasses = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    error: "bg-red-500 text-white",
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
function TimelineConnector({ className, ...props }) {
  return (
    <div
      className={cn("w-0.5 h-6 bg-border mt-2", className)}
      {...props}
    />
  )
}

/**
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
function TimelineContent({ className, children, ...props }) {
  return (
    <div className={cn("flex-1 mt-1", className)} {...props}>
      {children}
    </div>
  )
}

TimelineContent.displayName = 'TimelineContent'

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
}
