import { useState } from 'react';
import './App.css';
import FallingRainGrid from './components/falling-rain-grid';


function App() {
  const [gridSize, setGridSize] = useState({ rows: 15, cols: 20 });
  const [rainDensity, setRainDensity] = useState(80);
  const [rainSpeed, setRainSpeed] = useState(160);
  const maxSpeed = 200
  const minSpeed = 10
  const mappedSpeed = maxSpeed - rainSpeed + minSpeed
  return (
    <>
      <h1>Falling Rain</h1>
      <div className='sliders'>
        <div className='slider-container'>
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

        <div className='slider-container'>
          <label htmlFor="density-slider">
            Rain Density: <span>{rainDensity}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={rainDensity}
            onChange={(e) => setRainDensity((+e.target.value))}
          />

          <label htmlFor="speed-slider">
            Rain Speed:
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={rainSpeed}
            onChange={(e) => setRainSpeed((+e.target.value))}
          />
        </div>
      </div>
      <FallingRainGrid rows={gridSize.rows} cols={gridSize.cols} rainDensity={rainDensity} rainSpeed={mappedSpeed} />

    </>
  )
}

export default App;
