import React from "react";
import jwt_decode from "jwt-decode";

export default class Jeu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nickname:""
        }
    }

    componentDidMount() {
        let token=jwt_decode(localStorage.getItem("token"));
        this.setState({nickname:token.nickname});
    }

    render(){
        return(
            <div>
                Bienvenue : {this.state.nickname}
            </div>
        );
    }
}