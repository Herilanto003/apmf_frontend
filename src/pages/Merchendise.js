import React from 'react';
import MyContainer from '../components/MyContainer';
import { 
    Box,
    Typography,
    Button,
    Tab,
    Tabs
} from '@mui/material';
import { Add, ShoppingCartCheckout } from '@mui/icons-material';
import AddMerch from '../components/merchendise/AddMerch';
import ListMerch from '../components/merchendise/ListMerch';
import PropTypes from 'prop-types';
import ListAct from '../components/merchendise/ListAct';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Merchendise = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // variable qui permet d'ouvrir et fermer le modal d'ajout
    const [openAdd, setOpenAdd] = React.useState(false)

    return (
        <MyContainer>
            <AddMerch 
                open={openAdd}
                handleClose={() => setOpenAdd(false)}
            />
            <Box component={'div'} sx={styles.merchHeader}>
                <Typography component={'h2'} variant='h4' sx={styles.merchTitle} display={'flex'} alignItems={'center'} gap={1}>
                    <ShoppingCartCheckout fontSize='100px' />
                    MARCHANDISES
                </Typography>
            </Box>

            {/** le bouton d'ajout nouveau marchandise */}
            <Box component={'div'} marginY={2}>
                <Button startIcon={<Add />} variant='contained' size='small' onClick={() => setOpenAdd(true)}>Nouveau marchandise</Button>
            </Box>

            {/** liste de marchandise et actionaire */}
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Marchandises" {...a11yProps(0)} />
                <Tab label="Actionaires" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <ListMerch />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ListAct />
            </CustomTabPanel>
        </MyContainer>
    );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
    merchHeader: {
        width: '100%',
        boxSizing: 'border-box'
    },
    merchTitle: {
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 'bold'
    }
}

export default Merchendise;
