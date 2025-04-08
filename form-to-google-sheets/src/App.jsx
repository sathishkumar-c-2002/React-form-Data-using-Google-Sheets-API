import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GooglesheetsForm from "./GooglesheetsForm";
import GooglesheetRecord from "./GooglesheetRecord";

function App() {
  return (
    <>
      <GooglesheetsForm />
      <GooglesheetRecord />
    </>
  );
}

export default App;
