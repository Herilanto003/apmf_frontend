import axios from 'axios';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CardContainer = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get('/api/dash/second-data')
          .then(response => {
            setData(response.data)
          })
          .catch(error => {
            console.log(error);
          })
  }, []);


    return (
        <BarChart width={1000} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tonnage" fill="#2374AB" />
        </BarChart>
    );
}

export default CardContainer;
