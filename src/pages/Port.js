import React from 'react';
import MyContainer from '../components/MyContainer';
import {
    Box, 
    Typography,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPort from '../components/port/AddPort';
import ListPort from '../components/port/ListPort';
import { Anchor } from '@mui/icons-material';
import { useMyRefresh } from '../context/refreshContext/Refresh';

const Port = () => {
    // refresh
    const { isRefresh, handleRefresh } = useMyRefresh();

    // Variable qui permet d'ouvrir ou de fermer le formulaire d'ajout d' un noveau port
    const [openAdd, setOpenAdd] = React.useState(false)

    return (
        <MyContainer>
            <Box>
                <AddPort handleRefresh={handleRefresh} open={openAdd} handleClose={() => setOpenAdd(false)} actionType={'SAVE'} />
                <Box component={'div'} sx={styles.portHeader}>
                    <Typography component={'h2'} variant='h4' sx={styles.portTitle} display={'flex'} alignItems={'center'}>
                        <Anchor fontSize='100px' />
                        PORTS
                    </Typography>
                </Box>

                {/** le bouton d'ajout nouveau port */}
                <Box component={'div'} marginY={2}>
                    <Button onClick={() => setOpenAdd(true)} startIcon={<AddIcon />} variant='contained' size='small'>Nouveau port</Button>
                </Box>

                {/** la listes des ports */}
                <Box>
                    <ListPort handleRefresh={handleRefresh} refresh={isRefresh}></ListPort>
                </Box>
            </Box>
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

export default Port;
