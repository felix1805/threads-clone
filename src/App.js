import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";

const App = () => {
  return (
    <div className="app">
      <Nav></Nav>
      <Header></Header>
      <Feed></Feed>
      <PopUp></PopUp>
    </div>
  );
}

export default App;
