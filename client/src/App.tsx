import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing';
import CheckoutPage from './pages/checkout';
import './styles/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>loading ...</p>}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
