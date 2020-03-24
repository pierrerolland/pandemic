import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../vendor/canvasjscharts/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import './Results.css';

export default props => {
    const [endTime, setEndTime] = useState(null);
    const [chartData, setChartData] = useState({
        animationEnabled: false,
        exportEnabled: false,
        axisY: {
            suffix: "%"
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true
        },
        data: [
            {
                type: "stackedArea100",
                name: "Sane",
                showInLegend: false,
                color: "#00FF00",
                dataPoints: [
                ]
            },
            {
                type: "stackedArea100",
                name: "Infected",
                showInLegend: false,
                color: "#FF0000",
                dataPoints: [
                ]
            },
            {
                type: "stackedArea100",
                name: "Dead",
                showInLegend: false,
                color: "#000000",
                dataPoints: [
                ]
            },
            {
                type: "error",
                name: "Confinement",
                showInLegend: false,
                color: '#FFFFFF',
                dataPoints: [
                ]
            }
        ]
    });

    useEffect(() => {
        if (endTime === null && props.infected === 0) {
            setEndTime((new Date()).getTime());
        }
    });

    useEffect(() => {
        const newChartData = {...chartData};
        const newX = newChartData.data[0].dataPoints.length > 0 ?
            newChartData.data[0].dataPoints[newChartData.data[0].dataPoints.length - 1].x + 1 : 0;

        newChartData.data[0].dataPoints.push({ x: newX, y: props.sane });
        newChartData.data[1].dataPoints.push({ x: newX, y: props.infected });
        newChartData.data[2].dataPoints.push({ x: newX, y: props.dead });

        if (props.confinementStarted && newChartData.data[3].dataPoints.length === 0) {
            newChartData.data[3].dataPoints.push({ x: newX, y: [0, 100] })
        }

        setChartData(newChartData);
    }, [props.infected]);

    return <div style={{
        width: `${props.mode === 'horizontal' ? window.innerWidth - props.simulationSize : window.innerWidth}px`,
        height: `${props.mode === 'horizontal' ? window.innerHeight : window.innerHeight - props.simulationSize}px`,
        position: 'absolute',
        top: `${props.mode === 'horizontal' ? 0 : props.simulationSize}px`,
        left: `${props.mode === 'horizontal' ? props.simulationSize : 0}px`,
        backgroundColor: '#CCCCCC',
        padding: '2rem',
        boxSizing: 'border-box'
    }}>
        <CanvasJSChart
            style={{maxHeight: '100%', maxWidth: '100%'}}
            options={chartData}
        />
    </div>
}
