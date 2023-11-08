import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {
      name: 'Date A',
      Entrée: 4000,
      Sortie: 2400,
      amt: 2400,
    },
    {
      name: 'Date B',
      Entrée: 3000,
      Sortie: 1398,
      amt: 2210,
    },
    {
      name: 'Date C',
      Entrée: 2000,
      Sortie: 9800,
      amt: 2290,
    },
];

const InOut = () => {
    return (
        <AreaChart width={1000} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2EC4B6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2EC4B6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A72608" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#A72608" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="Entrée" stroke="#2EC4B6" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="Sortie" stroke="#A72608" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
    );
}

export default InOut;
