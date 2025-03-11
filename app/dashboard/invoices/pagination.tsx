'use client';

import { generatePagination } from '@/app/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)} className="p-2">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
      )}

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-2">...</span>
        ) : (
          <Link
            key={index}
            href={createPageURL(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)} className="p-2">
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
