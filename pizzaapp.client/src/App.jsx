import { useEffect, useState } from 'react';
import './App.css';
import PizzaOrder from './Pages/PizzaOrder';
import PizzaOrderList from './Pages/PizzaOrderList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    useEffect(() => {

    }, []);



    return (
        <Router>
            <Routes>
                <Route path="/orders" element={<PizzaOrderList/>} />
                <Route path="/" element={<PizzaOrder/>} />
            </Routes>
        </Router>
    );


}

export default App;