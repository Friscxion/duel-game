import React from "react";
import { Button, Form, FormGroup, FormInput } from "shards-react";
import crypto from "crypto";
import axios from "axios";
import Jeu from "./Jeu";

export default class Acceuil extends React.Component{
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
            axios.post("http://localhost:3002/connect", {
                salt: salt,
                hash: derivedKey.toString('hex'),
                iterations: iterations,
                nickname: this.state.nickname
            })
                .then(r => this.setState({state:"success"}))
                .catch(e=>this.setState({state:"failed"}));
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
                            <FormGroup>
                                <label htmlFor="#username">Username</label>
                                <FormInput id="nickname" placeholder="Username" value={this.state.nickname} onChange={this.setChange}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="#password">Password</label>
                                <FormInput type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.setChange} />
                            </FormGroup>
                        </Form>
                        <Button theme={"success"} onClick={this.login}>Log In</Button>
                    </div>
                );
        }

    }
}