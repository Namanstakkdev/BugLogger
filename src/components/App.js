import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Logitem from "./Logitem";
import AddLogItem from "./AddLogItem";
import Alert from "react-bootstrap/Alert";
import { ipcRenderer} from "electron";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  })

  useEffect(() => {
    ipcRenderer.send("logs:load");
    ipcRenderer.on("logs:get", (e, logs) => {
      setLogs(JSON.parse(logs));
      console.log(logs)
    });
    ipcRenderer.on("logs:clear", () => {
      setLogs([])
      showAlert("Logs Cleared")
    })
  }, []);

  function addItem(item) {
    if (item.text === "" || item.user === "" || item.priority === "") {
      showAlert("Please Enter all fields", "danger");
    }
    // item._id = Mathfloor(Math.random());
    // item.created = Mathfloor(Math.random());
    // setLogs([...logs, item]);
    console.log(item)
    ipcRenderer.send("logs:add", item);

    showAlert("Log Added");
  }

  function deleteItem(_id) {
    // setLogs(
    //   logs.filter((item) => {
    //     item._id !== _id;
    //   })
    ipcRenderer.send("logs:delete", _id);
    showAlert("Log Removed");
    // );
  }

  function showAlert(message, variant = "success", seconds = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message,
        variant,
      });
    }, seconds);
  }

  return (
    <div className="app">
      <Container>
        <AddLogItem addItem={addItem} />
        {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <Table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Log Text</th>
              <th>User</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <Logitem key={log._id} log={log} deleteItem={deleteItem} />
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default App;
