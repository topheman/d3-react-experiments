import React from 'react';

import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

const App = ({ children }) => {
  return (
    <div>
      <Header title="d3-react-RxJS-experiments"/>
      <div className="container">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
