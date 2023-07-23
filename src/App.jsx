import { useState } from "react"
import Auth from "./components/Authentication"
import Chat from "./components/Chat"

function App() {
  //localstorage da token varsa useState true oluyor
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"))
  if(!isAuth)
  return (
    <>
      <Auth setIsAuth={setIsAuth} />
    </>
  )
  return(
    <div>
      <Chat setIsAuth={setIsAuth}/>
    </div>
  )
}

export default App
