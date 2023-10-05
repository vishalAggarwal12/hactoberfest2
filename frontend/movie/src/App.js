import "./App.css";
import HomePage from "./components/HomePage";
import MovieFetch from "./components/Moviefetch";
function App() {
  return (
    <div className="App">
      Movie App
      <HomePage />
      <MovieFetch />
    </div>
  );
}

export default App;
