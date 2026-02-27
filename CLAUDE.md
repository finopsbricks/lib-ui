# CLAUDE.md

Guidance for Claude Code when working with this package.

## Overview

`@fob/lib-ui` is a shared UI component library for FinOpsBricks applications. Built on shadcn/ui primitives with Tailwind CSS.

### Related Repositories

This package is part of the **FinOpsBricks** monorepo (`/Users/alex/ec2code/finopsbricks/`):

- **`apps/orchestrator.finopsbricks.com`** — Consumes this package for UI components.
- **`apps/txn.finopsbricks.com`** — Consumes this package for UI components.
- **`lib/lib-worker`** — Sibling library for worker infrastructure (no UI dependency).

## Components

### UI Primitives (shadcn/ui based)
- Accordion, Alert, AlertDialog, Avatar, Badge
- Breadcrumb, Button, ButtonGroup, Calendar, Card
- Checkbox, Collapsible, Combobox, Command, Dialog
- DropdownMenu, Input, Label, Popover, Progress
- Select, Separator, Sheet, Sidebar, Skeleton
- Slider, Sonner, Stack, Switch, Table, Tabs
- Textarea, Timeline, Toggle, ToggleGroup, Tooltip, Typography

### Data Table
- DataTable (TanStack React Table wrapper)
- DateHeader

### Utilities
- `cn()` - Tailwind class merger

### Hooks
- `useIsMobile()` - Mobile breakpoint hook

## Usage

```jsx
// Import from main entry
import { Button, Dialog, cn } from '@fob/lib-ui';

// Or import specific components
import { Button } from '@fob/lib-ui/primitives/button';
import { cn } from '@fob/lib-ui/lib/utils';
```

## Requirements

- React 18+ or 19+
- Next.js 14+ or 15+
- Tailwind CSS 4+

Consumer apps must have Tailwind configured with shadcn/ui CSS variables.

## Standards

- ES modules throughout (`"type": "module"`)
- Components use JSX extension (`.jsx`)
- Exports via package.json `exports` field
