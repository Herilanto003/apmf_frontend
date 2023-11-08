import { createTheme } from "@mui/material";

export const MyTheme = createTheme({
    palette: {
        // primary: "#090af8",
        // secondary: "#d50c23",
        // info: "#0ea224"
        primary: {
            main: '#090af8',
        },
        secondary: {
            main: '#d50c23'
        },
        info: {
            main: '#0ea224'
        },
        indigo: {
            main: '#512da8',
            light: '#7e57c2',
            dark: '#311b92'
        }
    },
    typography: {
        fontFamily: "'Noto Sans', sans-serif"
    }
})