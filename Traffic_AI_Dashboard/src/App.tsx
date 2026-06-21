import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ResourcePlanning from './pages/ResourcePlanning';
import PostEventAnalysis from './pages/PostEventAnalysis';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/resource-planning" element={<ResourcePlanning />} />
          <Route path="/post-event-analysis" element={<PostEventAnalysis />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
