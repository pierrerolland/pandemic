import React from 'react';
import {Chart, AreaSeries, Legend, LineSeries} from '@devexpress/dx-react-chart-material-ui';
import { Stack } from '@devexpress/dx-react-chart';
import { stackOrderInsideOut } from 'd3-shape';
import colors from '../config/nodeColors.json'
import { Paper } from '@material-ui/core';
import Area from './Area';

export default props => {
    return <Paper>
        <Chart style={{ width: '100%', height: '100%', paddingLeft: '20px' }} data={props.data} >
            <LineSeries
               name="Newly infected"
               valueField="newlyInfected"
               argumentField="turnId"
               color={colors.infected}
            />
            <LineSeries
               name="Newly dead"
               valueField="newlyDead"
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
            <Stack
               stacks={[
                   { series: ['Newly infected', 'Newly dead'] },
               ]}
               order={stackOrderInsideOut}
            />
        </Chart>
    </Paper>
}
