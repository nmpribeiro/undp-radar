# undp-radar

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/undp-radar.svg)](https://www.npmjs.com/package/undp-radar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save undp-radar
```

## Usage

```tsx
import React, { Component } from 'react';

import MyComponent from 'undp-radar';
import 'undp-radar/dist/index.css';

import csvData2 from './assets/some_csv_data_file.csv';

const Example: React.FC = () => (
  <RadarProvider>
    <DataProvider>
      <SetData
        keys={{
          techKey: 'Technology',
          titleKey: 'Title',
          horizonKey: 'Horizon',
          quadrantKey: 'Quadrant',
          useCaseKey: 'Use Case'
        }}
      />
      <RadarDataGenerator />
      <AddCSV
        csvFile={csvData2}
        mapping={(item) =>
          ({
            Quadrant: item['Quadrant'],
            Title: item['Title'],
            Horizon: item['Horizon'],
            'Use Case': item['Use Case'],
            Technology: Utilities.cleanupStringArray(item.Technology.split(','))
          } as any)
        }
      />
      <RadarApp />
    </DataProvider>
  </RadarProvider>
);
```

Don't forget to add `csv` files module declaration to your `react-app-env.d.ts` like so:

```ts
/// <reference types="react-scripts" />

declare module '*.csv' {
  const value: string;
  export default value;
}
```

For further ideas on how to use this library (it has a lot going on under the hood) please check `./example/` project.

## How to run the Example

1. `yarn build` on root folder
2. `cd example && yarn install & yarn start`

### To develop

Open two terminal windows.

- In one do `yarn start` (this will watch and recompile the lib on change).
- In the next one to `cd example && yarn install & yarn start`

## License

MIT © [nmpribeiro](https://github.com/nmpribeiro)
