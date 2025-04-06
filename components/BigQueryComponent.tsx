'use client'
import { useState, useEffect } from 'react';



interface QueryParams {
  epc: string;
}

interface BigQueryComponentProps {
  queryParams: QueryParams;
  trigger: boolean;
}



export default function BigQueryComponent({ queryParams, trigger }: BigQueryComponentProps) {
    
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
                headers: { 'Content-Type': 'application/json' },
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
    
     
    const getColumnNames = () => {
        if (data.length === 0) return ["x_value", "y_value", "region_name", "epc", "upc"];
        return Object.keys(data[0]);
    };
    
    const columns = getColumnNames();
    
    return (
        <div>
            <div>
                <table 
                    cellPadding={5} 
                    cellSpacing={1}
                    style={{
                        border: '2px solid #D3D3D3',
                        borderSpacing: '20px',
                        borderCollapse: 'collapse', 
                        marginTop: '10px',
                        color: 'black',
                        width: '90%',
                        textAlign: 'center',
                    }}
                 >
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', border: '2px solid #D3D3D3'}}>index</th>
                            {columns.map((column, idx) => (
                                <th key={idx} style={{border: '2px solid #D3D3D3'}}>{column} </th>
                            ))}
                        </tr>
                    </thead>
                
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{ padding: '5px', border: '2px solid #D3D3D3'}}>{rowIndex + 1}</td>
                                
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} style={{ padding: '5px', border: '2px solid #D3D3D3'}}>
                                    {
                                        typeof item[column] === 'object' 
                                        ? JSON.stringify(item[column]) 
                                        : String(item[column])
                                    }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
    );
}
