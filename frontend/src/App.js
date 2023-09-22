import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListUsers from './components/pages/ListUsers';
import RegisterUser from './components/pages/RegisterUser';
import EditUsers from './components/pages/EditUsers';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ListUsers />} />
          <Route path="/ListUser" element={<ListUsers />} />
          <Route path="/EditUsers/:id" element={<EditUsers />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
