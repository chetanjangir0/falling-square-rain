

export default function FallingRainGrid({rows = 10, cols = 10}){
    const grid = Array(rows * cols).fill(null);
    return <>
        <div className="grid">
            {grid.map((_, i)=>(
                <div key={i} className={`box${i}`}>
                    {i + 1}
                </div>
            ))}
        </div>
    </>
}