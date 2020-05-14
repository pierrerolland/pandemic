import React, { useState } from 'react';
import OverviewChart from "./OverviewChart";
import Actions from "./Actions";
import NewlyChart from "./NewlyChart";
import OverallChart from "./OverallChart";
import { Dialog } from "@material-ui/core";

export default props => {
    const [overviewDisplayed, setOverviewDisplayed] = useState(false);
    const [newlyDisplayed, setNewlyDisplayed] = useState(false);
    const [overallDisplayed, setOverallDisplayed] = useState(false);

    return <div style={{
        width: `${props.mode === 'horizontal' ? window.innerWidth - props.simulationSize : window.innerWidth}px`,
        height: `${props.mode === 'horizontal' ? window.innerHeight : window.innerHeight - props.simulationSize}px`,
        position: 'absolute',
        top: `${props.mode === 'horizontal' ? 0 : props.simulationSize}px`,
        left: `${props.mode === 'horizontal' ? props.simulationSize : 0}px`,
        padding: '2rem',
        boxSizing: 'border-box'
    }}>
        <Actions
           lockDownActive={props.lockDownActive}
           onToggleLockDown={props.onToggleLockDown}
           onDisplayOverview={() => setOverviewDisplayed(true)}
           onDisplayNewly={() => setNewlyDisplayed(true)}
           onDisplayOverall={() => setOverallDisplayed(true)}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
            <Dialog fullWidth="75%" onClose={() => setOverviewDisplayed(false)} open={overviewDisplayed}>
                <OverviewChart data={props.data.logs.overview} />
            </Dialog>
            <Dialog fullWidth="75%" onClose={() => setNewlyDisplayed(false)} open={newlyDisplayed}>
                <NewlyChart data={props.data.logs.newly} />
            </Dialog>
            <Dialog fullWidth="75%" onClose={() => setOverallDisplayed(false)} open={overallDisplayed}>
                <OverallChart data={props.data.logs.overall} />
            </Dialog>
        </div>
    </div>
}
