import React from 'react';

import {
  AddCSV,
  DataProvider,
  RadarDataGenerator,
  RadarProvider,
  SetData,
  Utilities
} from 'undp-radar';
import 'undp-radar/dist/index.css';

import csvData2 from './assets/technology_radar_dataset_updated.csv';
import { RadarApp } from './radar/RadarApp';

const App = () => {
  return (
    <div>
      <RadarProvider>
        <DataProvider>
          <SetData
            keys={{
              techKey: 'Technology',
              titleKey: 'Ideas/Concepts/Examples',
              horizonKey: 'Status/Maturity',
              quadrantKey: 'Disaster Cycle',
              useCaseKey: 'Use Case',
              disasterTypeKey: ''
            }}
          />
          <RadarDataGenerator />
          <AddCSV
            csvFile={csvData2}
            mapping={(item) =>
              ({
                'Country of Implementation': item['Country of Implementation'],
                Data: item.Data,
                'Date of Implementation': item['Date of Implementation'],
                Description: item.Description,
                'Disaster Cycle': item['Disaster Cycle'],
                'Ideas/Concepts/Examples': item['Ideas/Concepts/Examples'],
                Source: item.Source,
                'Status/Maturity': item['Status/Maturity'],
                'Supporting Partners': item['Supporting Partners'],
                'Un Host Organisation': item['Un Host Organisation'],
                'Use Case': item['Use Case'],
                SDG: Utilities.cleanupStringArray(item.SDG.split(',')),
                Technology: Utilities.cleanupStringArray(
                  item.Technology.split(',')
                )
              } as any)
            }
          />
          <RadarApp />
        </DataProvider>
      </RadarProvider>
    </div>
  );
};

export default App;
