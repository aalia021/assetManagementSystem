import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

export default function AssetCrud() {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const fetchAssets = async () => {
    const res = await api.get("/assets");
    setAssets(res.data);
  };

  const addAsset = async (e) => {
    e.preventDefault();
    await api.post("/assets", {
      asset_name: assetName,
      category,
      purchase_date: purchaseDate,
      serial_number: serialNumber,
    });
    // Reset form
    setAssetName("");
    setCategory("");
    setPurchaseDate("");
    setSerialNumber("");
    fetchAssets();
  };

  const deleteAsset = async (id) => {
    await api.delete(`/assets/${id}`);
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Asset Management</h2>

      <form onSubmit={addAsset} className="flex flex-wrap gap-2 mb-6">
        <input
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          placeholder="Asset Name"
          className="border p-2 rounded w-1/4"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border p-2 rounded w-1/4"
        />
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="border p-2 rounded w-1/4"
        />
        <input
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Serial Number"
          className="border p-2 rounded w-1/4"
        />
        <button className="bg-green-500 text-white px-4 rounded">Add</button>
      </form>

      <table className="border w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Purchase Date</th>
            <th className="p-2">Serial Number</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a._id} className="border-t">
              <td className="p-2">{a.asset_name}</td>
              <td className="p-2">{a.category}</td>
              <td className="p-2">{a.purchase_date}</td>
              <td className="p-2">{a.serial_number}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteAsset(a._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
