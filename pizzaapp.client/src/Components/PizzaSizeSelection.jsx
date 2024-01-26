import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const PizzaSizeSelection = ({ onSelectSize, pizzaSizes }) => {

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeChange = (event, newSize) => {
        setSelectedSize(newSize);
        onSelectSize(newSize);
    }

    return (
        <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            arial-label="pizza size"
        >
            {pizzaSizes.map((size) => (
                <ToggleButton key={size.id} value={size} aria-label={size.name}>
                    {size.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default PizzaSizeSelection;