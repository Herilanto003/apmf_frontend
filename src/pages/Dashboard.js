import React from 'react';
import MyContainer from '../components/MyContainer';
import { Box, Typography, Card } from '@mui/material';
import { Anchor, DashboardCustomize, RvHookup } from '@mui/icons-material';
import CardDash from '../components/dashboard/CardDash';
import CardContainer from '../components/dashboard/CardContainer';
import { useAuth } from '../context/AuthContext/AuthContext';
import axios from 'axios';

const Dashboard = () => {

    // React.useEffect(() => {
    //     axios.get('/api/user/all')
    //         .then(resp => {
    //             console.log(resp);
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    // }, [])

    const {isUserLogin} = useAuth()
    console.log(isUserLogin());

    /**
     * {
     *      title: 'port',
     *      data: [
     *          {label: 'dd', value: 400}    
     *          {label: 'dd', value: 400}    
     *          {label: 'dd', value: 400}    
     *      ]
     * }
     * 
     * 
     */

    // montage
    const [firstData, setFirstData] = React.useState([])
    React.useEffect(() => {
        axios.get('/api/dash/first-data')
                .then(response => {
                    console.log(response.data);
                    setFirstData(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])

    return (
        <MyContainer>
            <Box component={'div'} sx={styles.portHeader}>
                <Typography component={'h2'} variant='h4' sx={styles.portTitle} display={'flex'} alignItems={'center'} gap={1} color={'primary.dark'}>
                    <DashboardCustomize fontSize='100px' />
                    DASHBOARD
                </Typography>
            </Box>

            {/** les premiers card cabotage nationale, internationnale, bornage */}
            <Typography variant='h6' marginTop={1} borderBottom={'1px solid black'} display={'flex'} alignItems={'center'}> <Anchor /> Total des cabotages, bornage</Typography>
            <Box  marginY={2} display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} gap={4}>
                {
                    firstData.map(elem => (
                        <Card elevation={8} square sx={{ height: 'auto' }}>
                            <Typography variant='body1'  paddingLeft={1} paddingTop={1} textTransform={'uppercase'} > { elem.portName } </Typography>
                            <CardDash data={elem.data} />
                        </Card>
                    ))
                }
            </Box>

            {/** trafic des conteurs */}
            <Typography variant='h6' marginTop={1} borderBottom={'1px solid black'} display={'flex'} alignItems={'center'}> <RvHookup /> Trafic des contenaires</Typography>
            <Box width={'100%'} height={'300px'} paddingTop={2} position={'relative'} display={'flex'} justifyContent={'center'}>
                <CardContainer />
            </Box>
        </MyContainer>
    );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
    portHeader: {
        width: '100%',
        boxSizing: 'border-box',
    },
    portTitle: {
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 'bold'
    }
}

export default Dashboard;
