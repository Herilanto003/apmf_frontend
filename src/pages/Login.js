import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import LoginBackground from '../assets/pictures/login.jpg';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext/AuthContext";
import axios from 'axios';
import { HEADER_CONFIG_WITHOUT_TOKEN } from "../config/global";
import { useMyRefresh } from '../context/refreshContext/Refresh';

export default function Login() {
    // authentification
    const { loginUser, token, isUserLogin } = useAuth();
    const { handleRefresh } = useMyRefresh();

    console.log('====================================');
    console.log("isuserlogin", isUserLogin());
    console.log('====================================');

    // debut de configuration de formik ***********************************************************

    const initialValue = {
        username: "",
        password: ""
    }
    const validationSchema = yup.object({
        username: yup.string().required('L\'adresse email est obligatoire').email('Veuillez entrer un adresse email valide'),
        password: yup.string('Le mot de passe est obligatoire')
    })

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        
        onSubmit: (values) => {
            console.log('values', values);
            const data = {grant_type: '',username: `${values.username}`,password:`${values.password}`,scope: '', client_id: '', client_secret:''}
            console.log(data);
            axios.post('/api/token', data, HEADER_CONFIG_WITHOUT_TOKEN)
                .then(resp => {
                    console.log(resp);
                    handleRefresh()
                    loginUser(resp.data)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    })

    // fin de configuration de formik *************************************************************

    console.log('====================================');
    console.log(token);
    console.log('====================================');

    // variable qui permet de voir le mot de passe
    const [showPass, setShowPass] = React.useState(false);

    // fonction qui permet de changer la visibilité du mot de passe
    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    return (
        // conteneur principale de la page login
        <Box
            component={'div'} 
            sx={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                height: "100vh",
            }}
        >
            {/* div qui contient l'image */}
            <Box
                component={'div'}
                sx={{
                    width: "35%",
                    position: "relative",
                }}
            >
                <Box
                    component={"div"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "#00000050",
                        zIndex: "10",
                        color: "#ffffff",
                        display: "flex",
                        textAlign: "center",
                        flexDirection: "column",
                        gap: 1,
                        padding: "0 20px",
                        boxSizing: "border-box",
                        justifyContent: "center"
                    }}
                >
                    <Typography 
                        variant="h2"
                        sx={{
                            fontWeight: "semi-bold",
                            fontFamily: "'Dancing Script', cursive",
                        }}
                    >APMF</Typography>
                    <Typography variant="body2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum repellendus enim itaque quo optio repudiandae, placeat, ducimus sint, neque nesciunt dignissimos aliquid inventore obcaecati beatae omnis consectetur! Aut, cupiditate error?
                    </Typography>
                </Box>
                <Box
                    component={"div"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundImage: `url(${LoginBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        zIndex: "9"
                    }}
                >
                </Box>
            </Box>
            
            {/* div qui contient le formulaire */}
            <Box
                component={'div'}
                sx={{
                    width: "65%",
                    position: "relative",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box 
                    component={'div'}
                    sx={{
                        width: '80%',
                        height: '60vh',
                        display: "flex",
                        flexDirection: 'column',
                        textAlign: 'justify',
                        justifyContent: "space-between"
                    }}
                >
                    {/** titre de la page login */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontStyle: "italic",
                            fontWeight: "bold",
                            fontFamily: "'Dancing Script', cursive",
                        }}
                    >
                        Se connecter
                    </Typography>

                    <Link to={'/apmf'}>
                        Retour à l'acceuil
                    </Link>

                    <Typography
                        variant="body1"
                    >
                        Bienvenue, <br />
                        Veuillez vous identifier s' il vous plait                    
                    </Typography>

                    <Box
                        component={'div'}
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            gap: 1
                        }}
                    >
                        <Typography>N'avez-vous de compte ? </Typography> <Divider orientation="vertical" />
                        <Link to={'/apmf/signup'}>S'inscrire</Link>
                    </Box>
                    <Divider />
                    
                    {/* formulaire de login */}
                    <form>
                        <Box
                            component={"div"}
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                alignItems: "flex-end"
                            }}
                        >
                            {/** les input de login */}
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "start",
                                    gap: 2
                                }}
                            >
                                <TextField 
                                    label="Adresse e-mail"
                                    variant="outlined"
                                    size="small"
                                    type="email"
                                    sx={{
                                        width: "100%",
                                    }}
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                                <TextField 
                                    label="Mot de passe"
                                    variant="outlined"
                                    size="small"
                                    name="password"
                                    type={ showPass ? "text" : "password" }
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleShowPass}
                                                >
                                                    { showPass ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            </Box>

                            {/** le bouton pour se connecter  */}
                            <Button variant="contained" onClick={formik.handleSubmit}>connexion</Button>
                        </Box>
                    </form>
                    

                </Box>
            </Box>
        </Box>
    )
}
