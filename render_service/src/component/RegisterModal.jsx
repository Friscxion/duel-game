import React from "react";
import {Button, Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import axios from "axios";

export default class RegisterModal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nickname:"",
            email:"",
            password:"",
            show:false,
            showToast:false
        }
    }

    setChange = ({target}) => this.setState({[target.id]:target.value});

    changeShow=()=>this.setState({show:!this.state.show});

    register = () =>{
        if(!this.state.nickname || !this.state.password || !this.state.email)
            return this.setState({error:true});
        axios.post("http://localhost:3002/register",{
            nickname:this.state.nickname,
            email:this.state.email,
            password:require("../middleware/hashAndSalt")(this.state.password)
        }).then(({data})=>{
            console.log(data);
            this.setState({showToast:true,show:false});
        }).catch((e)=>{
            this.setState({exist:true})
        })

    }
    render(){
        return(
            <>
                <hr />
                <Button onClick={this.changeShow} variant="outline-success" className={"register"}>
                    Register
                </Button>
                <Modal
                    onHide={this.changeShow}
                    show={this.state.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create a new account
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="nickname">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className={this.state.error&&!this.state.nickname?"border-danger":""} type="text"  placeholder="Enter your username" value={this.state.nickname} onChange={this.setChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className={this.state.error&&!this.state.email?"border-danger":""} type="text" placeholder="Enter your email" value={this.state.email} onChange={this.setChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className={this.state.error&&!this.state.password?"border-danger":""} type="password" placeholder="Enter your password" value={this.state.password} onChange={this.setChange}/>
                            </Form.Group>
                            {this.state.exist?<p className={"text-danger"}>Username already used!</p>:""}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={"d-flex justify-content-center "}>
                        <Button variant="outline-success" onClick={this.register}>Register</Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer className="p-3" position={"bottom-center"}>
                   <Toast show={this.state.showToast} onClose={()=>this.setState({showToast:false})}>
                        <Toast.Header>
                            <strong className="me-auto text-success">Registered !</strong>
                            <small> >1 min</small>
                        </Toast.Header>
                        <Toast.Body>Welcome, you can now connect!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        );
    }
}