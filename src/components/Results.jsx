import React, { useEffect, useState } from 'react';

export default props => {
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        if (endTime === null && props.infected === 0) {
            setEndTime((new Date()).getTime());
        }
    });

    return <div style={{
        width: `${props.mode === 'horizontal' ? window.innerWidth - props.simulationSize : window.innerWidth}px`,
        height: `${props.mode === 'horizontal' ? window.innerHeight : window.innerHeight - props.simulationSize}px`,
        position: 'absolute',
        top: `${props.mode === 'horizontal' ? 0 : props.simulationSize}px`,
        left: `${props.mode === 'horizontal' ? props.simulationSize : 0}px`,
        backgroundColor: '#CCCCCC',
        padding: '2rem'
    }}>
        <p>{props.sane} sane</p>
        <p>{props.infected} infected</p>
        <p>{props.dead} dead</p>
        <p>{`${((endTime === null ? (new Date()).getTime() : endTime) - props.startTime) / 1000} seconds`}</p>
    </div>
}
