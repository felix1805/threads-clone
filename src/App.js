import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null)

  const userId = "1ca9589e-c746-4208-b1ff-3d72962dbad1";

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
      const data = await response.json()

      setUser(data[0])

    } catch (error) {
      console.error(error)
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`)
      const data = await response.json()

      setThreads(data)

    } catch (error) {
      console.error(error)
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
      setFilteredThreads(standAloneThreads)
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads)
    }
  };


  useEffect(() => {
    getUser()
    getThreads()
  }, [])

  useEffect(() => {
    getThreadsFeed()
  }, [user, threads, viewThreadsFeed])



  console.log(filteredThreads);

  return (
    <>
      {user && <div className="app">
        <Nav url={user.instagram_url}></Nav>
        <Header
          user={user}
          viewThreadsFeed={viewThreadsFeed}
          setViewThreadsFeed={setViewThreadsFeed}
        ></Header>
        <Feed
        user={user}
        filteredThreads={filteredThreads}
        ></Feed>
        {/* <PopUp></PopUp> */}
      </div>}
    </>
  );
};

export default App;
