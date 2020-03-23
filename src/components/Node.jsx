import React from 'react';
import nodeColors from '../config/nodeColors';

export default props => <div
        style={{
            width: `${props.nodeSize}px`,
            height: `${props.nodeSize}px`,
            backgroundColor: nodeColors[props.node.state],
            position: 'absolute',
            top: `${props.node.y * props.nodeSize}px`,
            left: `${props.node.x * props.nodeSize}px`,
            boxSizing: 'border-box',
            opacity: props.node.confined ? '0.5' : '1'
        }}
    />;
