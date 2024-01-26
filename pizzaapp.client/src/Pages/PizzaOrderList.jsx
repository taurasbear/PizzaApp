import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../Components/OrderItem.jsx';
import '../Styles/PizzaOrderList.css';

const PizzaOrderList = () => {

    const [pizzaOrders, setPizzaOrders] = useState([]);
    const [totalCost, setTotalCost] = useState(null);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

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

    const populateTotalCostData = async () => {
        try {
            const response = await fetch('./api/pizza/total');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const totalCostData = await response.json();
            setTotalCost(totalCostData);
        }
        catch (error) {
            console.error("Error trying to get total cost data:", error);
        }
    }

    useEffect(() => {
        populateOrderData();
        populateTotalCostData();
    }, []);

    return (
        <div>
            <h3>Orders</h3>
            <div className='order-list'>
                {pizzaOrders.map(order => (
                    <OrderItem key={order.id} pizzaOrder={order} />
                ))}
            </div>
            <div className='total-cost'>
                {totalCost === null ? <p>Loading...</p> : <p>Total: ${totalCost.toFixed(2)}</p>}
            </div>
            <Button aria-label="Go back" onClick={() => { handleGoBack() }}>
                Back
            </Button>
            <Button className='orderButton' variant='contained' aria-label="Order" >
                Order
            </Button>
        </div>
    );
}

export default PizzaOrderList;