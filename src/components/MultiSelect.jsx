"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../primitives/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../primitives/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../primitives/popover"

function MultiSelect({
  name,
  defaultValue = "",
  options = [],
  placeholder = "Select items...",
  className,
  size = "default",
  ...props
}) {
  const initialSelected = React.useMemo(() => {
    if (typeof defaultValue === 'string') {
      return defaultValue ? defaultValue.split(',') : [];
    }
    return Array.isArray(defaultValue) ? defaultValue : [];
  }, [defaultValue]);

  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState(initialSelected)

  React.useEffect(() => {
    const newSelected = typeof defaultValue === 'string'
      ? (defaultValue ? defaultValue.split(',') : [])
      : (Array.isArray(defaultValue) ? defaultValue : []);
    setSelectedValues(newSelected);
  }, [defaultValue]);

  const toggleSelection = (optionValue) => {
    setSelectedValues(prev => {
      if (prev.includes(optionValue)) {
        return prev.filter(v => v !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const isGrouped = options.length > 0 && options[0]?.options;

  const flatOptions = React.useMemo(() => {
    if (isGrouped) {
      return options.flatMap(group => group.options || []);
    }
    return options;
  }, [options, isGrouped]);

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = flatOptions.find(opt => opt.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }
    return `${selectedValues.length} items selected`;
  };

  const sizeClasses = {
    sm: "h-8",
    default: "h-10"
  };

  return (
    <div className={cn("relative", className)}>
      {selectedValues.map(value => (
        <input
          key={value}
          type="hidden"
          name={name}
          value={value}
        />
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={getDisplayText()}
            className={cn(
              "w-full justify-between",
              sizeClasses[size] || sizeClasses.default,
              !selectedValues.length && "text-muted-foreground"
            )}
            {...props}
          >
            {getDisplayText()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              {isGrouped ? (
                options.map((group, groupIndex) => (
                  <CommandGroup key={groupIndex} heading={group.label} className="[&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-foreground">
                    {group.options?.map((option) => {
                      const isSelected = selectedValues.includes(option.value?.toString());
                      const truncated_description = option.description && option.description.length > 40
                        ? option.description.substring(0, 40) + '...'
                        : option.description;
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          keywords={[option.label, option.value, option.description].filter(Boolean)}
                          onSelect={() => toggleSelection(option.value?.toString())}
                        >
                          <Check
                            className={cn(
                              "mr-0 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span>{option.label}</span>
                            {truncated_description && (
                              <span className="text-xs text-muted-foreground truncate">
                                {truncated_description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ))
              ) : (
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value?.toString());
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        keywords={[option.label, option.value]}
                        onSelect={() => toggleSelection(option.value?.toString())}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { MultiSelect }
