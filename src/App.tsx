import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import EntityListStep1 from "./Step1/EntityListStep1";
import EntityListInitial from "./EntityListInitial";
import EntityListStep2 from "./Step2/EntityListStep2";
import EntityListStep3 from "./Step3/EntityListStep3";

function App() {
  let step = 3

  return (
    <div className="App">
      {(() => {
        if (0 === step) {
          return <EntityListInitial />
        }

        if (1 === step) {
          return <EntityListStep1 />
        }

        if (2 === step) {
          return <EntityListStep2 />
        }

        if (3 === step) {
          return <EntityListStep3 />
        }
      })()}
    </div>
  );
}

export default App;
