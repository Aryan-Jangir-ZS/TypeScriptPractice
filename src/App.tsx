import useImage from './Hook/useImage';
import ImageCarousel from './Components/ImageCarousel';
import "./App.css"

const App = () => {
  const { data, error, isLoading } = useImage('http://localhost:3000/images');

  if (isLoading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images: {error.toString()}</div>;

  return <ImageCarousel data={data}/>;
};

export default App;