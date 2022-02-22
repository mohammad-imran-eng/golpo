import {useState} from 'react'
import { Alert, Container,Button,Form,Spinner,Modal } from 'react-bootstrap'
import {Link,useNavigate,useLocation } from 'react-router-dom'
import '../firebaseconfig'
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const {state} = useLocation();
    const notify = () => toast(state);

    const auth = getAuth();
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email,setEmail] = useState("")
    const [erremail,seterrEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errpassword,seterrPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [passwordResetLoading,setpasswordResetLoading] = useState(false)
    const [resetEmail,setResetEmail] = useState("")
    const [errResetEmail,errSetResetEmail] = useState("")

    let handleEmail = (e) => {
      setEmail(e.target.value)
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (e) => {
      e.preventDefault()
      if(email === ""){
        seterrEmail("Please enter an email")
      }
      else if(password === ""){
        seterrPassword("Please enter your passowrd")
      }
      else {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user)
            setLoading(false)
            navigate("/")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
          });
      }
    }

    let handleResetEmail = (e) => {
      setResetEmail(e.target.value)
    }

    let handlePasswordReset = () => {
      if(resetEmail ===""){
        errSetResetEmail("Please give an email")
      }
      else {
        setpasswordResetLoading(true)
        sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          console.log("Password reset email sent!")
          setpasswordResetLoading(false)
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
      <ToastContainer />

        <Alert variant="success" className='text-center'>
            <Alert.Heading>Login for Golpo</Alert.Heading>
        </Alert>
        <Container>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" />
                    <Form.Text className="err">
                    {erremail}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handlePassword} type="password" placeholder="Enter password" />
                    <Form.Text className="err">
                    {errpassword}
                    </Form.Text>
                </Form.Group>


                <Button onClick={handleSubmit} variant="success" className='w-100' type="submit">
                  {loading
                      ?
                      <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      :
                      "Login"
                      }
                </Button>

                <div className='text-center mt-3'>
                <Form.Text className="text-muted">
                  Dont't have an account? <Link to="/registration">Registration</Link>
                </Form.Text>
                </div>

                <div className='text-center mt-3'>
                <Form.Text className="text-muted">
                  Forget your password? <Button onClick={handleShow} variant="danger" size='sm'>Reset</Button>
                </Form.Text>
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  <Modal.Title>Password Reset</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={handleResetEmail} type="email" placeholder="Enter email" />
                </Form.Group>
                    <Form.Text className="err">
                    {errResetEmail}
                    </Form.Text>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlePasswordReset}>
                  {passwordResetLoading
                  ?
                  <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  :
                  "Reset"
                  }
                </Button>
                </Modal.Footer>
              </Modal>
        </Form>
        </Container>
    </>
  )
}

export default Login