import React from "react";

export default class Jeu extends React.Component{

    render(){
        return(
            <div>
                Bienvenue : {this.props.nickname}
            </div>
        );
    }
}