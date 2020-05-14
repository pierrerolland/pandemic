import colors from '../config/nodeColors.json';

const nodeColor = node => node.confined ? `${colors[node.state]}33` : colors[node.state];

export default (nodes, sideSize) => {
    const rowAmount = Math.sqrt(nodes.length);
    const pixelSize = sideSize / rowAmount;

    return {
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        boxShadow: nodes
           .map((node, i) => `${(i % rowAmount) * pixelSize}px ${Math.floor(i / rowAmount) * pixelSize}px ${nodeColor(node)}`)
           .join(',')
    }
};
