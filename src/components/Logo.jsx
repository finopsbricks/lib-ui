'use client';
import { Typography, cn } from '@fob/lib-ui';
import Link from "next/link";
import Image from "next/image";

export default function Logo({ offering = 'FOB', href = '/', className = '' }) {
  return (
    <div className={cn("inline-block rounded-lg", className)}>
      <Link href={href} className="no-underline border-none">
        <div className="flex flex-row items-center">
          <Image
            src="/logo.svg"
            alt="Cashflowy"
            className="border-2 border-black p-0.5 rounded w-8 h-8"
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