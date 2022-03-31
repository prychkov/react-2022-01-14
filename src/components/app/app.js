import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Restaurants from '../restaurants';
import Header from '../header';
import Basket from '../basket';
import OrderError from '../order-error';
import OrderSuccess from '../order-success';
import { UserProvider } from '../../contexts/user-context';


const App = () => {
  const [name, setName] = useState('Andrey');
    return (
    <div>
      <UserProvider value={{ name, setName }}>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/restaurants" />
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/order-error" component={OrderError} />
          <Route path="/order-success" component={OrderSuccess} />
          <Route path="/" component={() => <h2>404 - Not Found Page :(</h2>} />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
