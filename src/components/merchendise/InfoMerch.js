import { ShoppingCart } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';
import Global from '../../config/global';

const InfoMerch = ({ open, handleClose, infoValues, idInfo }) => {
    const config = Global();
    const [portName, setPortName] = React.useState('');

    React.useEffect(() => {
        if(infoValues !== null){
            console.log(infoValues.id_port_march);
            axios.get(`/api/port/one/${infoValues.id_port_march}`, config)
                .then(response => {
                    console.log('por', response.data.nom_port);
                    setPortName(response.data.nom_port)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='lg'
        >
        
            <DialogTitle>Plus de detail sur le marchandise N° {idInfo}</DialogTitle>

            {
                infoValues !== null &&(
                    <DialogContent>
        
                        <Typography variant='h6' component={'h6'} > Detail du marchandise </Typography>
                        <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} width={'100%'} gap={2}>
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Nature du marchandise' secondary={infoValues.nature_marchandise} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Type du marchandise' secondary={infoValues.type_marchandise} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Conditionnement' secondary={infoValues.conditionnement} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Caractere' secondary={infoValues.caractere} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Nombre' secondary={infoValues.nombre} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Tonnage' secondary={infoValues.tonnage} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary={ infoValues.nom_operation === 'SORTIE' ? 'Port destination' : 'Port Provenance' } secondary={portName} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Nom operation' secondary={infoValues.nom_operation} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Type opération' secondary={infoValues.type_operation} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Observation' secondary={infoValues.observation_marchandise} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                        </Box>
        
                        <Typography>Detail de l' actionnaire</Typography>
                        <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} width={'100%'} gap={2}>
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Nom' secondary={infoValues.actionaire.nom_act} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Domicile' secondary={infoValues.actionaire.adresse_act} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Email' secondary={infoValues.actionaire.email_act} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Contact' secondary={infoValues.actionaire.tel_act} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                            
                            <List>
                                <ListItem>
                                    <ListItemIcon> <ShoppingCart /> </ListItemIcon>
                                    <ListItemText primary='Role' secondary={infoValues.actionaire.role} secondaryTypographyProps={{ color: 'black' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                </ListItem>
                            </List>
                        </Box>
        
                    </DialogContent>
                ) 
            }

            <DialogActions>
                <Button color='error' onClick={handleClose} >Fermer</Button>
            </DialogActions>

        </Dialog>
    );
}

export default InfoMerch;
