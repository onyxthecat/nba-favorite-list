import React from 'react';
import { Button } from '../styles/global';
import { StyledPagination } from '../styles/pagination';

interface PaginationProps {
   onNext: () => void;
   onPrev: () => void;
}

const Pagination = ({ onNext, onPrev }: PaginationProps) => {
   return (
      <StyledPagination>
         <Button onClick={onPrev}>Prev</Button>
         <Button onClick={onNext}>Next</Button>
      </StyledPagination>
   );
};

export default Pagination;