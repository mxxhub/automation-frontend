import React, {useState} from "react";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";

const Main: React.FC = () => {
  const [url, setUrl] = useState("");
  const [waitTime, setWaitTime] = useState(5);
  const [sendProof, setSendProof] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    if (!url) return alert("Please enter a valid URL");
    setLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post("http://localhost:5000/visit", {
        url,
        waitTime,
        sendProof,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage("Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{marginTop: 50}}>
      <h2>Web Automation Tool</h2>
      <TextField
        fullWidth
        label="Enter URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        type="number"
        label="Wait Time (seconds)"
        variant="outlined"
        value={waitTime}
        onChange={(e) => setWaitTime(Number(e.target.value))}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={sendProof}
            onChange={(e) => setSendProof(e.target.checked)}
          />
        }
        label="Send Proof of Work"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        style={{marginTop: 20}}
      >
        {loading ? "Processing..." : "Submit"}
      </Button>
      {responseMessage && (
        <Typography variant="body1" color="primary" style={{marginTop: 20}}>
          {responseMessage}
        </Typography>
      )}
    </Container>
  );
};

export default Main;
