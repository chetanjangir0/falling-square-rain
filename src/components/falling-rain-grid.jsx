import { useEffect, useMemo, useState } from "react";

export default function FallingRainGrid({rows = 10, cols = 10, rainDensity = 80, rainSpeed = 70}){
    const [raindrops, setRaindrops] = useState([]);
    const [hue, setHue] = useState(240) // represents blue in hsl
    const trailLength = 6;
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

                // add a new drop (with trail) randomly
                if(Math.random() < (rainDensity / 100)){
                    const colPos = Math.floor(Math.random() * cols);
                    let rowPos = 0;
                    addDrop(rowPos, colPos, updatedDrops);
                }
                return updatedDrops;
            });
        }, rainSpeed);

        return () => clearInterval(interval);
    }, [cols, rows, rainDensity, rainSpeed])

    // color transition effect
    useEffect(()=>{
        const interval = setInterval(() => {
            setHue((prevHue) => (prevHue + 1) % 360);
        }, 20);

        return ()=> clearInterval(interval);
    }, [])

    // Memoizing the presence of raindrops
    const raindropMap = useMemo(()=>{
        const map = new Map()
        raindrops.forEach((drop)=>{
            map.set(`${drop.row}-${drop.col}`, drop.trailPos);
        })

        return map;
    }, [raindrops])

    const getColor = (index) =>{
        const r = Math.floor(index / cols);
        const c = index % cols;
        const key = `${r}-${c}`;
        if (!raindropMap.has(key)) return "";
        const trailPos = raindropMap.get(key)
        const opacity = 1 - (trailPos / trailLength)
        return `hsla(${hue}, 100%, 45%, ${opacity})`
    }

    const addDrop = (rowPos, colPos, updatedDrops)=>{
        let trailPos = 0; // distance from head of trail
        for(let i = 0; i < trailLength; i++){
            const newDrop = {col:colPos, row:rowPos, trailPos:trailPos};
            updatedDrops.push(newDrop);
            rowPos -= 1;
            trailPos += 1;
        }
    }
    const handleClick = (index)=>{
        const row = Math.floor(index / cols);
        const col = index % cols;
        setRaindrops((prevDrops) => {
            const updatedDrops = [...prevDrops];
            addDrop(row, col, updatedDrops); 
            return updatedDrops;
        });
    }

    return <>
        <section className="gridContainer">
            <div className="grid" style={{"--rows":rows, "--cols":cols}}>
                {Array(rows * cols).fill().map((_, i)=>(
                    <div 
                        key={i} 
                        className={"box"}
                        style={{backgroundColor:getColor(i)}}
                        onClick={()=>handleClick(i)}
                    />
                ))}
            </div>
        </section>
    </>
}