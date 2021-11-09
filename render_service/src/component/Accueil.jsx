import React from "react";
import { Button, Form} from "react-bootstrap";
import axios from "axios";
import Jeu from "./Jeu";
import RegisterModal from "./RegisterModal";

export default class Accueil extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nickname:"",
            password:"",
            state:"unknown"
        }
    }
    componentDidMount() {
        if(localStorage.getItem("token"))
            this.checkToken();
    }

    login=()=>{
        axios.post("http://localhost:3002/login",{
            nickname:this.state.nickname,
            password:this.state.password
        }).then(({data})=>{
            localStorage.setItem('token', data.token);
            this.setState({token:data.token},this.checkToken);
        }).catch((e) => {
            this.setState({state:"failed"})
        });
    }

    checkToken=()=>{
        let token = localStorage.getItem("token") || this.state.token;
        axios.post("http://localhost:3003/auth",{token:token}).then(({data})=>{
            this.setState({state:"success"});
        }).catch((e) => {
            this.setState({state:"failed"})
        });
    }

    setChange = ({target}) => this.setState({[target.id]:target.value});


    render(){
        switch(this.state.state){
            case "success":
                return <Jeu />
            default:
                return(
                    <div className={"w-25 d-flex flex-column align-content-between h-50"}>
                        <Form>
                            <Form.Group className="mb-3" controlId="nickname">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={this.state.nickname} onChange={this.setChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.setChange}/>
                            </Form.Group>
                        </Form>
                        <Button variant="outline-success" onClick={this.login}>Log In</Button>
                        <br/>
                        <RegisterModal/>
                    </div>
                );
        }

    }
}