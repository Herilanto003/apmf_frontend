import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const CardDash = ({ data }) => {

    const palette1 = [ '#00cc7a', '#3377ff', '#7e57c2', '#400080', '#8c1aff' ]

    return (
        <div>
        <PieChart
            series={[
            {
                data: data,
                arcLabel: (item) => item.value
            },
            ]}
            height={200}
            colors={palette1}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: '#fff',
                fontWeight: 'bold',
                textShadow: '40px 40px 40px black'
              },
              width: '100%'
            }}
        />
        </div>
    );
}

export default CardDash;
