import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import SocialLogin from './components/SocialLogin/SocialLogin';
import TodoList from './components/TodoList/TodoList';
import MyTodo from './components/MyTodo/MyTodo'
import RequireAuth from './components/RequireAuth/RequireAuth'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todotask' element={
          <RequireAuth>
            <MyTodo/>
          </RequireAuth>
        }/>
        <Route path='/sociallogin' element={
            <SocialLogin/>
        }/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
