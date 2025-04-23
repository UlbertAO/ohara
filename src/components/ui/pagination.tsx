import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../../lib/utils";
import { ButtonProps, buttonVariants } from "../../components/ui/button";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage: number, endPage: number;

    if (totalPages <= maxPagesToShow) {
      // Show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // We need to determine which pages to show
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Current page near the start
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Current page near the end
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        // Current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key={1} onClick={() => onPageChange(1)}>
          1
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    // Add page numbers
    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <PaginationItem
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationItem>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      pageNumbers.push(
        <PaginationItem
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <nav className="flex items-center space-x-1">
        <PaginationItem
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="hidden sm:inline-flex"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="hidden sm:inline-flex"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </PaginationItem>
      </nav>
    </div>
  );
};

const PaginationItem = ({
  isActive,
  className,
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps & {
  isActive?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
        }),
        "h-9 w-9 p-0",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const PaginationEllipsis = () => {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "h-9 w-9 p-0 flex items-center justify-center pointer-events-none"
      )}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </div>
  );
};

export { Pagination, PaginationItem };
