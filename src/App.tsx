import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.tsx';
import WorksPage from './pages/WorksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LogosPage from './pages/LogosPage';
import IllustrationsPage from './pages/IllustrationsPage';
import PostersPage from './pages/PostersPage';
import InfographicsPage from './pages/InfographicsPage';
import PhotographyPage from './pages/PhotographyPage';
import PublicationsPage from './pages/PublicationsPage';
import OtherPublicationsPage from './pages/OtherPublicationsPage';
import ProfilePage from './pages/ProfilePage';
import PlaceholderPage from './pages/PlaceholderPage';
import MotionEditsPage from './pages/MotionEditsPage';
import VideoEditsPage from './pages/VideoEditsPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Gallery pages */}
          <Route path="/logos" element={<LogosPage />} />
          <Route path="/illustrations" element={<IllustrationsPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/infographics" element={<InfographicsPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/motion-edits" element={<MotionEditsPage />} />
          <Route path="/video-edits" element={<VideoEditsPage />} />
          
          {/* Publications Pages */}
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/other-publications" element={<OtherPublicationsPage />} />
          <Route path="/publications/:slug" element={<ProfilePage />} />
          
          {/* Additional pages with placeholder components for now */}
          <Route path="/edits" element={<PlaceholderPage />} />
          <Route path="/portraits" element={<PlaceholderPage />} />
          <Route path="/tech" element={<PlaceholderPage />} />
          
          {/* Fallback for other pages */}
          <Route path="/page:id" element={<PlaceholderPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
