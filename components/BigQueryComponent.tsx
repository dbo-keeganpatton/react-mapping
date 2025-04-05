'use client'
import { useState } from 'react';

export default function BigQueryComponent() {

    const [data, setData] = useState([]);

    // Go Get the Data
    async function fetchStoreCoordinates() {
        const response = await fetch('/api/getStoreCoordinates');
        const result = await response.json();
        setData(result.data);
    };

    // Return Column Headers from Query Result Set 
    const getColumnNames = () => {
        if (data.length === 0) return [];
        return Object.keys(data[0]);
    };
    const columns = getColumnNames();

    return (
    <div>
        <button onClick={fetchStoreCoordinates}>Fetch Data</button>
        
        <div>
            
            <table>
                <thead>
                    <tr>{columns.map((column, idx) => ( <th key={idx}>{column}</th>))}</tr>
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
    </div>
  );
}
