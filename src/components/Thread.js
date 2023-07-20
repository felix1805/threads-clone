import { useState, useEffect } from "react";
import moment from 'moment';

const Thread = ({ user, filteredThread, setOpenPopUp, getThreads, setInteractingThread }) => {
  const [replyLength, setReplyLength] = useState(null)
  const timePassed = moment().startOf('day').fromNow(filteredThread.timestamp)

  const handleClick = () => {
    setOpenPopUp(true)
    setInteractingThread(filteredThread)
  }

  const postLike = async () => {
    const hasBeenLikedByUser = filteredThread.likes.some(like => like.user_uuid === user.user_uuid)
    if (!hasBeenLikedByUser) {
      filteredThread.likes.push({ user_uuid: user.user_uuid })

      try {
        const response = await fetch(`http://localhost:3000/threads/${filteredThread.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredThread)
          })
        const result = await response.json()
        console.log("success", result)
        getThreads()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getRepliesLength = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?reply_to=${filteredThread?.id}`)
      const data = await response.json()
      setReplyLength(data.length)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRepliesLength()
  }, [filteredThread])
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="profile-avatar" />
          </div>
          <div>
            <p><strong>{user.handle}</strong></p>
            <p>{filteredThread.text}</p>
          </div>
        </div>
        <p className="sub-text">{timePassed}</p>
      </div>
      <div className="icons">
        <svg onClick={postLike} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" /></svg>
        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" /></svg>
      </div>
      <p className="sub-text"><span onClick={handleClick}>{replyLength} replies</span> • <span>{filteredThread.likes.length}</span></p>
    </article>
  )
}

export default Thread;
