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
    
    // Go Get the Data
    async function fetchStoreCoordinates() {
        setIsLoading(true);
        setError(null);
        try {
            // Create a clean request body without undefined values
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
    
    // Return Column Headers from Query Result Set 
    const getColumnNames = () => {
        if (data.length === 0) return [];
        return Object.keys(data[0]);
    };
    
    const columns = getColumnNames();
    
    return (
        <div>
            
            {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
            
            {data.length > 0 ? (
                <div>
                    <table border={1} cellPadding={5} cellSpacing={0} style={{borderCollapse: 'collapse', marginTop: '10px'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                {columns.map((column, idx) => (
                                    <th key={idx}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                    
                        <tbody>
                            {data.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{rowIndex + 1}</td>
                                    
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>
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
            ) : !isLoading && (
                <div style={{ margin: '10px 0' }}>No data available.</div>
            )}
        </div>
    );
}
