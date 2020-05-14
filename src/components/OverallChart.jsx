import React from 'react';
import {Chart, AreaSeries, Legend, LineSeries} from '@devexpress/dx-react-chart-material-ui';
import colors from '../config/nodeColors.json'
import { Paper } from '@material-ui/core';
import Area from './Area';

export default props => {
    return <Paper>
        <Chart style={{ width: '100%', height: '100%', paddingLeft: '20px' }} data={props.data} >
            <LineSeries
               name="Overall sane"
               valueField="overallSane"
               argumentField="turnId"
               color={colors.sane}
            />
            <LineSeries
               name="Overall infected"
               valueField="overallInfected"
               argumentField="turnId"
               color={colors.infected}
            />
            <LineSeries
               name="Overall dead"
               valueField="overallDead"
               argumentField="turnId"
               color={colors.dead}
            />
            <AreaSeries
               name="Lockdown"
               valueField="confined"
               argumentField="turnId"
               color="rgba(0, 0, 0, 0.1)"
               seriesComponent={Area}
            />
            <Legend position="bottom" />
        </Chart>
    </Paper>
}
