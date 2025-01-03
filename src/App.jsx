import { useState } from 'react';
import './App.css';
import FallingRainGrid from './components/falling-rain-grid';

function App() {
  const [gridSize, setGridSize] = useState({rows:15, cols:20});
  return (
    <>
      <h1>Falling Rain</h1>
      <div>
        <input
          type="range"
          min="5"
          max="20"
          value={gridSize.rows}
          onChange={(e) => setGridSize((prev) => ({ ...prev, rows: +e.target.value }))} // + converts the string to numbers
        />
        <input
          type="range"
          min="5"
          max="20"
          value={gridSize.cols}
          onChange={(e) => setGridSize((prev) => ({ ...prev, cols: +e.target.value }))}
        />
      </div>
      <FallingRainGrid rows={gridSize.rows} cols = {gridSize.cols}/>

    </>
  )
}

export default App;
