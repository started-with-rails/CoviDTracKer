import React from 'react';
import FollowingMenu from './components/FollowingMenu';
import SidebarMenu from './components/SidebarMenu';
import PageContents from './components/PageContents';

function App() {
  return (
    <div className="App">
        <FollowingMenu />
        <SidebarMenu />
        <PageContents />
    </div>
  );
}

export default App;
