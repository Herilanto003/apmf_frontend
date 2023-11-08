import { Box, Button, Typography } from '@mui/material';
import HomeLogo from '../assets/pictures/apmf.jpg'
import React from 'react';
import { Link } from 'react-router-dom';
import BgImage from '../assets/pictures/portback.jpg';
import { useAuth } from '../context/AuthContext/AuthContext';
import { AnchorOutlined } from '@mui/icons-material';
import {motion} from 'framer-motion';

export default function Home() {
    const { cookie } = useAuth();

    return (
        <Box 
            component={'div'}
            sx={{
                width: "100%",
                height: "100vh",
                position: "relative",
                boxSizing: "border-box",
                paddingTop: 4
            }}
        >  
            <motion.div 
                initial={{ y: -1000 }}
                animate={{ y: 0 }}
                transition={{
                    duration: '2'
                }}
                style={{
                    width: '5%',
                    height: '50vh',
                    position: 'fixed',
                    background: '#0000ff90',
                    top: '0px',
                    left: '0',
                }} 
            ></motion.div>
            <motion.div 
                style={{
                    width: '5%',
                    height: '50vh',
                    position: 'fixed',
                    background: '#0000ff90',
                    bottom: '0px',
                    right: '0',
                }} 
                initial={{ y: 1000 }}
                animate={{ y: 0 }}
                transition={{
                    duration: '2'
                }}
            ></motion.div>
            <motion.div 
                style={{
                    width: '30%',
                    height: '5vh',
                    position: 'fixed',
                    background: '#0000ff90',
                    top: '0px',
                    right: '0',
                }} 
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: '2',
                    delay: '1'
                }}
            ></motion.div>
            <motion.div 
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: '2',
                    delay: '1'
                }}
                style={{
                    width: '30%',
                    height: '5vh',
                    position: 'fixed',
                    background: '#0000ff90',
                    bottom: '0px',
                    left: '0',
                }} 
            ></motion.div>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center"
                }}  
                
            >
                <AnchorOutlined 
                    sx={{
                        fontSize: '100vh',
                        color: '#00000025'
                    }}
                />
            </Box>
            
            {/** le contenu de la page d'acceuil */}
            <Box 
                component={'div'}
                sx={{
                    width: "60%",
                    height: "100%",
                    zIndex: "12" ,
                    margin: "auto",
                    boxSizing: "border-box",
                }}
            >
                <img 
                    src={HomeLogo}
                    alt='logo apmf'
                    style={{ textAlign: "justify" }}
                />
                <Typography
                    variant='h3'
                    color={'#4400aa'}
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontFamily: "'Dancing Script', cursive",
                    }}
                >
                    APMF (Agence Portuaire Martime et Fleuvial)
                </Typography>

                <Typography
                    variant='h4'
                    sx={{
                        paddingTop: "40px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        textAlign: 'center'
                    }}
                >
                    STATISTIQUES PORTUAIRE
                </Typography>

                <Typography
                    variant='h5'
                    sx={{
                        paddingTop: "40px",
                        fontFamily: "'Dancing Script', cursive",
                        textAlign: 'center'
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nobis mollitia quis animi hic ipsam recusandae, incidunt quae amet fuga veritatis autem! Ipsa earum maiores reiciendis, incidunt fugiat tempora facere!
                </Typography>

                <Box
                    component={'div'}
                    sx={{
                        width: "40%",
                        height: "100px",
                        margin: "auto",
                        marginTop: "40px",
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        alignItems: "start"
                    }}
                >
                    {
                        cookie.user_token ? (
                            <Link to={'/apmf/account'}>
                                <Button variant='contained'>Voir le tableau de bord</Button> 
                            </Link>
                        ) : (
                            <React.Fragment>
                                <Link to={'/apmf/login'}>
                                    <Button variant='contained'>Se connecter</Button> 
                                </Link>     
                                <Link to={'/apmf/signup'}>
                                    <Button variant='contained'>Créer un compte</Button>    
                                </Link>   
                            </React.Fragment>
                        )
                    }                   
                </Box>
            </Box> 
        </Box>
    )
}
