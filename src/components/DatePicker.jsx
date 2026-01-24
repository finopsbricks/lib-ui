'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../primitives/button'
import { Calendar } from '../primitives/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../lib/utils'

const DatePicker = ({
  name,
  defaultValue,
  placeholder = 'Select a date',
  className,
  ...props
}) => {
  const [date, setDate] = useState(defaultValue && defaultValue !== '' ? new Date(defaultValue) : undefined)
  const [open, setOpen] = useState(false)

  // Update date when defaultValue changes (for reset functionality)
  useEffect(() => {
    if (defaultValue && defaultValue !== '') {
      setDate(new Date(defaultValue))
    } else {
      setDate(undefined)
    }
  }, [defaultValue])


  return (
    <>
      <input
        type="hidden"
        name={name}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between gap-2 text-left font-normal h-8 px-3 py-2 flex items-center bg-transparent border-input shadow-xs",
              !date && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
              <span
                className="truncate"
                title={date ? format(date, 'EEEE, MMMM do, yyyy') : undefined}
              >
                {date ? format(date, 'MMM d, yyyy') : placeholder}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                setOpen(false)
              }}
              initialFocus
            />
            {date && (
              <div className="border-t pt-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setDate(undefined)
                    setOpen(false)
                  }}
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear Date
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default DatePicker
