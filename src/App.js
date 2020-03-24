import React, { useState } from 'react';
import Display from './components/Display';
import Configuration from './components/Configuration';
import config from './config.json';

export default () => {
    const [stage, setStage] = useState('configuration');
    const [configuration, setConfiguration] = useState({});
    const [startTime, setStartTime] = useState(null);

    const handleStart = (conf, start) => {
        setConfiguration(conf);
        setStage('simulation');
        setStartTime(start);
    };

    return stage === 'simulation' ? <Display
        nbNodes={config.nbNodes}
        startTime={startTime}
        {...configuration}
    /> : <Configuration onStart={handleStart} />;
}
