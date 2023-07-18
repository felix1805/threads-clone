import Thread from "./Thread";

const Feed = ({ user, filteredThreads }) => {
  return (
    <div className="feeds">

      {filteredThreads.map(filteredThread => 
        <Thread key={filteredThread.id} user={user} filteredThread={filteredThread}/>)}
    </div>
  )
}

export default Feed;

