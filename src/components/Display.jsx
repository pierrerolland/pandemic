import React, { useState } from 'react';
import Simulation from './Simulation';
import initialNodesHelper from '../helper/initialNodesHelper';
import Results from './Results';
import { useInterval } from '../hooks/useInterval'
import turnHelper from "../helper/turnHelper";

export default props => {
    const [mode] = useState(window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal');
    const [simulationSize] = useState(window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight);
    const [nodeSize] = useState((window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight) / Math.sqrt(props.nbNodes));
    const [data, setData] = useState(initialNodesHelper(props.nbNodes, props.startInfected, props.lethality));
    const [turnId, setTurnId] = useState(0);
    const [isLockDownActive, setLockDownActive] = useState(false);

    const newTurn = () => {
        setData(turnHelper(
           data,
           turnId,
           props.endInfectionAfterTurns,
           props.infectivity,
           props.maxReinfections,
           props.reinfectionProbabilityRate,
           isLockDownActive,
           props.confineRate
        ))
        setTurnId(turnId + 1);
    };

    useInterval(newTurn, 500);

    return <div style={{position: 'relative'}}>
        <Simulation
            simulationSize={simulationSize}
            nodeSize={nodeSize}
            nodes={data.nodes}
        />
        <Results
            mode={mode}
            simulationSize={simulationSize}
            data={data}
            turnId={turnId}
            lockDownActive={isLockDownActive}
            onToggleLockDown={() => setLockDownActive(!isLockDownActive)}
        />
    </div>
}
