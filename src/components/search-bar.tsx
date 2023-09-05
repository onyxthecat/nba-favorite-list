import React from 'react';
import { StyledInput, StyledSearchBar } from '../styles/search-bar';

interface SearchBarProps {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
   return (
      <StyledSearchBar>
         <StyledInput
            type="text"
            placeholder="Search by name"
            onChange={onChange}
         />
      </StyledSearchBar>
   );
};

export default SearchBar;