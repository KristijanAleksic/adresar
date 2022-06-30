import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import EditContactPage from './pages/EditContactPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AuthContext from './store/auth-context';

function App() {
 const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <ToastContainer position='top-center' />
      <Switch>
        {!authCtx.isLoggedIn && <Route exact path="/">
          <Redirect to="/auth"/>
        </Route>}
        {authCtx.isLoggedIn && <Route exact path="/">
          <Redirect to="/adresar"/>
        </Route>}
        {authCtx.isLoggedIn && <Route path='/adresar' exact>
          <HomePage />
        </Route>}
        {!authCtx.isLoggedIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/profile'>
          <UserProfile />
        </Route>)}
        {authCtx.isLoggedIn && (<Route exact path='/kontakt'>
          <EditContactPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route exact path='/kontakt/update/:id'>
          <EditContactPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route exact path='/kontakt/detalji/:id'>
          <ContactPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route exact path='/kontakt/search'>
          <SearchPage/>
        </Route>)}
        <Route path="*">
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
