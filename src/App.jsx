import { useState, useEffect } from "react";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";

function App() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("records"));
    if (storedData) {
      setRecords(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const addRecord = (record) => {
    setRecords([...records, { ...record, id: Date.now() }]);
  };

  const updateRecord = (updatedRecord) => {
    const updated = records.map((rec) =>
      rec.id === editId ? { ...rec, ...updatedRecord } : rec
    );
    setRecords(updated);
    setEditId(null);
  };

  const deleteRecord = (id) => {
    const filtered = records.filter((rec) => rec.id !== id);
    setRecords(filtered);
  };

  const startEdit = (id) => {
    setEditId(id);
  };

  const clearAllRecords = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all records?"
    );
    if (confirmClear) {
      setRecords([]);
    }
  };

  const recordToEdit = records.find((rec) => rec.id === editId);

  return (
    <div className="app-container">
      <h1 className="app-title">LocalBox Miner</h1>

      <div className="dashboard">
        <span>Total Records: {records.length}</span>
        <span>
          Last Added:{" "}
          {records.length > 0 ? records[records.length - 1].name : "N/A"}
        </span>
      </div>

      <RecordForm
        addRecord={addRecord}
        updateRecord={updateRecord}
        editId={editId}
        recordToEdit={recordToEdit}
      />

      <RecordList
        records={records}
        deleteRecord={deleteRecord}
        startEdit={startEdit}
        clearAllRecords={clearAllRecords}
      />
    </div>
  );
}

export default App;