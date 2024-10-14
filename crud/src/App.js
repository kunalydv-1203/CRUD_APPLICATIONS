import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import LoginAndRegiPage from './pages/LandRpage';
import UserProfilePage from './pages/profileupdatepage';
import UserProfileCardPage from './pages/userprofilecardpage';



function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/userlogin" />} /> 
      <Route path='/userlogin' element = {<LoginAndRegiPage/>}/>
      <Route path='/userregi' element = {<LoginAndRegiPage/>} />
      <Route path='/userprofileupdate' element = {<UserProfilePage/>} />
      <Route path='/userprofilecard' element = {<UserProfileCardPage/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
