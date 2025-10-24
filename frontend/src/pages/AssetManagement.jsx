import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function AssetManagement() {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState({ assetId: "", employeeId: "" });

  useEffect(() => {
    const fetchData = async () => {
      const [assetRes, empRes] = await Promise.all([
        api.get("/assets"),
        api.get("/users?role=employee"),
      ]);
      setAssets(assetRes.data);
      setEmployees(empRes.data);
    };
    fetchData();
  }, []);

  const assignAsset = async () => {
    await api.post("/assignments", selected);
    alert("Asset assigned!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Assign Asset</h2>

      <div className="flex gap-3">
        <select
          onChange={(e) =>
            setSelected((s) => ({ ...s, assetId: e.target.value }))
          }
          className="border p-2"
        >
          <option value="">Select Asset</option>
          {assets
            .filter((a) => !a.assignedTo)
            .map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
        </select>

        <select
          onChange={(e) =>
            setSelected((s) => ({ ...s, employeeId: e.target.value }))
          }
          className="border p-2"
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>

        <button
          onClick={assignAsset}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Assign
        </button>
      </div>
    </div>
  );
}
