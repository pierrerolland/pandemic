import React from 'react';
import cssGridBuilder from '../builder/cssGridBuilder'

export default props => {
    return <div style={{width: `${props.simulationSize}px`, height: `${props.simulationSize}px`}}>
        <div style={cssGridBuilder(props.nodes, props.simulationSize)} />
    </div>
}
