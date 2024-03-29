import React, { useState, useEffect } from 'react';
import PizzaSizeSelection from '../Components/PizzaSizeSelection.jsx';
import ToppingsSelection from '../Components/ToppingsSelection.jsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from 'react-router-dom';
import '../Styles/PizzaOrder.css';

const PizzaOrder = () => {

    const navigate = useNavigate();

    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [selectedPizzaSize, setSelectedPizzaSize] = useState(null);

    const handleViewOrders = () => {
        navigate('/orders');
    }

    const handlePizzaSizeSelect = (size) => {
        setSelectedPizzaSize(size);
    }

    const handleToppingsSelect = (updatedToppings) => {
        setToppings(updatedToppings);
    }

    const handleRestartOrder = () => {
        window.location.reload();
    }

    const handleClearDatabase = async () => {
        try {
            const response = await fetch('./api/pizza/clearDatabase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Failed to clear database");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error clearing database:", error);
        }
    };

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

    const populatePizzaData = async () => {
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

    useEffect(() => {
        populatePizzaData();
    }, [])

    return (
        <div>
            <h2>Pizza Sizes</h2>
            {pizzaSizes.length === 0 ? <h3>Loading...</h3> : <PizzaSizeSelection onSelectSize={handlePizzaSizeSelect} pizzaSizes={pizzaSizes} />}
            <h2>Pizza Toppings</h2>
            {toppings.length === 0 ? <h3>Loading...</h3> : <ToppingsSelection onSelectToppings={handleToppingsSelect} initialToppings={toppings} />}

            <div className='orderButton'>
                <Button variant="contained" onClick={() => { handleSaveOrder() }}>
                    Save Order
                </Button>
                <Button variant="contained" onClick={() => { handleViewOrders() }}>
                    View Orders
                </Button>
                <IconButton aria-label="Restart order" onClick={() => { handleRestartOrder() }}>
                    <RestartAltIcon />
                </IconButton>
            </div>
            <p>Note: Base Pizza has Tomato sauce and Mozzarella cheese</p>
            <Button variant="contained" onClick={() => { handleClearDatabase() }}>
                Clear Database
            </Button>

        </div >
    );

};

export default PizzaOrder;

