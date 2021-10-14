import React from 'react';
import { SelectionState, Utilities, QuadrantRadar } from 'undp-radar';

import { CenterColumn } from '../../layout/CenterColumn';
import { Layout } from '../../layout/Layout';
import { LeftColumn } from '../../layout/LeftColumn';
import { RightColumn } from '../../layout/RightColumn';

import './QuadrantPage.scss';

export const QuadrantPage: React.FC = () => (
  <SelectionState>
    {({
      selectedQuadrant,
      logic: { setSelectedQuadrant, setSelectedItem }
    }) => (
      <div className='App'>
        {selectedQuadrant && (
          <Layout>
            <LeftColumn>
              <div style={{ position: 'absolute', top: 20, left: 0 }}>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedQuadrant(null);
                    setSelectedItem(null);
                  }}
                  className={'radar-button'}
                >
                  <span style={{ fontSize: 30 }}>&#10094;</span>
                </button>
              </div>
              {/* <Switch>
              <Route exact path="/" component={TechList} />
            </Switch>

            <Switch>
              <Route exact path="/" component={Filter} />
            </Switch> */}
              <p>Todo: put list of items based on level of implementation</p>
            </LeftColumn>

            <CenterColumn>
              <h3 style={{ textAlign: 'center' }}>
                {Utilities.capitalize(selectedQuadrant)}
              </h3>
              <QuadrantRadar selectedQuadrant={selectedQuadrant} />
              {/* <TechOrBlipDescription /> */}
            </CenterColumn>

            <RightColumn>{/* <DataLists /> */}</RightColumn>
          </Layout>
        )}
      </div>
    )}
  </SelectionState>
);
