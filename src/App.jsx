import './App.css';
import FallingRainGrid from './components/falling-rain-grid';

function App() {

  return (
    <>
      <h1>Falling Rain</h1>
      <FallingRainGrid rows={15} cols = {20}/>
    </>
  )
}

export default App;
