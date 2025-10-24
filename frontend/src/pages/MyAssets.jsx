import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

export default function MyAssets() {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    const res = await api.get("/assignments/my-assets");
    setAssets(res.data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Assigned Assets</h2>
      {assets.length === 0 ? (
        <p>No assets assigned.</p>
      ) : (
        <ul className="list-disc pl-6">
          {assets.map((a) => (
            <li key={a._id}>
              {a.name} — <span className="text-gray-500">{a.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
