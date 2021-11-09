import React from "react";
import { Button, Form} from "react-bootstrap";
import crypto from "crypto";
import axios from "axios";
import Jeu from "./Jeu";

export default class Accueil extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nickname:"",
            password:"",
            state:"unknown"
        }
    }

    login=()=>{
        let salt = crypto.randomBytes(128).toString('base64');
        let iterations = 10000;
        crypto.pbkdf2(this.state.password, salt, iterations, 64, "sha512",(err, derivedKey) => {
            if (err) throw err;
            axios.post("http://localhost:3002/login", {
                salt: salt,
                hash: derivedKey.toString('hex'),
                iterations: iterations,
                nickname: this.state.nickname
            })
                .then(r => this.setState({state:"success"}))
                .catch(e => this.setState({state:"failed"}));
        });
    }

    setChange = ({target}) => this.setState({[target.id]:target.value});


    render(){
        switch(this.state.state){
            case "success":
                return <Jeu nickname={this.state.nickname}/>
            default:
                return(
                    <div className={"w-25"}>
                        <Form>
                            <Form.Group className="mb-3" controlId="nickname">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Enter Username" value={this.state.nickname} onChange={this.setChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.setChange}/>
                            </Form.Group>
                        </Form>
                        <Button theme={"success"} onClick={this.login}>Log In</Button>
                    </div>
                );
        }

    }
}