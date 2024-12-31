import { useEffect, useMemo, useState } from "react";

export default function FallingRainGrid({rows = 10, cols = 10}){
    const [raindrops, setRaindrops] = useState([]);
    const [hue, setHue] = useState(240) // represents blue in hsl

    // raindrop falling effect
    useEffect(()=>{
        const interval = setInterval(() => {

            setRaindrops(prevDrops => {
                // filter drops that have fallen below grid
                const updatedDrops = prevDrops.filter(drop => drop.row < rows - 1);
                
                // update their position
                for(const drop of updatedDrops){
                    drop.row += 1;
                }

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

    // Memoizing the presence of raindrops
    const raindropMap = useMemo(()=>{
        const map = new Set()
        raindrops.forEach((drop)=>{
            map.add(`${drop.row}-${drop.col}`)
        })

        return map;
    }, [raindrops])

    const hasRaindrop = (index) =>{
        const r = Math.floor(index / cols);
        const c = index % cols;
        return raindropMap.has(`${r}-${c}`)
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