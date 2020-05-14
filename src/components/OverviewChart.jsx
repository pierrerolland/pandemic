import React from 'react';
import { Chart, AreaSeries, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Stack } from '@devexpress/dx-react-chart';
import { stackOrderInsideOut } from 'd3-shape';
import colors from '../config/nodeColors.json'
import Area from './Area';
import { Paper } from "@material-ui/core";

export default props => {
    return <Paper>
        <Chart style={{ width: '100%', height: '100%', paddingLeft: '20px' }} data={props.data} >
            <AreaSeries
               name="Sane"
               valueField="sane"
               argumentField="turnId"
               seriesComponent={Area}
               color={colors.sane}
            />
            <AreaSeries
               name="Infected"
               valueField="infected"
               argumentField="turnId"
               seriesComponent={Area}
               color={colors.infected}
            />
            <AreaSeries
               name="Dead"
               valueField="dead"
               argumentField="turnId"
               seriesComponent={Area}
               color={colors.dead}
            />
            <AreaSeries
               name="Lockdown"
               valueField="confined"
               argumentField="turnId"
               color="rgba(0, 0, 0, 0.1)"
            />
            <Legend position="bottom" />
            <Stack
               stacks={[
                   { series: ['Sane', 'Infected', 'Dead'] },
               ]}
               order={stackOrderInsideOut}
            />
        </Chart>
    </Paper>
}
