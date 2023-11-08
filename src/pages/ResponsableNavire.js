import React from 'react';
import MyContainer from '../components/MyContainer';
import { Box, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';
import ListResponsable from '../components/responsable/ListResponsable';

const ResponsableNavire = () => {
    return (
        <MyContainer>
            <Box>
                <Box component={'div'} sx={styles.portHeader}>
                    <Typography marginBottom={2} component={'h2'} variant='h4' sx={styles.portTitle} display={'flex'} alignItems={'center'}>
                        <Group fontSize='100px' />
                        RESPONSABLES DES NAVIRES
                    </Typography>
                </Box>

                {/** la listes des ports */}
                <Box>
                    <ListResponsable />
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

export default ResponsableNavire;
