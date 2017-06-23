import React from 'react';

import { Provider as WindowInfosProvider } from '../../components/WindowInfos';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const App = ({ children }) => (
  <WindowInfosProvider>
    <div>
      <Header title="d3-react-experiments" />
      <div className="container">
        {children}
      </div>
      <Footer />
    </div>
  </WindowInfosProvider>
  );

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
