import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import '../Styles/ToppingItem.css'

const ToppingItem = ({ name, count, onAdd, onRemove }) => {
    return (
        <div>
            <span>{name}</span>
            <IconButton className='iconButton' aria-label={`Remove ${name}`} onClick={onRemove}>
                <RemoveIcon />
            </IconButton>
            <span>{count}</span>
            <IconButton className='iconButton' aria-label={`Add ${name}`} onClick={onAdd}>
                <AddIcon />
            </IconButton>
        </div>
    );
}

export default ToppingItem;
