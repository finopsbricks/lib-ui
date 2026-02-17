# @fob/lib-ui

Shared UI component library for Fobrix applications (engine.fobrix.com, txn.fobrix.com).

## Installation

```bash
npm install github:cashflowy/lib-ui
```

## Usage

```jsx
// Import from main entry
import { Button, Dialog, cn } from '@fob/lib-ui';

// Or import specific components
import { Button } from '@fob/lib-ui/ui/button';
import { cn } from '@fob/lib-ui/lib/utils';
```

## Components

### UI Primitives (shadcn/ui based)
- Accordion, Alert, AlertDialog, Avatar, Badge
- Breadcrumb, Button, ButtonGroup, Calendar, Card
- Checkbox, Collapsible, Combobox, Command, Dialog
- DropdownMenu, Input, Label, Popover, Progress
- Resizable, Select, Separator, Sheet, Sidebar
- Skeleton, Slider, Sonner, Stack, Switch
- Table, Tabs, Textarea, Timeline, Toggle
- ToggleGroup, Tooltip, Typography

### Data Table
- DataTable (TanStack React Table wrapper)
- DateHeader

### Utilities
- `cn()` - Tailwind class merger

### Hooks
- `useIsMobile()` - Mobile breakpoint hook

## Requirements

This library requires:
- React 18+ or 19+
- Next.js 14+ or 15+
- Tailwind CSS 4+

Your app must have Tailwind configured with the same CSS variables used by shadcn/ui.

## Development

```bash
# Clone
git clone git@github.com:cashflowy/lib-ui.git

# Install dependencies
npm install
```
