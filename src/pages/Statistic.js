import React from 'react';
import MyContainer from '../components/MyContainer';
import { 
    Box, 
    Button, 
    Typography 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import StatisticList from '../components/statistic/StatisticList';
import { LineAxis } from '@mui/icons-material';

const Statistic = () => {

    return (
        <MyContainer>
            <Box component={'div'} sx={styles.statisticHeader}>
                <Typography component={'h2'} variant='h4' sx={styles.statisticTitle} display={'flex'} alignItems={'center'}>
                    <LineAxis fontSize='100px' />
                    STATISTIQUES PORTUAIRES
                </Typography>
            </Box>

            {/** le bouton d'ajout nouveau statistique */}
            <Box component={'div'} marginY={2}>
                <Link to={'/apmf/account/statistic/add-new'}>
                    <Button startIcon={<AddIcon />} variant='contained' size='small'>Nouveau statistique</Button>
                </Link>
            </Box>

            {/** listes des statistics enregistrés */}
            <Box component={"div"}>
                <StatisticList />
            </Box>
        </MyContainer>
    );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
    statisticHeader: {
        width: '100%',
        boxSizing: 'border-box'
    },
    statisticTitle: {
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 'bold'
    }
}

export default Statistic;
