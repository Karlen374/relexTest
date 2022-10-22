import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from 'src/components/appHeader/appHeader';
import TestsPage from 'src/components/pages/TestsPage';
import UsersPage from 'src/components/pages/UsersPage';
import styles from './app.module.scss';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<TestsPage />} />
          <Route path="/userPage" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
