import "./Home.css";
import "../NavBarHome/NavBarHome.css";
import NavBarHome from "../NavBarHome/NavBarHome";
import PostedCard from "../PostedCard/PostedCard";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  return (
    <>
      <NavBarHome />
      <SearchBar />
      <div className="parent">
      <PostedCard/>
      </div>
    </>
  );
}

