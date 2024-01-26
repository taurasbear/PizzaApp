import React, { useEffect, useState } from 'react';
import standardPizza from '../Images/standardPizza.png';
import '../Styles/OrderItem.css';

const OrderItem = ({ pizzaOrder }) => {
    const { id, size, price } = pizzaOrder;

    const [toppings, setToppings] = useState([]);

    const populateToppingsData = async () => {

        try {
            const response = await fetch(`./api/pizza/toppings/${id}`)
            if (!response.ok) {
                throw new Error(`Error fetching Pizza Order ${id} toppings`);
            }
            const toppingsData = await response.json();
            setToppings(toppingsData);
        }
        catch (error) {
            console.error('Error populating Topping Data', error);
        }

    }

    useEffect(() => {
        populateToppingsData()
    }, [])

    return (
        <div className='order-item'>
            <div className='pizza-image'>
                <img src={standardPizza} alt='Standard Pizza' />
            </div>
            <div className='pizza-details'>
                <div className='size-name'>
                    <h4>{size}</h4>
                </div>
                <div className='toppings'>
                    {toppings.length === 0 ? <p>No toppings</p> : <p>{toppings.map(topping => `${topping.count} x ${topping.name}`).join(', ')}</p>}
                </div>
            </div>
            <div className='price'>
                <p>${price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default OrderItem;