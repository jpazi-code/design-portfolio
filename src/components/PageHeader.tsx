import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageHeader.css';

interface PageHeaderProps {
  title: string;
  showWorksLink?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showWorksLink = true }) => {
  return (
    <div className="page-header-container">
      <div className={`page-header-links ${!showWorksLink ? 'single-link' : ''}`}>
        <Link to="/" className="back-link">← Back to Home</Link>
        {showWorksLink && (
          <Link to="/works" className="back-link">← Back to Works</Link>
        )}
      </div>
      <h1 className="page-header-title">{title}</h1>
      <div className="page-header-divider"></div>
    </div>
  );
};

export default PageHeader; 