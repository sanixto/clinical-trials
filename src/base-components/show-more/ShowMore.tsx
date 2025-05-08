"use client";

import { useMemo, useState } from "react";

interface ShowMoreProps {
  children: React.ReactNode[];
  numberOfLessItems?: number;
}

export default function ShowMore({
  children,
  numberOfLessItems = 3,
}: ShowMoreProps) {
  const [showMore, setShowMore] = useState(false);

  const lessVisibleItems = useMemo(
    () => children.slice(0, numberOfLessItems),
    [children, numberOfLessItems]
  );

  const visibleItems = showMore ? children : lessVisibleItems;

  return (
    <>
      {visibleItems}
      {children.length > numberOfLessItems && (
        <button
          className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore
            ? "show less"
            : `show ${children.length - numberOfLessItems} more`}
        </button>
      )}
    </>
  );
}
