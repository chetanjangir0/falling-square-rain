import { useEffect, useState } from "react";

export default function FallingRainGrid({rows = 10, cols = 10}){
    const [raindrops, setRaindrops] = useState([]);

    useEffect(()=>{
        const interval = setInterval(() => {

            setRaindrops(prevDrops => {
                // update raindrops position
                const updatedDrops = prevDrops
                    .filter(drop => drop.row < rows)
                    .map(drop => ({...drop, row:drop.row + 1})
                );


                // add a new drop randomly
                if(Math.random() < 0.5){
                    const newDrop = {col:Math.floor(Math.random() * cols), row:0}
                    updatedDrops.push(newDrop);
                }
                return updatedDrops;
            });
            console.log(raindrops)
        }, 100);

        return () => clearInterval(interval);
    }, [cols, rows])


    const hasRaindrop = (index) =>{
        const r = Math.floor(index / cols);
        const c = index % cols;
        return raindrops.some(drop => drop.row == r && drop.col == c);
    }


    return <>
        <section className="gridContainer">
            <div className="grid" style={{"--rows":rows, "--cols":cols}}>
                {Array(rows * cols).fill().map((_, i)=>(
                    <div 
                        key={i} 
                        className={`box`}
                        style={{backgroundColor:hasRaindrop(i) ? "blue" : ''}}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </section>
    </>
}