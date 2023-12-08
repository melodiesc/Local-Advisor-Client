import "./Home.css";
import "../NavBar/NavBar.css";
import NavBar from "../NavBar/NavBar";
import PostedCard from "../PostedCard/PostedCard";
import SearchBar from "../SearchBar/SearchBar";

function Home() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <div className="parent">
      <PostedCard/>
      </div>
    </>
  );
}
export default Home;
