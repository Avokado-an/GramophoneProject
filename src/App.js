import './App.css';
import Login from './pages/auth/Login'
import CurrentUserProfile from './pages/CurrentUserProfile'
import Registration from './pages/auth/Registration';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import Users from './pages/Users'
import UserProfile from './common/entity/user/UserProfile'

function App() {
  /**
   * todo 
   * 1. Implement chat and messaging
   * 2. Resolve issue with error message on login/registration
   * 3. log out should disable cookie. If no cookie available, automatically send to login page
   * 4. In future make likes work properly(separate entity)
   * 5. add owner name, id and photo
   * 6. Invalid redirection from url different only in terms of dynamic part(example: profileId)
   * 7. Implement filtering and sorting
   */
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/profile' element={<CurrentUserProfile />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/newsFeed' element={<NewsFeed />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
