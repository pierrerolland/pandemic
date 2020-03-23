export default (node, nodes) => {
    const rowLength = Math.sqrt(nodes.length);
    const previousRow = node.y === 0 ? rowLength - 1 : node.y - 1;
    const previousColumn = node.x === 0 ? rowLength - 1 : node.x - 1;
    const nextRow = node.y === rowLength - 1 ? 0 : node.y + 1;
    const nextColumn = node.x === rowLength - 1 ? 0 : node.x + 1;

    return [
        [previousRow, previousColumn],
        [previousRow, node.x],
        [previousRow, nextColumn],
        [node.y, previousColumn],
        [node.y, nextColumn],
        [nextRow, previousColumn],
        [nextRow, node.x],
        [nextRow, nextColumn]
    ].map(positions => nodes.findIndex(node => node.y === positions[0] && node.x === positions[1]));
}
