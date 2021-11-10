import React from "react";

export default class Room extends  React.Component{
    constructor(props) {
        super(props);
        this.state={
            nb_player:0
        }
    }
    componentDidMount() {
        this.props.socket.on("nb_player",(nb)=>{
            this.setState({nb_players:nb})
        })
        this.props.socket.emit("nb_player",this.props.room);
    }

    render() {
        return(
            <>
                <div className={"d-flex flex-column"}>
                    <div>Room Id: {this.props.room}</div>
                    <div>Nb players : {this.state.nb_players}</div>
                </div>
            </>
        )
    }
}