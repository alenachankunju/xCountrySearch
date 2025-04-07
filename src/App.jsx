import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CountryCard from "./Component/CountryCard";
import CountrySearch from "./Component/CountrySearch";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <CountrySearch />
      </div>
    </>
  );
}

export default App;
