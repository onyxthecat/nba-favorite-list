import React from 'react';
import styled from 'styled-components';
import { Label } from '../styles/global';

interface ColorPickerProps {
   label: string;
   id: string;
   value: string;
   onChange: (color: string) => void;
}

const StyledColorPickerLabel = styled(Label)`
   margin-right: 8px;
`;

const ColorPicker: React.FC<ColorPickerProps> = ({ label, id, value, onChange }) => {

   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
   };

   return (
      <div>
         <StyledColorPickerLabel htmlFor={id}>{label}</StyledColorPickerLabel>
         <input
            type="color"
            id={id}
            value={value}
            onChange={handleColorChange}
         />
      </div>
   );
};

export default ColorPicker;