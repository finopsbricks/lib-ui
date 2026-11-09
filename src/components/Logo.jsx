'use client';
import { Typography } from '../primitives/typography';
import { cn } from '../lib/utils';
import Link from "next/link";
import Image from "next/image";

/**
 * The app's logo and name, linking home. Beside the name the image is decorative (the
 * name labels the link); alone, its alt is "Home".
 * @param {object} props
 * @param {string} [props.offering] - Name shown beside the logo; '' shows the logo alone.
 * @param {string} [props.href]
 * @param {string} [props.className]
 * @param {string} [props.src] - Logo image path, from the app's public folder.
 * @param {boolean} [props.bare] - Drop the black frame (border and padding), for a logo that is its own tile.
 */
export default function Logo({ offering = 'FOB', href = '/', className = '', src = '/logo.svg', bare = false }) {
  return (
    <div className={cn("inline-block rounded-lg", className)}>
      <Link href={href} className="no-underline border-none">
        <div className="flex flex-row items-center">
          <Image
            src={src}
            alt={offering === '' ? 'Home' : ''}
            className={bare ? "w-8 h-8" : "border-2 border-black p-0.5 rounded w-8 h-8"}
            width={32}
            height={32}
          />
          {offering !== '' && (
            <Typography variant="h3" className="px-2">
              {offering}
            </Typography>
          )}
        </div>
      </Link>
    </div>
  )
}
