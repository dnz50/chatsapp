import React, { useRef, useState } from 'react'
import ChatRoom from './ChatRoom'


const Chat = ({ setIsAuth }) => {

  const inputRef = useRef()
  const [room, setRoom] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false)
  }

  return (
    <div >
      {room ? (
        <ChatRoom room={room} setIsAuth={setIsAuth} />
      ) : (
        <div className="chat-container p-2">
          <div className='logo m-2'>
            <img src="src/assets/chats.jpeg" alt="" />
          <h4 >ChatsApp Room</h4>
          </div>
          
          <p className='m-2'>Select Room</p>
          <input className='m-2 w-50 rounded' type="text" ref={inputRef} />
          <button className='btn btn-outline-success rounded-pill m-2 w-50'
            onClick={() => setRoom(inputRef.current.value)}
          >Join</button>
          <button className='btn btn-outline-danger rounded-pill m-2 w-50'
            onClick={handleLogout}
          >Exit</button>
        </div>
      )}
    </div>
  )
}

export default Chat