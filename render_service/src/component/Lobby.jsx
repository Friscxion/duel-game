import React from "react";
import axios from "axios";
import mysocket from "../middleware/mysocket";
import {Button, FormControl} from "react-bootstrap";
import Room from "./Room";

export default class Lobby extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            token:{nickname:""},
            code:"",
            room:""
        }
    }
    componentDidMount() {
        mysocket.on("id_room",(room)=>{
            this.setState({room:room});
        })
        this.checkToken();
    }

    checkToken=()=>{
        let token = localStorage.getItem("token") || this.state.token;
        const hostname = new URL(window.location.href).hostname;
        axios.post("http://"+hostname+":3001/auth",{token:token}).then(({data})=>{
            this.setState({state:"success",token:data});
        }).catch((e) => {
            this.props.home.setState({state:"failed"});
            this.setState({state:"failed"});
        });
    }
    
    createLobby = () => {
        mysocket.emit("createLobby")
    }

    joinLobby = () => {
        mysocket.emit("joinLobby", this.state.code)
    }
    

    render() {
        if(this.state.room)
            return(<Room room={this.state.room} socket={mysocket}/>)
        return(
            <>
                <div>
                    <p className={"text-dark my-2"}>Welcome 🙌 : {this.state.token.nickname}</p>
                    <Button onClick={this.createLobby} variant={"outline-dark"} className={"my-2"}>Create a new lobby</Button>
                    <hr/>
                    <FormControl
                        className={"my-2"}
                        placeholder="Code"
                        aria-label="Code"
                        aria-describedby="basic-addon1"
                        id={"code"}
                        value={this.state.code}
                        onChange={({target})=>this.setState({[target.id]:target.value})}
                    />

                    <Button onClick={this.joinLobby} variant={"outline-dark"} className={"my-2"}>Join the lobby</Button>
                </div>


            </>
        );
    }
}