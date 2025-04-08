import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GooglesheetsForm from "./GooglesheetsForm";
import GooglesheetRecord from "./GooglesheetRecord";

function App() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", height: "100vh" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <GooglesheetsForm />
        </div>
        <div style={{ flex: 1, marginLeft: "10px", overflowY: "auto" }}>
          <GooglesheetRecord />
        </div>
      </div>
    </>
  );
}

export default App;
