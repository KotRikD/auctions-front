import React from 'react';
import View from "./Components/View";
import TabLayout from "./Components/TabLayout";
import Tab from "./Components/Tab";

import Bet from "./Icons/Bet";

import './App.css';

function App() {
  return (
      <div className="App">
        <View/>
        <TabLayout>
          <Tab icon={<Bet/>} id="home"/>
          <Tab icon={<Bet/>} id="bet"/>
        </TabLayout>
      </div>
  );
}

export default App;
