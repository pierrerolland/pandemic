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
        nodes[r].infectedSince = (new Date()).getTime();
    }

    return nodes;
}
