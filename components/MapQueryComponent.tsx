'use client'
import { useState } from 'react';
import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export default function MapQueryComponent() {

    const [data, setData] = useState([]);

    // Go Get the Data
    async function fetchStoreCoordinates() {
        const response = await fetch('/api/getStoreCoordinates');
        const result = await response.json();
        setData(result.data);
    };


    return (
       <div>
       <button onClick={fetchStoreCoordinates}>Fetch Data</button>
        
       <div
        style={{
            width: '50%',
            height: '50%',
            backgroundImage: 'url("/map.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >

        <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >

        <CartesianGrid />
          <XAxis type="number" dataKey="x_value" name="x" />
          <YAxis type="number" dataKey="y_value" name="y" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Store Test" data={data} fill="#FF0000" line shape="cross" />


        </ScatterChart>
        </ResponsiveContainer>
        </div>
        </div>
    );
}
