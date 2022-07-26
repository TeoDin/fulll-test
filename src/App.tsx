import React from 'react';
import './App.css';
import IncrementPage from "./exercice/Increment";
import FizzbuzzPage from "./exercice/Fizzbuzz";
import ReactLevel1Page from "./exercice/ReactLevel1";
import ReactLevel2Page from "./exercice/ReactLevel2";

// Hello, i'm Teo Dinel and here is the four exercices requested

// The only two command done have been :
// npx create-react-app fulll-test --template typescript
// npm start

// if you're asking why all increments are in 2 space, it's a personal preference (.editorconfig).

// Each one have is own component/file for more readability
function App() {
  return (
    <div className="App">
      <IncrementPage />
      <FizzbuzzPage limit={30} />
      <ReactLevel1Page />
      <ReactLevel2Page />
    </div>
  );
}

export default App;
