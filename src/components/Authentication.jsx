import { auth, provider } from '../firebase/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'

const Auth = ({ setIsAuth }) => {
    const handleSign = () => {
        signInWithPopup(auth, provider)
            .then((res) => { //localstorage ekleme ilki key ikincisi id
                localStorage.setItem("token", res.user.refreshToken)

                setIsAuth(true)//App den geldi true olunca chat odasına gidecek
            })
    }


    return (
        <div className="auth">
            <div className='logo m-2'>
                <img src="src/assets/chats.jpeg" alt="" />
                <h3 >ChatsApp</h3>
            </div>
            <p className="read-the-docs">
                Sign In
            </p>
            <button className='btn btn-outline-success' onClick={handleSign}
            > <img className='btn-img' src="src/assets/google.png" alt="" />Continue With Google</button>
        </div>
    )
}

export default Auth