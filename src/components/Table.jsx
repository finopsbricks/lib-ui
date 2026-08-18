// @ts-check
'use client'
import React from 'react';
import { Table as ShadcnTable } from '../primitives/table';
import { cn } from '../lib/utils';

/**
 * Custom defined table component with scrollable and responsive features
 * @param {Object} props
 * @param {string} [props.type='topHeader'] - Table header type ('topHeader' or 'sideHeader')
 * @param {any} [props.borderAxis] - Border axis configuration
 * @param {React.ReactNode} props.children - Table content
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Table size
 * @param {'soft' | 'outlined' | 'plain'} [props.variant='soft'] - Table visual variant
 * @param {string} [props.className] - Optional additional CSS classes for the table
 * @param {string} [props.containerClassName] - Optional classes for the scroll
 *   container. Bound its height (e.g. `flex-1 min-h-0` inside a flex column) to
 *   make the table scroll within itself rather than with the page — which is what
 *   a `sticky` header needs in order to stick to anything.
 * @param {boolean} [props.hoverRow] - Enable hover effect on rows
 * @returns {React.JSX.Element}
 */
export default function Table({ type = 'topHeader', borderAxis, children, size = 'sm', variant = 'soft', className, containerClassName, hoverRow, ...props }) {
	// Map size prop to appropriate padding, text size, and height
	// sm: Google Sheets-like compact (22px height)
	// md: Medium size
	// lg: ShadCN default (48px height)
	const sizeClasses = {
		'sm': '[&_td]:py-1 [&_th]:py-1 [&_td]:px-3 [&_th]:px-3 [&_td]:text-xs [&_th]:text-xs [&_td]:leading-tight [&_th]:leading-tight [&_th]:h-6',
		'md': '[&_td]:py-2 [&_th]:py-2 [&_td]:px-3 [&_th]:px-3 [&_td]:text-sm [&_th]:text-sm [&_th]:h-9',
		'lg': 'text-base'
	};

	// Map variant to appropriate background classes
	const variantClasses = {
		'soft': 'bg-gray-50/50',
		'outlined': 'bg-white',
		'plain': 'bg-transparent'
	};

	// Apply type-specific styles
	const typeClasses = type === 'sideHeader'
		? '[&_tr>*:first-child]:bg-gray-50 [&_tr>*:first-child]:font-light'
		: '';

	// Apply hover row styles if enabled
	const hoverRowClasses = hoverRow
		? '[&_tbody_tr]:hover:bg-muted/50 [&_tbody_tr]:cursor-pointer'
		: '';

	return (
		<div className={cn('w-full overflow-auto rounded-md border', containerClassName)}>
			<ShadcnTable
				className={cn(
					'bg-white',
					sizeClasses[size] || sizeClasses.sm,
					variantClasses[variant] || variantClasses.soft,
					typeClasses,
					hoverRowClasses,
					className
				)}
				{...props}
			>
				{children}
			</ShadcnTable>
		</div>
	)
}
