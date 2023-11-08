import React from 'react';
import MyContainer from '../components/MyContainer';
import { Add, DirectionsBoat } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
} from '@mui/material'; 
import AddNavire from '../components/navires/AddNavire';
import ListNavire from '../components/navires/ListNavire';

const Navire = () => {

    // variable qui permet d'ouvrir et fermer le boite de dialogue de formulaire d'ajout
    const [openAdd, setOpenAdd] = React.useState(false);

    return (
        <MyContainer>
            <AddNavire 
                open={openAdd}
                handleClose={() => setOpenAdd(false)}
            />
            <Box component={'div'} sx={styles.portHeader}>
                <Typography component={'h2'} variant='h4' sx={styles.portTitle} display={'flex'} alignItems={'center'} gap={1}>
                    <DirectionsBoat fontSize='100px' />
                    NAVIRES
                </Typography>
                <Typography variant='body2'>
                    Vous pouvez ajouter des nouveaux navires ici en cliquant sur ce bouton 'nouveau navire'
                </Typography>
            </Box>

            {/** le bouton d'ajout nouveau port */}
            <Box component={'div'} marginY={2}>
                <Button onClick={() => setOpenAdd(true)} startIcon={<Add />} variant='contained' size='small'>Nouveau navire</Button>
            </Box>

            {/** liste des navires */}
            <ListNavire />
        </MyContainer>
    );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
    portHeader: {
        width: '100%',
        boxSizing: 'border-box'
    },
    portTitle: {
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 'bold'
    }
}

export default Navire;
