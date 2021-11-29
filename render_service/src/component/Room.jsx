import React from "react";
import Game from "./Game";

export default class Room extends  React.Component{
    constructor(props) {
        super(props);
        this.state={
            init:false,
            nb_player:0,
            player:""
        }
    }
    componentDidMount() {
        this.props.socket.on("nb_player",(nb)=>{
            let player=!this.state.init?{
                player:(nb===1?"X":false)||(nb===2?"O":"spectator")
            }:{}
            let newState={
                nb_players:nb,
                init:true,
                ...player
            };
            console.log(newState)
            this.setState(newState);
        })
        this.props.socket.emit("nb_player",this.props.room);
    }

    render() {
        return(
            <div>
                <div className={"d-flex h-50 flex-column justify-content-between"}>
                    <div className={"mb-5"}>
                        <h5>Room Id: {this.props.room}</h5>
                        <p>Nb players : {this.state.nb_players}</p>
                    </div>
                    <hr/>
                    <Game player={this.state.player} id={this.props.id} socket={this.props.socket} players={this.state.nb_players}/>
                </div>
            </div>
        )
    }
}