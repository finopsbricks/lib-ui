'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '../primitives/button';
import { cn } from '../lib/utils';

/**
 * Previous / Next pager for a list paged on the server through the URL's
 * `page` param. Links keep every other search param (filters, sort).
 *
 * Give it either:
 * - `total` and `pageSize`: reads "Page x of y · N rows";
 * - `hasMore`, for queries that can't count: reads "Page x", and Next
 *   follows `hasMore`;
 * - `pageCount` (the original API): reads "Page x of y".
 *
 * The page comes from `page` (or the older `currentPage`), else the URL.
 * At either end the control is shown but isn't a link.
 *
 * @param {Object} props
 * @param {number} [props.page] - Current page, 1-based; defaults to the URL's `page`
 * @param {number} [props.currentPage] - Older name for `page`
 * @param {number} [props.total] - Total rows across all pages
 * @param {number} [props.pageSize] - Rows per page, with `total`
 * @param {boolean} [props.hasMore] - Whether a next page exists, when there's no `total`
 * @param {number} [props.pageCount] - Number of pages, when there's no `total`
 * @param {string} [props.className]
 * @returns {React.JSX.Element}
 */
export default function Pagination({ page: page_prop, currentPage, total, pageSize, hasMore, pageCount, className }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = page_prop || currentPage || parseInt(searchParams?.get('page') || '1', 10) || 1;

  let page_count = null;
  if (total != null && pageSize) page_count = Math.max(1, Math.ceil(total / pageSize));
  else if (pageCount != null) page_count = Math.max(1, pageCount);

  const has_previous = page > 1;
  const has_next = hasMore != null ? !!hasMore : page_count != null && page < page_count;

  const createPageURL = (page_number) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (page_number > 1) params.set('page', String(page_number));
    else params.delete('page');
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const control_class = buttonVariants({ variant: 'outline', size: 'sm' });
  const disabled_class = cn(control_class, 'pointer-events-none opacity-50');

  return (
    <nav aria-label="Pagination" className={cn('flex flex-wrap items-center justify-between gap-2 text-sm', className)}>
      <span aria-current="page" className="text-muted-foreground">
        Page {page}{page_count != null && ` of ${page_count}`}
        {total != null && ` · ${total.toLocaleString('en-US')} ${total === 1 ? 'row' : 'rows'}`}
      </span>
      <div className="flex gap-2">
        {has_previous ? (
          <Link href={createPageURL(page - 1)} className={control_class}>
            <ChevronLeft aria-hidden="true" />
            Previous
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled_class}>
            <ChevronLeft aria-hidden="true" />
            Previous
          </span>
        )}
        {has_next ? (
          <Link href={createPageURL(page + 1)} className={control_class}>
            Next
            <ChevronRight aria-hidden="true" />
          </Link>
        ) : (
          <span aria-disabled="true" className={disabled_class}>
            Next
            <ChevronRight aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
}
