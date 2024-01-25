import React, { useState, useEffect } from 'react';
import PizzaSizeSelection from '../Components/PizzaSizeSelection.jsx';
import ToppingsSelection from '../Components/ToppingsSelection.jsx';

const PizzaOrder = () => {
    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [selectedPizzaSize, setSelectedPizzaSize] = useState(null);

    const handlePizzaSizeSelect = (size) => {
        setSelectedPizzaSize(size);
    }

    const handleToppingsSelect = (updatedToppings) => {
        setToppings(updatedToppings);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pizzaSizesResponse = await fetch('./api/pizza/sizes');
                const toppingsResponse = await fetch('./api/pizza/toppings');

                if (!pizzaSizesResponse.ok || !toppingsResponse.ok) {
                    throw new Error("Failed to fetch Pizza data");
                }

                const pizzaSizesData = await pizzaSizesResponse.json();
                const toppingsData = await toppingsResponse.json();

                setPizzaSizes(pizzaSizesData);
                setToppings(toppingsData);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [])
    return (
        <div>
            <h2>Pizza Sizes</h2>
            <PizzaSizeSelection onSelectSize={handlePizzaSizeSelect} pizzaSizes={pizzaSizes} />
            <h2>Pizza Toppings</h2>
            {toppings.length === 0 ? <h1>Loading...</h1> : <ToppingsSelection onSelectToppings={handleToppingsSelect} initialToppings={toppings} />}

        </div>
    );
};

export default PizzaOrder;

