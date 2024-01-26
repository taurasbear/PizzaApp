import { useEffect } from 'react';
import './App.css';
import PizzaOrder from './Pages/PizzaOrder';
import PizzaOrderList from './Pages/PizzaOrderList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import PizzaTheme from './Styles/PizzaTheme.jsx';

function App() {
    useEffect(() => {

    }, []);

    return (
        <ThemeProvider theme={PizzaTheme}>
            <Router>
                <Routes>
                    <Route path="/orders" element={<PizzaOrderList />} />
                    <Route path="/" element={<PizzaOrder />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );


}

export default App;