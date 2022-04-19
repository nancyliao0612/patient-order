import { useEffect, useState } from "react";
import axios from "axios";
import Patient from "./Patient";
import Box from "@mui/material/Box";

function App() {
  const [loading, setLoading] = useState(false);
  const [patientList, setPatientList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/patients");
      const data = await response.data.patient;
      setPatientList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="loading-text">Data is loading...</p>;
  }

  const patients = patientList.map((item) => {
    return <Patient key={item._id} {...item} />;
  });

  return (
    <section>
      <h1>病人列表</h1>
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        style={{ borderRadius: "5px" }}
      >
        {patients}
      </Box>
    </section>
  );
}

export default App;
