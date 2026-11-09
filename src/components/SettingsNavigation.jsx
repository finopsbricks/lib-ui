// @ts-check
'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

/**
 * Settings navigation: a vertical list beside the content from `sm` (640px) up; on phones, a row of links
 * above the content that scrolls sideways when it doesn't fit, with the current page kept in view.
 * @param {Object} props
 * @param {{ o_id: string }} props.params - Route parameters
 * @param {Array<{ label: string, path: string }>} props.navItems - Navigation items
 * @returns {React.JSX.Element}
 */
export default function SettingsNavigation({ params, navItems }) {
    const { o_id } = params;
    const pathname = usePathname();
    const nav = useRef(/** @type {HTMLElement | null} */ (null));

    // On phones the links are one row that scrolls sideways: keep the current page in view, also
    // after the row changes width (a phone rotating, the window resizing).
    useEffect(() => {
        const row = nav.current?.firstElementChild;
        if (!(row instanceof HTMLElement) || typeof ResizeObserver === 'undefined') return;
        const showCurrent = () => {
            const current = row.querySelector('[aria-current="page"]');
            if (!(current instanceof HTMLElement)) return;
            const in_view = current.offsetLeft >= row.scrollLeft
                && current.offsetLeft + current.offsetWidth <= row.scrollLeft + row.clientWidth;
            if (!in_view) row.scrollLeft = current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2;
        };
        const observer = new ResizeObserver(showCurrent);
        observer.observe(row);
        return () => observer.disconnect();
    }, [pathname]);

    /**
     * Navigation item with active state highlighting
     * @param {Object} props
     * @param {React.ReactNode} props.children - Link text
     * @param {string} props.href - Link destination
     * @returns {React.JSX.Element}
     */
    const Item = ({ children, href }) => {
        const isMainSettings = href.endsWith('/settings');
        const isSelected = isMainSettings
            ? pathname === href
            : pathname === href || pathname === `${href}/create`;

        return (
            <Link
                href={href}
                aria-current={isSelected ? 'page' : undefined}
                className={cn(
                    'block shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900',
                    isSelected
                        ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-500 sm:border-b-0 sm:border-r-2'
                        : 'text-gray-600 hover:text-gray-900'
                )}
            >
                {children}
            </Link>
        )
    }

    return (
        <nav ref={nav} aria-label="Settings" className="overflow-hidden border border-gray-200 rounded-lg bg-white sm:w-48 sm:overflow-visible">
            <div className="relative flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-col sm:overflow-visible">
                {navItems.map((item) => (
                    <Item key={item.path} href={`/orgs/${o_id}/${item.path}`}>
                        {item.label}
                    </Item>
                ))}
            </div>
        </nav>
    )
}
