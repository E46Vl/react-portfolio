import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface UseSearchOptions {
  debounceDelay?: number;
  initialValue?: string;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { debounceDelay = 300, initialValue = '' } = options;
  
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const debouncedSearch = useDebounce(searchQuery, { delay: debounceDelay });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchInputChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const hasSearchQuery = searchQuery.length > 0;
  const hasDebouncedQuery = debouncedSearch.length > 0;

  return {
    searchQuery,
    debouncedSearch,
    handleSearchChange,
    handleSearchInputChange,
    clearSearch,
    hasSearchQuery,
    hasDebouncedQuery,
  };
}; 