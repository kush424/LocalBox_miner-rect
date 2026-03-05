import { useState, useEffect } from "react";

function RecordForm({ addRecord, updateRecord, editId, recordToEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editId && recordToEdit) {
      setName(recordToEdit.name);
      setEmail(recordToEdit.email);
    }
  }, [editId, recordToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    const record = { name, email };

    if (editId) {
      updateRecord(record);
    } else {
      addRecord(record);
    }

    setName("");
    setEmail("");
    setError("");
  };

  return (
    <div>
      <h2>{editId ? "Edit Record" : "Add Record"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn-primary">
          {editId ? "Update Record" : "Add Record"}
        </button>
      </form>
    </div>
  );
}

export default RecordForm;