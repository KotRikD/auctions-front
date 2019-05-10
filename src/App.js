import React from 'react';
import View from "./Components/View";
import TabLayout from "./Components/TabLayout";
import Tab from "./Components/Tab";

import Bet from "./Icons/Bet";

import './App.css';
import Cup from "./Icons/Cup";

function App() {
  return (
      <div className="App">
        <View/>
        <TabLayout>
          <Tab icon={<Bet/>} id="home"/>
          <Tab icon={<Cup/>} id="bet"/>
        </TabLayout>
      </div>
  );
}

export default App;
