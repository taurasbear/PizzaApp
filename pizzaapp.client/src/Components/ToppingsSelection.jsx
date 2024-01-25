import React, { useState } from 'react';
import ToppingItem from './ToppingItem';

const ToppingsSelection = ({ onSelectToppings, initialToppings }) => {
    //await initialToppings
    const [toppings, setToppings] = useState(initialToppings);
    
    const handleAddTopping = (index) => {
        const updatedToppings = [...toppings];
        if (updatedToppings[index].count < 4) {
            updatedToppings[index].count += 1;
            setToppings(updatedToppings);
            onSelectToppings(updatedToppings);
        }
    }

    const handleRemoveTopping = (index) => {
        const updatedToppings = [...toppings];
        if (updatedToppings[index].count > 0) {
            updatedToppings[index].count -= 1;
            setToppings(updatedToppings);
            onSelectToppings(updatedToppings);
        }
    }

    return (
        <div>
            {toppings.map((topping, index) => (
                <ToppingItem
                    key={topping.id}
                    name={topping.name}
                    count={topping.count}
                    onAdd={() => { handleAddTopping(index) }}
                    onRemove={() => { handleRemoveTopping(index) }}
                />
            ))}
        </div>
    );
}

export default ToppingsSelection;