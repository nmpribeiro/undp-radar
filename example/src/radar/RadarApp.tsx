import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Radar } from 'undp-radar';

import { Layout } from '../layout/Layout';
import { LeftColumn } from '../layout/LeftColumn';
import { RightColumn } from '../layout/RightColumn';
import { CenterColumn } from '../layout/CenterColumn';

const Filter = () => <div>Filter</div>;
const TechList = () => <div>TechList</div>;
const BlipPage = () => <div>BlipPage</div>;
const DataLists = () => <div>DataLists</div>;
const QuadrantPage = () => <div>QuadrantPage</div>;
const TechOrBlipDescription = () => <div>TechOrBlipDescription</div>;

export const RadarApp: React.FC = () => {
  const selectedQuadrant = null;
  const selectedItem = null;
  return (
    <div className='App'>
      {!selectedQuadrant && !selectedItem && (
        <Layout>
          <LeftColumn>
            <Switch>
              <Route exact path='/' component={TechList} />
            </Switch>

            <Switch>
              <Route exact path='/' component={Filter} />
            </Switch>
          </LeftColumn>

          <CenterColumn>
            <Radar />
            <TechOrBlipDescription />
          </CenterColumn>

          <RightColumn>
            <DataLists />
          </RightColumn>
        </Layout>
      )}
      {!selectedQuadrant && selectedItem && <BlipPage />}
      {selectedQuadrant && <QuadrantPage />}
    </div>
  );
};
