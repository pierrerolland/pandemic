import neighborsHelper from './neighborsHelper';
import { random } from 'lodash';

const startOrStopLockDown = (lockDownActive, confineRate, nodes) => {
    const isConfined = !!nodes.find(n => n.confined);

    if (isConfined === lockDownActive) {
        return [...nodes.map(n => ({...n}))];
    }

    if (lockDownActive) {
        return [...nodes.map(n => ({ ...n, confined: random(0, 100) <= confineRate }))];
    }

    return [...nodes.map(n => ({ ...n, confined: false }))];
};

export default (
   data,
   turnId,
   endInfectionAfterTurns,
   infectivity,
   maxReinfections,
   reinfectionProbabilityRate,
   lockDownActive,
   confineRate
) => {
    const newNodes = startOrStopLockDown(lockDownActive, confineRate, data.nodes);

    const logs = data.logs;
    let infected = logs.overview[logs.overview.length - 1].infected;
    let dead = logs.overview[logs.overview.length - 1].dead;
    const overallInfected = logs.overall[logs.overall.length - 1].overallInfected;
    const overallDead = logs.overall[logs.overall.length - 1].overallDead;
    let newlyInfected = 0;
    let newlyDead = 0;

    data.nodes.forEach((node, i) => {
        if (node.state === 'infected') {
            if (turnId > node.infectedSince + endInfectionAfterTurns) {
                if (node.willDie) {
                    newNodes[i].state = 'dead';
                    newlyDead++;
                    dead++;
                } else {
                    newNodes[i].state = 'sane';
                }
                infected--;
            } else if (!node.confined) {
                neighborsHelper(node, newNodes).forEach(neighborIndex => {
                    if (
                       !data.nodes[neighborIndex].confined &&
                       data.nodes[neighborIndex].state === 'sane' &&
                       random(0, 100) <= infectivity &&
                       (
                          data.nodes[neighborIndex].infectionsCounter === 0 ||
                          (
                             data.nodes[neighborIndex].infectionsCounter > 0 &&
                             data.nodes[neighborIndex].infectionsCounter < maxReinfections &&
                             random(0, 100) <= reinfectionProbabilityRate
                          )
                       )
                    ) {
                        newNodes[neighborIndex].state = 'infected';
                        newNodes[neighborIndex].infectionsCounter++;
                        newNodes[neighborIndex].infectedSince = turnId;
                        infected++;
                        if (newNodes[neighborIndex].infectionsCounter === 1) {
                            newlyInfected++;
                        }
                    }
                });
            }
        }
    });

    logs.overview.push({
        turnId,
        sane: newNodes.length - infected - dead,
        infected,
        dead,
        confined: lockDownActive ? newNodes.length : 0
    })
    logs.newly.push({
        turnId,
        newlyInfected,
        newlyDead,
        confined: lockDownActive ? (newlyDead > newlyInfected ? newlyDead : newlyInfected) : 0
    })
    logs.overall.push({
        turnId,
        overallSane: newNodes.length - overallInfected - newlyInfected,
        overallInfected: overallInfected + newlyInfected,
        overallDead: overallDead + newlyDead,
        confined: lockDownActive ? newNodes.length : 0
    })

    return { nodes: newNodes, logs };
}
