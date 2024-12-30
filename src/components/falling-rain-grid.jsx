

export default function FallingRainGrid({rows = 10, cols = 10}){
    const grid = Array(rows * cols).fill(null);
    return <>
        <section className="gridContainer">
            <div className="grid">
                {grid.map((_, i)=>(
                    <div key={i} className={`box`}>
                        {i + 1}
                    </div>
                ))}
            </div>
        </section>
    </>
}