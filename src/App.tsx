import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.tsx';
import LogosPage from './pages/LogosPage';
import IllustrationsPage from './pages/IllustrationsPage';
import PostersPage from './pages/PostersPage';
import InfographicsPage from './pages/InfographicsPage';
import PhotographyPage from './pages/PhotographyPage';
import PublicationsPage from './pages/PublicationsPage';
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
          <Route path="/works" element={<div className="placeholder-page"><h1>Works</h1></div>} />
          <Route path="/about" element={<div className="placeholder-page"><h1>About</h1></div>} />
          <Route path="/contact" element={<div className="placeholder-page"><h1>Contact</h1></div>} />
          
          {/* Gallery pages */}
          <Route path="/logos" element={<LogosPage />} />
          <Route path="/illustrations" element={<IllustrationsPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/infographics" element={<InfographicsPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/motion-edits" element={<MotionEditsPage />} />
          <Route path="/video-edits" element={<VideoEditsPage />} />
          
          {/* Social Media Publications */}
          <Route path="/publications" element={<PublicationsPage />} />
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
