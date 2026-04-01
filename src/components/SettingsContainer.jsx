// @ts-check
'use client';

/**
 * Two-column layout container for settings pages
 * @param {Object} props
 * @param {React.ReactNode} props.columnOne - Left column content (navigation)
 * @param {React.ReactNode} props.columnTwo - Right column content (main content)
 * @returns {React.JSX.Element}
 */
export default function SettingsContainer({ columnOne, columnTwo }) {
    return (
        <div className="flex gap-4 pt-2">
            <div className="flex-shrink-0">
                {columnOne}
            </div>
            <div className="flex-1 max-w-4xl">
                {columnTwo}
            </div>
        </div>
    )
}
