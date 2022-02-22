import {useState} from 'react'
import { Button } from 'react-bootstrap'
import {Link,useNavigate } from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";

const Home = () => {

  const [verifyEmail, setVerifyEmail] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user)
    if(user.emailVerified){
      setVerifyEmail(true)
    }
    } else {
      console.log("log in kora nai")
    }
  });
  

    let navigate = useNavigate();

      let handleLogout = () => {
        signOut(auth).then(() => {
          console.log("Sign-out successful.")
          navigate("/login")

        }).catch((error) => {
          console.log(error)
        });
  }



  return (
    
      <>
        <p>
          {verifyEmail
          ? 
          <Button onClick={handleLogout} variant='dark'>Logout</Button>
          : 
          <>
          <Button onClick={handleLogout} className='me-2' variant='dark'>Please Verify your email</Button>
          <Button onClick={handleLogout} variant='dark'>Logout</Button>
          </>
          }
        </p>
        
      </>
    
    
  )
}

export default Home