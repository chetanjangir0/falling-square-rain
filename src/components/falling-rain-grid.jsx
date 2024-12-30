import { useState } from "react";


export default function FallingRainGrid({rows = 10, cols = 10}){
    const [grid, setGrid] = useState(Array(rows * cols).fill("black")); 

    const handleClick = (i) => {
        const updatedGrid = [...grid];
        updatedGrid[i] = "blue";
        setGrid(updatedGrid);
    };
    return <>
        <section className="gridContainer">
            <div className="grid" style={{"--rows":rows, "--cols":cols}}>
                {grid.map((_, i)=>(
                    <div 
                        key={i} 
                        className={`box`} 
                        style={{backgroundColor: grid[i]}}
                        onClick={()=>handleClick(i)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </section>
    </>
}