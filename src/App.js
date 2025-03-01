import React, { useState } from "react";
import { createEscrow, releaseEscrow } from "./Escrow";

function App() {
  const [freelancer, setFreelancer] = useState("");
  const [amount, setAmount] = useState("");
  const [escrowId, setEscrowId] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install it to continue.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet Connected ✅");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Wallet connection failed.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Escrow Smart Contract</h1>

      {/* Connect Wallet Button */}
      <button onClick={connectWallet} style={buttonStyle}>
        Connect Wallet
      </button>

      {/* Create Escrow */}
      <h3>Create Escrow</h3>
      <input
        type="text"
        placeholder="Freelancer Address"
        value={freelancer}
        onChange={(e) => setFreelancer(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Amount (in USDT)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />
      <button onClick={() => createEscrow(freelancer, amount)} style={buttonStyle}>
        Create Escrow
      </button>

      {/* Release Escrow */}
      <h3>Release Escrow</h3>
      <input
        type="number"
        placeholder="Escrow ID"
        value={escrowId}
        onChange={(e) => setEscrowId(e.target.value)}
        style={inputStyle}
      />
      <button onClick={() => releaseEscrow(escrowId)} style={buttonStyle}>
        Release Payment
      </button>
    </div>
  );
}

// Button Styling
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const inputStyle = {
  padding: "10px",
  margin: "10px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default App;
