import {useState} from 'react'
import { Alert, Container,Button,Form,Spinner } from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import '../firebaseconfig'

const Registration = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [errusername, seterrUsername] = useState("");
    const [email,setEmail] = useState("")
    const [erremail,seterrEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errpassword,seterrPassword] = useState("")
    const [cpassword, setCpassword] = useState("");
    const [errcpassword, seterrCpassword] = useState("");
    const [pMatch,setPmatch] = useState("")
    const [loading,setLoading] = useState(false)

    let handleUsername = (e)=> {
        setUsername(e.target.value)
    }
    let handleEmail = (e) => {
        setEmail(e.target.value)
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
    }
    let handleCpassword = (e) => {
        setCpassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if(username === ""){
            seterrUsername("Enter a username")
        }
        else if(email === ""){
            seterrEmail("Enter an email")
        }
       else if(password === ""){
            seterrPassword("Enter password")
        }
        else if(password !== cpassword){
            setPmatch("password didn't match")
        }
        else {
            setLoading(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                setLoading(false)
                setUsername("")
                seterrUsername("")
                setEmail("")
                seterrEmail("")
                setPassword("")
                seterrPassword("")
                setCpassword("")
                seterrCpassword("")
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log("Email verification sent!")
                    navigate("/login",{state: "Accout created successful"})
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
        }
    }

  return (
    <>
        <Alert variant="success" className='text-center'>
            <Alert.Heading>Registration</Alert.Heading>
        </Alert>
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={handleUsername} type="text" placeholder="Enter username" value={username}/>
                    <Form.Text className="err">
                    {errusername}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" value={email}/>
                    <Form.Text className="err">
                    {erremail}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handlePassword} type="password" placeholder="Enter password" value={password}/>
                    <Form.Text className="err">
                    {errpassword}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={handleCpassword} type="password" placeholder="Confirm password" value={cpassword}/>
                    <Form.Text className="err">
                    {pMatch}
                    </Form.Text>
                </Form.Group>

                <Button onClick={handleSubmit} variant="success" className='w-100' type="submit">
                    {loading
                    ?
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    "Submit"
                    }
                    
                    
                </Button>
                <div className='text-center mt-3'>
                <Form.Text className="text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </Form.Text>
                </div>
        </Form>
        </Container>
    </>
  )
}

export default Registration