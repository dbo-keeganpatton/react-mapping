import { BigQuery } from "@google-cloud/bigquery";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    const {upc, epc} = req.body;


    try {
        const bigquery = new BigQuery({
        keyFilename: './secrets/healthcare-111-391317-4548782c3bac.json',
        projectId: 'healthcare-111-391317',
        });

        let query = `SELECT * FROM \`healthcare-111-391317.sample_geo_dev.store_coordinate\` WHERE TRUE`;
        const params = [];
        
        if(upc) {
            query += ` AND upc = @upc`;
            params.push({ name: 'upc', parameterType: {type: 'INT64'}, parameterValue: {value: upc} });
        }

        if (epc) {
            query += ` AND epc = @epc`;
            params.push({ name: 'epc', parameterType: { type: 'STRING' }, parameterValue: { value: epc } });
        }

        
        const options = {
            query,
            params: {},
            parameterMode: 'NAMED',
            queryParameters: params,
        };

        const [rows] = await bigquery.query(options);
    
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error("Error querying BigQuery:", error);
        res.status(500).json({ error: error.message });
    }
}

