/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

const usePagination = (data: any[], itemsPerPage: number) => {
  const [page, setPage] = useState(1);
  const [currData, setCurrData] = useState<any[]>(data.slice(0, itemsPerPage));
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrData(data.slice(start, end));
  }, [page, itemsPerPage, data]);

  return { page, currData, totalPages, setPage };
};
export default usePagination;
