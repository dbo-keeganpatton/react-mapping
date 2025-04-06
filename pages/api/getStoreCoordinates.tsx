import { BigQuery } from "@google-cloud/bigquery";
export default async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    try {

        const { epc } = req.body;

        const bigquery = new BigQuery({
        keyFilename: './secrets/healthcare-111-391317-4548782c3bac.json',
        projectId: 'healthcare-111-391317',
        });

        let sqlQuery = `
            SELECT 
            * 
            FROM \`healthcare-111-391317.sample_geo_dev.store_coordinate\` 
            WHERE TRUE
            AND epc = @epc  
            `;
        
        
        const options = {
            query: sqlQuery,
            location: 'US',
            params: {epc: epc}
        };
        const [rows] = await bigquery.query(options);
    
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error("Error querying BigQuery:", error);
        res.status(500).json({ error: error.message });
    }
}
