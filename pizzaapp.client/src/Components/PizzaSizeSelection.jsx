import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const PizzaSizeSelection = ({ onSelectSize, pizzaSizes}) => {

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
            <ToggleButton value="S" arial-label="small">
                Small
            </ToggleButton>
            <ToggleButton value="M" arial-label="medium">
                Medium
            </ToggleButton>
            <ToggleButton value="L" arial-label="large">
                Large
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default PizzaSizeSelection;