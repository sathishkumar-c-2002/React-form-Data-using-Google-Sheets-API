import React, { useState, useEffect } from 'react';

const GooglesheetRecord = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Public Access API Key
  const API_KEY = 'AIzaSyBbR9BjaIafzEIE8egVpc7yprjr2EiqLPY'; // Use a standard API key, NOT a service account
  const SHEET_ID = '1lcI2K3mMRDLMyaWWf3eaJ2T5RcxvtNo-X-2qraSiAn4'; // Extracted from Google Sheets URL
  const SHEET_NAME = 'Sheet 1'; // Ensure this matches your actual sheet name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.values) {
          setData(result.values);
        } else {
          console.error('No data found in the sheet.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;

return (
    <div className="sheet-records p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Google Sheet Data</h2>

        {data.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            {data[0]?.map((header, index) => (
                                <th key={index} className="px-4 py-2 text-left">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border px-4 py-2">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-center text-gray-600">No data available to display.</p>
        )}
    </div>
);
};

export default GooglesheetRecord;