import { fill, random } from 'lodash';

export default (nbNodes, startInfected, lethality) => {
    const rowLength = Math.sqrt(nbNodes);
    const nodes = fill(Array(nbNodes), null).map((node, i) => ({
        x: i % rowLength,
        y: Math.floor(i / rowLength),
        state: 'sane',
        confined: false,
        infectionsCounter: 0,
        willDie: random(0, 100) <= lethality
    }));

    for (let i = 0 ; i < startInfected ; i++) {
        let r;

        do {
            r = random(0, nbNodes - 1);
        } while (nodes[r].state !== 'sane');

        nodes[r].state = 'infected';
        nodes[r].infectedSince = 0;
    }

    return {
        nodes,
        logs: {
            overview: [
                {
                    turnId: 0,
                    sane: nbNodes - startInfected,
                    infected: startInfected,
                    dead: 0,
                    confined: 0
                }
            ],
            newly: [
                {
                    turnId: 0,
                    newlyInfected: startInfected,
                    newlyDead: 0,
                    confined: 0
                }
            ],
            overall: [
                {
                    turnId: 0,
                    overallSane: nbNodes - startInfected,
                    overallInfected: startInfected,
                    overallDead: 0,
                    confined: 0
                }
            ]
        }
    };
}
