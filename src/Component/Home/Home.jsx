import "./Home.css";
import "../NavBarHome/NavBarHome.css";
import NavBarHome from "../NavBarHome/NavBarHome";
import PostedCard from "../PostedCard/PostedCard";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  return (
    <>
      <NavBarHome />
      <div className="parent">
      <SearchBar />
      <PostedCard/>
      </div>
    </>
  );
}

