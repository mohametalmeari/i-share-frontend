import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Signup from './routes/Signup';
import NewPost from './routes/NewPost';
import ShowPhoto from './routes/ShowPhoto';
import Profile from './routes/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="new" element={<NewPost />} />
        <Route path="photos/:id" element={<ShowPhoto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
