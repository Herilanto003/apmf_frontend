import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import AnchorIcon from '@mui/icons-material/Anchor';
import ResponsableNavire from '../pages/ResponsableNavire';
import { NavLink } from 'react-router-dom';
import { DirectionsBoat, Group, ListAlt, Logout, Map, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext/AuthContext';
import { useUser } from '../context/userContext/UserContext';

const drawerWidth = 200;

// liste des lien
const firstLinks = [
    {
        name: 'Dashboard',
        link: '/apmf/account/dashboard',
        icon: <DashboardIcon />
    },
    {
        name: 'Ports',
        link: '/apmf/account/port',
        icon: <AnchorIcon />
    },
    {
        name: 'Navires',
        link: '/apmf/account/navires',
        icon: <DirectionsBoat />
    },
    {
        name: 'Marchandise',
        link: '/apmf/account/merchendise',
        icon: <ShoppingCart />
    },
    {
        name: 'Statistic',
        link: '/apmf/account/statistic',
        icon: <LineAxisIcon />
    },
    {
        name: 'Responsables',
        link: '/apmf/account/responsable',
        icon: <Group />
    },
    {
        name: 'Utilisateurs',
        link: '/apmf/account/users',
        icon: <Group />
    },
    {
        name: 'Rapport',
        link: '/apmf/account/rapport',
        icon: <ListAlt />
    },
    {
        name: 'Locatisation des agents',
        link: '/apmf/account/localisation',
        icon: <Map />
    }
]



export default function MyContainer({ children }) {

    const {userLogin} = useUser();

    const { logoutUser } = useAuth();

  return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box>
                        <Typography variant="h6" noWrap component="div">
                            APMF (Agence Portuaire Maritime et Fleuvial)
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {/**firstLinks.map((data, index) => (
                            <NavLink key={index} to={data.link} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {data.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={data.name} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))*/}
                        {firstLinks.map((data, index) => {
                            if(userLogin.role === "UTILISATEUR")
                            {
                                if(data.name === 'Utilisateurs' || data.name === 'Rapport') return null
                                return (
                                    <NavLink key={index} to={data.link} style={{ textDecoration: 'none', color: 'black' }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {data.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={data.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                )
                            } else if (userLogin.role === "ADMIN") {
                                return (
                                    <NavLink key={index} to={data.link} style={{ textDecoration: 'none', color: 'black' }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {data.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={data.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                )
                            }
                        })}
                    </List>
                    <Divider />
                    <List>  
                        <ListItem disablePadding>
                            <ListItemButton onClick={logoutUser}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary='Deconnexion' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
  );
}