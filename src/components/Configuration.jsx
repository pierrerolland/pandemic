import React, { useState } from 'react';
import {Button, Slider, Typography} from '@material-ui/core';

export default props => {
    const [configuration, setConfiguration] = useState({
        startInfected: 2,
        infectivity: 50,
        lethality: 15,
        confineRate: 50,
        reinfectionProbabilityRate: 15,
        maxReinfections: 2,
        endInfectionAfterTurns: 11
    });

    const handleChange = (property, value) => {
        setConfiguration({ ...configuration, [property]: value });
    };

    const handleSaveClick = () => {
        props.onStart(configuration, (new Date().getTime()));
    };

    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${window.innerHeight}px`}}>
        <div style={{width: '50%'}}>
            <Typography>
                Start with how many infected?
            </Typography>
            <Slider
                defaultValue={2}
                step={1}
                marks
                min={1}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('startInfected', v) }}
            />
            <Typography>
                Percentage of infectivity
            </Typography>
            <Slider
                defaultValue={20}
                step={10}
                marks
                min={10}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('infectivity', v) }}
            />
            <Typography>
                Percentage of chances to be reinfected
            </Typography>
            <Slider
                defaultValue={15}
                step={5}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('reinfectionProbabilityRate', v) }}
            />
            <Typography>
                Maximum of times a person can be reinfected
            </Typography>
            <Slider
                defaultValue={2}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('maxReinfections', v) }}
            />
            <Typography>
                Percentage of lethality
            </Typography>
            <Slider
                defaultValue={15}
                step={5}
                marks
                min={5}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('lethality', v) }}
            />
            <Typography>
                Percentage of people respecting lockdown
            </Typography>
            <Slider
                defaultValue={50}
                step={5}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, v) => { handleChange('confineRate', v) }}
            />
            <Typography>
                Time after healing/death happens
            </Typography>
            <Slider
                defaultValue={11}
                step={1}
                marks
                min={1}
                max={20}
                valueLabelDisplay="off"
                onChange={(e, v) => { handleChange('endInfectionAfterTurns', v) }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Start
            </Button>
        </div>
    </div>;
}
