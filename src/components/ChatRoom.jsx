import React, { useEffect, useState } from 'react'
import { BiSolidSend } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import { auth, db } from '../firebase/firebaseConfig'
import { addDoc, collection, onSnapshot, orderBy, query, where, serverTimestamp } from 'firebase/firestore'
import Chat from './Chat'


const ChatRoom = ({ room,setIsAuth }) => {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [change, setChange] = useState(false)

  const dbMessages = collection(db, "messages")//firebase de messages kısmını aldık

  const handleChange =()=>{
    setChange(true)
    setIsAuth(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) return // input içi boşsa ekleme yapmaz

    addDoc(dbMessages, {//messagesin içinde document bilgilerini ekliyoruz
      text,
      user: auth.currentUser.displayName,
      room,
      time: serverTimestamp()//firebase time
    })//firebse de document ekleme yapıyoruz

    setText("");//inputa value(newMessage) verip temizleme işlemi yapıyoruz
  };
  useEffect(() => {//kolleksiyondaki değişimi izlemek için
    const queryMessage = query(//arama sıralama için
      dbMessages,
      where("room", "==", room),//firebase da olanı buraya yazdık
      orderBy("time")// zamana göre sıraladı
    )
    onSnapshot(queryMessage, (snapshot) => {//dökümandaki değişimi izler
      const comingMessages = [];//dizi oluşturduk push ile içine ekleyecez
      snapshot.forEach((doc) => {//snapshot son değerdir queryMessage içinde forEach ile dönüyoruz herbir elemana doc dedik
        comingMessages.push(doc.data());//doc'un verisine ulaşmak için data() kullanılır  
      });//firebasedeki elemanların değerine ulaşmak için data()fonk.yazılır
      setMessages(comingMessages)//state aktardık
    })
  }, [])
  if (!change)
  
    return (
      <div className='room'>
        <div className="room-header d-flex justify-content-between align-items-center">
          <div className='d-flex align-items-center justify-content-center'>
            <img src="src/assets/chats.jpeg" alt="" />
            <h3 className='text-light'>{room}</h3>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <img className='rounded-circle' src={auth.currentUser.photoURL} alt="" />
            <h5 className='user-name'> {auth.currentUser.displayName}</h5>
          </div>



          <button onClick={handleChange} className='btn btn-outline-danger rounded-pill'>Exit</button>


        </div>
        <div className="messages mb-2 py-3">
          {messages.map((item, index) => (
            
            <div key={index} className='message-area'>
              {
                
                auth.currentUser.displayName === item.user ? (
                  <div className='user-message d-flex align-self-end'>
                    <p className=' rounded mx-4 px-2'>
                    <span className='fst-italic d-block small'>{item.user} </span>
                    <span>{item.text} </span>
                    <span className='message-time ms-2'>{}</span>
                  </p>
                  </div>
                  
                  
                ) : (
                  <div className='sender-message d-flex'>
                    <img className='rounded-circle mx-3' src={auth.currentUser.photoURL} alt="" />
                    <p className='rounded px-2'>
                    <span className='fst-italic d-block small'>{item.user} </span>
                    <span>{item.text} </span>
                    <span className='message-time ms-2'>{}</span>
                  </p>
                  </div>
                )
              }
            </div>
          ))}

        </div>
        <form className='d-flex' action=""
          onSubmit={handleSubmit}
        >
          <div className='w-100 d-flex'>
            <button className='btn btn-light rounded-start-pill'><BsEmojiSmile /></button>
            <input className='input-message w-100'
              value={text}//iputu temizlemek için verdik
              type="text"
              placeholder='Message'
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className='btn btn-light rounded-end-pill '><GrAttachment /></button>
          </div>

          <button className='btn change-btn rounded-circle mx-3'><BiSolidSend /></button>
        </form>
      </div>
    )
  return (
    <Chat/>
  )
}

export default ChatRoom