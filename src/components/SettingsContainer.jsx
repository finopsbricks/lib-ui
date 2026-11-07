// @ts-check
'use client';

/**
 * Layout container for settings pages: the settings navigation beside the content from `md` up,
 * stacked above it on phones.
 * @param {Object} props
 * @param {React.ReactNode} props.columnOne - Navigation (left column; on phones, the row above the content)
 * @param {React.ReactNode} props.columnTwo - Main content
 * @returns {React.JSX.Element}
 */
export default function SettingsContainer({ columnOne, columnTwo }) {
    return (
        <div className="flex flex-col gap-4 pt-2 md:flex-row">
            <div className="min-w-0 md:flex-shrink-0">
                {columnOne}
            </div>
            <div className="min-w-0 flex-1 max-w-4xl">
                {columnTwo}
            </div>
        </div>
    )
}
