import { createTheme } from '@mui/material/styles';

const PizzaTheme = createTheme({
    palette: {
        primary: {
            main: '#36a9e0',
        },
        secondary: {
            main: '#f5f5f5',
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default PizzaTheme;
