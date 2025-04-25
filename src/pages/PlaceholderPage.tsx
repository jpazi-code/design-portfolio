import { useParams } from 'react-router-dom';
import '../styles/PlaceholderPage.css';

const PlaceholderPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="placeholder-page">
      <h1>Page {id}</h1>
    </div>
  );
};

export default PlaceholderPage; 