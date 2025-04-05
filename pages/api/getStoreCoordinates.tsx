import { BigQuery } from "@google-cloud/bigquery";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bigquery = new BigQuery({
      keyFilename: './secrets/healthcare-111-391317-4548782c3bac.json',
      projectId: 'healthcare-111-391317',
    });

    const query = `SELECT * FROM \`healthcare-111-391317.sample_geo_dev.store_coordinate\``;
    const [rows] = await bigquery.query(query);
    
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error("Error querying BigQuery:", error);
    res.status(500).json({ error: error.message });
  }
}

