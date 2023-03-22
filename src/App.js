import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import Home from './pages/Home';
import NotFound from './errors/NotFound';
import config from './config';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to={config.defaultPath} />} />

        {/* Routes */}
        <Route path="/home" element={<Layout><Home /></Layout>} />

        {/* Route for not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
