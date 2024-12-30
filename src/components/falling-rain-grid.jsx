import { useEffect, useState } from "react";

export default function FallingRainGrid({rows = 10, cols = 10}){
    const [raindrops, setRaindrops] = useState([]);
    const [hue, setHue] = useState(240) // represents blue in hsl

    // raindrop falling effect
    useEffect(()=>{
        const interval = setInterval(() => {

            setRaindrops(prevDrops => {
                // update raindrops position
                const updatedDrops = prevDrops
                    .filter(drop => drop.row < rows)
                    .map(drop => ({...drop, row:drop.row + 1})
                );


                // add a new drop randomly
                if(Math.random() < 0.8){
                    const newDrop = {col:Math.floor(Math.random() * cols), row:0}
                    updatedDrops.push(newDrop);
                }
                return updatedDrops;
            });
            console.log(raindrops)
        }, 70);

        return () => clearInterval(interval);
    }, [cols, rows])

    // color transition effect
    useEffect(()=>{
        const interval = setInterval(() => {
            setHue((prevHue) => (prevHue + 1) % 360);
        }, 20);

        return ()=> clearInterval(interval);
    }, [])

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
                        style={{backgroundColor:hasRaindrop(i) ? `hsl(${hue}, 100%, 45%)` : ''}}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </section>
    </>
}