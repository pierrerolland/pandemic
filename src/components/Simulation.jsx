import React from 'react';
import Node from './Node';

export default props => {
    return <div style={{width: `${props.simulationSize}px`, height: `${props.simulationSize}px`, backgroundColor: '#CCCCCC'}}>
        {props.nodes.map((node, i) => (
            <Node
                key={i}
                node={node}
                nodeSize={props.nodeSize}
            />
        ))}
    </div>
}
