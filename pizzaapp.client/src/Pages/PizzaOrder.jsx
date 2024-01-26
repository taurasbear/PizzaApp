import React, { useState, useEffect } from 'react';
import PizzaSizeSelection from '../Components/PizzaSizeSelection.jsx';
import ToppingsSelection from '../Components/ToppingsSelection.jsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
    const handleRestartOrder = () => {
        window.location.reload();
    }
    const handleSaveOrder = async () => {
        try {
            const orderData = {
                size: selectedPizzaSize,
                toppings: toppings
            };

            const response = await fetch('./api/pizza/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            handleRestartOrder();
            if (!response.ok) {
                throw new Error("Failed to save order");
            }
        }
        catch (error) {
            console.error("Error saving order:", error);
        }
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
            {pizzaSizes.length === 0 ? <h3>Loading...</h3> : <PizzaSizeSelection onSelectSize={handlePizzaSizeSelect} pizzaSizes={pizzaSizes} />}
            <h2>Pizza Toppings</h2>
            {toppings.length === 0 ? <h3>Loading...</h3> : <ToppingsSelection onSelectToppings={handleToppingsSelect} initialToppings={toppings} />}
            <Button variant="contained" onClick={() => { handleSaveOrder() }}>
                Save Order
            </Button>
            <IconButton aria-label="Restart order" onClick={() => { handleRestartOrder() }}>
                <RestartAltIcon />
            </IconButton>
        </div >
    );
};

export default PizzaOrder;

