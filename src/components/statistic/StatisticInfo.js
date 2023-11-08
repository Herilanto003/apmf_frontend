import * as React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { DialogActions, DialogContent, Dialog, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Anchor, CalendarMonth, DirectionsBoat, Email, EventNote, Groups, Note, PhoneAndroid, SupervisedUserCircle, Today } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const StatisticInfo = ({ open, handleClose, data }) => {

    console.log(data);

    return (
        
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                    >
                        <StackedLineChartIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Statistique avec toucher navire ID : 001
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            { 
                data === null ? (<Typography variant='h4' color={'error.main'} height={'100%'} textAlign={'center'}> ERREUR VENANT DU SERVEUR </Typography>) : (
                    <DialogContent>
                        <Box component={'div'} sx={styles.content}>
                            {/** information navire */}
                            <Box component={'div'} sx={styles.navContent}>
                                <Typography component={'h4'} variant='h4' className='info_title'>Details du navire</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <EventNote />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Nom du navire" secondary={data.nom_navire} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Note />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Immatricule du navire" secondary={data.immatricule_navire} />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DirectionsBoat />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Type du navire" secondary={data.type_navire} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Anchor />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Port de provenance du navire" secondary={data.id_port_prov} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Anchor />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Port de destination du navire" secondary={data.id_port_dest} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Today />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Date d'enregistrement" secondary={data.date_enreg} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CalendarMonth />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Date et Heure d'arrivé" secondary={data.date_heure_arrive} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CalendarMonth />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Date et Heure de départ" secondary={data.date_heure_depart} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <SupervisedUserCircle />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Nom Armateur" secondary={data.nom_armateur} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PhoneAndroid />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Contact Armateur" secondary={data.tel_armateur} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Email />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Adresse e-mail Armateur" secondary={data.email_armateur} />
                                    </ListItem>
                                </List>
                            </Box>

                            {/** information sur le port */}
                            <Box component={'div'}>
                                <Typography component={'h4'} variant='h4' className='info_title'>Details du port</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Anchor />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Nom du port qui accoste" secondary={data.id_port_accoste} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DirectionsBoat />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Type de desserte" secondary={data.type_desserte} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Groups />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Passagers debarqués" secondary={data.passage_debarque} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Groups />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Passagers embarqués" secondary={data.passage_embarque} />
                                    </ListItem>
                                </List>
                            </Box>

                            {/** information du consignataire */}
                            <Box component={'div'}>
                                <Typography component={'h4'} variant='h4' className='info_title'>Details du consignataire</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <SupervisedUserCircle />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Nom Consignataire" secondary={data.nom_cons} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PhoneAndroid />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Contact du consignateur" secondary={data.tel_cons} />
                                    </ListItem>
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Email />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} secondaryTypographyProps={{ color:'black' }} primary="Adresse e-mail du Consignataire" secondary={data.email_cons} />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </DialogContent>
                )
            }


            <DialogActions>
                <Button color='error' size='large' onClick={handleClose}>Fermer</Button>
            </DialogActions>
      </Dialog>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    content: {
        width: '80%',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 0,

        '& .info_title': {
            fontFamily: "'Dancing Script', cursive",
            color: 'info.dark'
        },
        margin: 'auto'
    },
    navContent: {
        gridRow: 'span 2',
    }
}

export default StatisticInfo;
