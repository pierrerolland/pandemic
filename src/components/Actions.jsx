import React from 'react';
import { Button, Fab } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export default props => (
   <div style={{ display: 'flex' }}>
       <div style={{ padding: '1rem' }}>
            <Fab color={ props.lockDownActive ? "primary" : "secondary" } onClick={props.onToggleLockDown}>
                { props.lockDownActive ? <LockOpenIcon /> : <LockIcon /> }
            </Fab>
       </div>
       <div style={{ padding: '1rem' }}>
           <Button variant="contained" color="primary" onClick={props.onDisplayOverview}>Display overview</Button>
       </div>
       <div style={{ padding: '1rem' }}>
           <Button variant="contained" color="primary" onClick={props.onDisplayNewly}>Display new values</Button>
       </div>
       <div style={{ padding: '1rem' }}>
           <Button variant="contained" color="primary" onClick={props.onDisplayOverall}>Display overall values</Button>
       </div>
   </div>
)
