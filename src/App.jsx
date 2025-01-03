import { useState } from 'react';
import './App.css';
import FallingRainGrid from './components/falling-rain-grid';

function App() {
  const [gridSize, setGridSize] = useState({ rows: 15, cols: 20 });
  return (
    <>
      <h1>Falling Rain</h1>
      <div className='sliderContainer'>
        <label htmlFor="rows-slider">
          Rows: <span>{gridSize.rows}</span>
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={gridSize.rows}
          onChange={(e) => setGridSize((prev) => ({ ...prev, rows: +e.target.value }))} // + converts the string to numbers
        />
        <label htmlFor="cols-slider">
          Columns: <span>{gridSize.cols}</span>
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={gridSize.cols}
          onChange={(e) => setGridSize((prev) => ({ ...prev, cols: +e.target.value }))}
        />
      </div>
      <FallingRainGrid rows={gridSize.rows} cols={gridSize.cols} />

    </>
  )
}

export default App;
