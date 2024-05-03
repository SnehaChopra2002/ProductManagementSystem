import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface SearchProductsProps {
  onSearch: (searchTerm: string) => void;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
    />
  );
};

export default SearchProducts;
