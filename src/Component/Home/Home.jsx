import "./Home.css";
import "../NavBar/NavBar.css";
import NavBar from "../NavBar/NavBar";
import PostedCard from "../PostedCard/PostedCard";

function Home() {
  return (
    <>
      <NavBar />
      <div className="parent">
      <PostedCard/>
      </div>
    </>
  );
}
export default Home;
