import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from './config';
import './styles/index.css';

const stripePromise = loadStripe(config.stripe.PUBLISHABLE_KEY);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <BrowserRouter>
          <Suspense fallback={<p>loading ...</p>}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Elements>
    </div>
  );
};

export default App;
