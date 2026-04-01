// @ts-check
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

/**
 * Settings navigation sidebar component
 * @param {Object} props
 * @param {{ o_id: string }} props.params - Route parameters
 * @param {Array<{ label: string, path: string }>} props.navItems - Navigation items
 * @returns {React.JSX.Element}
 */
export default function SettingsNavigation({ params, navItems }) {
    const { o_id } = params;
    const pathname = usePathname();

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
                className={cn(
                    'block px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900',
                    isSelected
                        ? 'bg-gray-100 text-gray-900 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900'
                )}
            >
                {children}
            </Link>
        )
    }

    return (
        <nav className="w-48 border border-gray-200 rounded-lg bg-white">
            <div className="flex flex-col">
                {navItems.map((item) => (
                    <Item key={item.path} href={`/orgs/${o_id}/${item.path}`}>
                        {item.label}
                    </Item>
                ))}
            </div>
        </nav>
    )
}
