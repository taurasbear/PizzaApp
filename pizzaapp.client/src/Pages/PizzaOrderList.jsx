import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../Components/OrderItem.jsx';

const PizzaOrderList = () => {

    const [pizzaOrders, setPizzaOrders] = useState([]);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        populateOrderData();
    }, []);

    const populateOrderData = async () => {
        try {
            const response = await fetch('./api/pizza/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const ordersData = await response.json();
            setPizzaOrders(ordersData);
        }
        catch (error) {
            console.error("Error trying to get order data:", error);
        }

    }


    return (
        <div>
            <h3>Orders</h3>
            <div className='order-list'>
                {pizzaOrders.map(order => (
                    <OrderItem key={order.id} pizzaOrder={order} />
                ))}
            </div>
            <Button aria-label="Go back" onClick={() => { handleGoBack() }}>
                Back
            </Button>
        </div>
    );
}

export default PizzaOrderList;