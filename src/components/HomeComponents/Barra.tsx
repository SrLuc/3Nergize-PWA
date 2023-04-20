import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
    value: number;
    maxValue: number;
    width: number;
    height: number;
    borderRadius: number;
    onMaxValueChange: (maxValue: number) => void;
}

export function BarChart({ value, maxValue, width, height, borderRadius, onMaxValueChange }: BarChartProps) {
    const color = d3
        .scaleLinear<string>()
        .domain([0, maxValue / 2, maxValue])
        .range(['green', 'yellow', 'red'])
        .clamp(true);

    const [myValue, setMyValue] = useState('');
    
    const [currentMaxValue, setCurrentMaxValue] = useState(maxValue);

    const valor = parseInt(myValue || '0');
    const barWidth = (valor / currentMaxValue) * width;

    useEffect(() => {
        const storedValue = localStorage.getItem('valorTotal');
        if (storedValue) {
            setMyValue(storedValue);
        }
    }, []);

    const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(event.target.value);
        setCurrentMaxValue(newMaxValue);
        onMaxValueChange(newMaxValue);
    }

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height + 30}px`,
                position: 'relative',
                top: 20,
                left: 35,
            }}
        >
            <div
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: '#ccc',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: `${barWidth}px`,
                        height: `${height}px`,
                        backgroundColor: color(parseInt(myValue || '0')),
                    }}
                />
            </div>
            <div style={{ position: 'relative', top: `${height}px`, textAlign: 'center' ,marginTop: 30, display: "flex", gap: 20,}}>

                <div style={{backgroundColor: "rgba(6, 163, 124, 0.77)", height:40, borderRadius: 10, width: '60%' }}>
                <label style={{ fontWeight: 'bold' , color: "white", lineHeight: 2.5}}>Valor Máximo em R$:</label>
                </div>
                <input style={{marginTop: 20, height:40, width: '30%', position: "absolute", top: -20, right: 20, borderRadius: 10, textAlign: "center"}} type="number" value={currentMaxValue} onChange={handleMaxValueChange} />
            </div>
        </div>
    );

}
