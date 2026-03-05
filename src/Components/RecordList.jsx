import RecordRow from "./RecordRow";

function RecordList({ records, deleteRecord, startEdit, clearAllRecords }) {
  return (
    <div>
      <h2>Record List</h2>

      {records.length === 0 ? (
        <p className="empty-message">No Records Found</p>
      ) : (
        <>
          <button className="btn-danger" onClick={clearAllRecords}>
            Clear All
          </button>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordRow
                  key={record.id}
                  record={record}
                  deleteRecord={deleteRecord}
                  startEdit={startEdit}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default RecordList;