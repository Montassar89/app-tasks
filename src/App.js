import './App.css';
import React from 'react';
import Login from './Login';
import useToken from './useToken';
import Tasks from './Tasks';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function App() {
  const logout = () =>{
    setToken()
    localStorage.removeItem('token')
  }
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <div className="w-75 mx-auto mt-4"> 


      <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem active><a href="/#">Tâches</a></BreadcrumbItem>
        <BreadcrumbItem ><a onClick={() => logout()} role="button">Déconnexion</a></BreadcrumbItem>
      </Breadcrumb>
    </div>
      <Tasks />
      {/* <BrowserRouter>
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
