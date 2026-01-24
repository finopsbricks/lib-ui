'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../primitives/dialog";
import { Button } from '../primitives/button';
import { FileText, FileSpreadsheet, FileJson } from 'lucide-react';

export default function ExportConfirmDialog({
  open,
  onClose,
  onConfirm,
  format,
  current_view_count,
  total_count,
  loading
}) {
  const getFormatIcon = (format_type) => {
    switch(format_type) {
      case 'csv': return <FileText className="h-4 w-4" />;
      case 'xlsx': return <FileSpreadsheet className="h-4 w-4" />;
      case 'json': return <FileJson className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatName = {
    csv: 'CSV',
    xlsx: 'Excel',
    json: 'JSON'
  }[format] || 'CSV';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFormatIcon(format)}
            Export as {formatName}
          </DialogTitle>
          <DialogDescription>
            Choose which transactions to export
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4"
            onClick={() => onConfirm('current')}
            disabled={loading}
          >
            <div className="text-left">
              <div className="font-medium">Current Page ({current_view_count} transactions)</div>
              <div className="text-sm text-muted-foreground">Export only the currently displayed transactions</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4"
            onClick={() => onConfirm('all')}
            disabled={loading}
          >
            <div className="text-left">
              <div className="font-medium">All Filtered Transactions ({total_count} transactions)</div>
              <div className="text-sm text-muted-foreground">Export all transactions matching current filters</div>
            </div>
          </Button>
        </div>

        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
