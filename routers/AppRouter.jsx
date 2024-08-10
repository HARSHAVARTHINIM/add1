import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Error, ViewGameAll, ViewGameDetails, ViewStoreAll, ViewStoreDetails, ViewCreatorAll } from '../views/index';
import BaseLayout from "../layouts/BaseLayout";
import Board from '../views/creator/Game1Page/components/Board/Board.component';
import Signup from '../logsign/Signup';
import Game4Page from '../views/creator/Game4Page';
import Game5Page from '../views/creator/Game5Page';
import Login from '../logsign/Login';
import Game8Page from '../views/creator/Game8Page';
import Entry from '../logsign/Entry';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Wrap routes that need Navbar and Footer with BaseLayout */}
        <Route path="/home" element={<BaseLayout />} />
          {/*<Route index element={<Home />} />*/}
          <Route path="entry" element={<Entry />} />
          <Route path="signup" element={<Signup />} />
          <Route path="games" element={<ViewGameAll />} />
          <Route path="games/:gameId" element={<ViewGameDetails />} />
          <Route path="stores" element={<ViewStoreAll />} />
          <Route path="stores/:storeId" element={<ViewStoreDetails />} />
          <Route path="creators" element={<ViewCreatorAll />} />
          <Route path="card1" element={<Board />} />
          <Route path="card4" element={<Game4Page />} />
          <Route path="card5" element={<Game5Page />} />
          <Route path="card8" element={<Game8Page />} />
        
        {/* Static game routes */}
        <Route path="/game1" element={<iframe src="/game1.html" title="Game 1" style={{ width: '100%', height: '100vh', border: 'none' }} />} />
        <Route path="/game2" element={<iframe src="/game2.html" title="Game 2" style={{ width: '100%', height: '100vh', border: 'none' }} />} />
        <Route path="/game3" element={<iframe src="/game3.html" title="Game 3" style={{ width: '100%', height: '100vh', border: 'none' }} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
