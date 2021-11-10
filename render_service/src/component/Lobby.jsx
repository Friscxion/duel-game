import React from "react";
import axios from "axios";
import {Button, FormControl} from "react-bootstrap";

export default class Lobby extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            token:{nickname:""},
            code:""
        }
    }
    componentDidMount() {
       this.checkToken();
    }

    checkToken=()=>{
        let token = localStorage.getItem("token") || this.state.token;
        axios.post("http://localhost:3001/auth",{token:token}).then(({data})=>{
            console.log(data)
            this.setState({state:"success",token:data});
        }).catch((e) => {
            this.props.home.setState({state:"failed"});
            this.setState({state:"failed"});
        });
    }

    render() {
        return(
            <>
                <div>
                    <p className={"text-dark my-2"}>Welcome 🙌 : {this.state.token.nickname}</p>
                    <Button variant={"outline-dark"} className={"my-2"}>Create a new lobby</Button>
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

                    <Button variant={"outline-dark"} className={"my-2"}>Join the lobby</Button>
                </div>


            </>
        );
    }
}