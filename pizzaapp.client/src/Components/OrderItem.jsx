import React, { useEffect, useState } from 'react';
import standardPizza from '../Images/standardPizza.png';

const OrderItem = ({ pizzaOrder }) => {
    const { id, size, price } = pizzaOrder;

    const [toppings, setToppings] = useState([]);
    useEffect(() => {
        populateToppingsData()
    }, [])

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
    console.log("Pizza Order:", pizzaOrder);
    console.log("id:", id);
    console.log("size:", size);
    console.log("toppings:", toppings);
    console.log("price:", price);
    return (
        <div className='order-item'>
            <div className='pizza-image'>
                <img source={standardPizza} alt='Standard Pizza' />
            </div>
            <div className='pizza-details'>
                <div className='size-name'>
                    <h4>{size.name}</h4>
                </div>
                <div className='toppings'>
                    {toppings.length === 0 ? <p>Loading...</p> : <p>{toppings.map(topping => topping.name).join(', ')}</p>}
                </div>
                <div className='price'>
                    <p>${price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;