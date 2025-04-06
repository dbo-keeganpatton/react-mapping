'use client'
import { useState,  useEffect } from 'react';
import React from 'react';
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



interface QueryParams {
  epc: string;
}

interface MapQueryComponentProps {
  queryParams: QueryParams;
  trigger: boolean;
}



export default function MapQueryComponent({ queryParams, trigger }: MapQueryComponentProps) {
    
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (trigger) {
            fetchStoreCoordinates();
        }
    }, [trigger, queryParams]);


    async function fetchStoreCoordinates() {
        setIsLoading(true);
        setError(null);

        try {

            const requestBody = { epc: '' };
            if (queryParams.epc) requestBody.epc = queryParams.epc;
            
            const response = await fetch('/api/getStoreCoordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result.data || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setData([]);
        } finally {
            setIsLoading(false);
        }
    }


    return (
       <div>
        
       <div
        style={{
            width: '1000px',
            height: '1000px',
            backgroundImage: 'url("/map.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >

        <ResponsiveContainer height="100%" width="100%">
        <ScatterChart style={{ margin: '0px, 0px, 0px, 0px', width: '100%', height: '100%' }}>

        <CartesianGrid />
          <XAxis type="number" dataKey="x_value" name="x" hide/>
          <YAxis type="number" dataKey="y_value" name="y" hide/>
          <ZAxis type="number" range={[100]} />
          <Tooltip />
          <Legend />
          <Scatter data={data} fill="#FF0000" line shape="cross" />


        </ScatterChart>
        </ResponsiveContainer>
        </div>
        </div>
    );
}
