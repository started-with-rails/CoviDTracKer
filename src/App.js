import React from 'react';
import FollowingMenu from './components/FollowingMenu';
import SidebarMenu from './components/SidebarMenu';
import PageContents from './components/PageContents';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const options = {
//   chart: {
//     type: 'spline'
//   },
//   title: {
//     text: 'My chart'
//   },
//   series: [
//     {
//       data: [1, 2, 1, 4, 3, 6]
//     }
//   ]
// };

function App() {
  return (
    <div className="App">
        <FollowingMenu />
        <SidebarMenu />
        <PageContents />
        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
    </div>
  );
}

export default App;
