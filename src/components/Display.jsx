import React, { useState, useEffect } from 'react';
import Simulation from './Simulation';
import initialNodesHelper from '../helper/initialNodesHelper';
import Results from './Results';
import neighborsHelper from '../helper/neighborsHelper';
import { random } from 'lodash';

export default props => {
    const [mode] = useState(window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal');
    const [simulationSize] = useState(window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight);
    const [nodeSize] = useState((window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight) / Math.sqrt(props.nbNodes));
    const [startTime] = useState((new Date()).getTime());
    const [confinementStarted, setConfinementStarted] = useState(false);
    let nodesToBeUpdated = initialNodesHelper(props.nbNodes, props.startInfected, props.lethality);
    const [nodes, setNodes] = useState(nodesToBeUpdated);

    const newTurn = () => {
        const newNodes = [...nodesToBeUpdated.map(n => ({...n}))];
        const time = (new Date()).getTime();

        nodesToBeUpdated.forEach((node, i) => {
            if (node.state === 'infected') {
                if (time > node.infectedSince + (props.endInfectionAfterSeconds * 1000)) {
                    newNodes[i].state = node.willDie ? 'dead' : 'sane';
                } else if (!node.confined) {
                    neighborsHelper(node, nodes).forEach(neighborIndex => {
                        if (
                            !nodesToBeUpdated[neighborIndex].confined &&
                            nodesToBeUpdated[neighborIndex].state === 'sane' &&
                            random(0, 100) <= props.infectivity &&
                            (
                                nodesToBeUpdated[neighborIndex].alreadyBeenInfected === false ||
                                (
                                    nodesToBeUpdated[neighborIndex].alreadyBeenInfected === true &&
                                    random(0, 100) <= props.reinfectionProbabilityRate
                                )
                            )
                        ) {
                            newNodes[neighborIndex].state = 'infected';
                            newNodes[neighborIndex].alreadyBeenInfected = true;
                            newNodes[neighborIndex].infectedSince = time;
                        }
                    });
                }
            }
        });
        if (!confinementStarted && time > props.startConfinementAfterSeconds * 1000 + props.startTime) {
            nodesToBeUpdated.forEach((node, i) => {
                if (random(0, 100) <= props.confineRate) {
                    newNodes[i].confined = true;
                }
            });
            setConfinementStarted(true);
        }

        nodesToBeUpdated = newNodes;
        setNodes(nodesToBeUpdated);
    };

    useEffect(() => {
        setInterval(newTurn, 300);
    }, []);

    return <div style={{position: 'relative'}}>
        <Simulation
            simulationSize={simulationSize}
            nodeSize={nodeSize}
            nodes={nodes}
            infectivity={props.infectivity}
            confineRate={props.confineRate}
            startConfinementAfterSeconds={props.startConfinementAfterSeconds}
            endInfectionAfterSeconds={props.endInfectionAfterSeconds}
        />
        <Results
            mode={mode}
            simulationSize={simulationSize}
            sane={nodes.filter(n => n.state === 'sane').length}
            infected={nodes.filter(n => n.state === 'infected').length}
            dead={nodes.filter(n => n.state === 'dead').length}
            startTime={startTime}
            confinementStarted={confinementStarted}
        />
    </div>
}
