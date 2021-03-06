import React from 'react'
import Board from './board'
import {Button} from "react-bootstrap";
import axios from "axios";

const isWon = (board) => {
    // list of postion that is winning
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // checking each of the postition seeing if the combination is there
    // if it does return the True
    // else return false
    for (let i=0; i< lines.length; i++) {
        let [a, b, c] = lines[i];
        //console.log(board[a] === board[b] && board[a] === board[c])
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return false;
}

export default class Game extends React.Component{
    // this is for board
    // default value for all the elemnt is ""
    constructor(props) {
        super(props);

        this.state={
            board:Array(9).fill(""),
            player:props.player,
            win:false
        }
    }
    componentDidMount() {
        this.props.socket.on("board_change",(boardChange)=>{
            if(boardChange.join(".")!==[...this.state.board].join(".")) {
                let winner = {};
                if (boardChange.join(".") === ".........") winner = {winner:false};
                this.setState({board: boardChange, ...winner})
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const hostname = new URL(window.location.href).hostname;
        let token = localStorage.getItem("token");
        axios.post("http://"+hostname+":3001/refresh",{token:token}).then(({data})=>localStorage.setItem("token",data.token.token)).catch(console.error);

        if(prevProps.player!==this.props.player)
            this.setState({player:this.props.player});
        if(prevState.board.join(".")!==[...this.state.board].join("."))
            this.setState({win:isWon(this.state.board)})
    }

    pass=()=>{
        this.props.socket.emit("board_change",this.state.board)
    }

    handleClick=(pos)=>{
        if(this.props.players<2)return;
        if(this.state.win)return;
        if(!(this.state.player==="X" || this.state.player==="O")) return;
        if(!this.shouldIPlay())return;
        let board = [...this.state.board];
        if(!board[pos]) {
            board[pos] = this.state.player;
            this.setState({board:board},this.pass);
        }
    }
    restart=()=>{
        this.setState({
            winner:false,
            board:Array(9).fill("")
        },this.pass)
    }

    shouldIPlay = () =>{
        let board = [...this.state.board];
        let player=board.reduce((a, v) => (v === this.state.player ? a + 1 : a), 0);
        let enemy=board.reduce((a, v) => (v === (this.state.player==="X"?"O":"X") ? a + 1 : a), 0);
        if(!((player<enemy) || (this.state.player==="X"?player<=enemy:false)))return false;
        else return true;
    }
    render(){
        let winner= this.state.win;
        let remplie=true;
        this.state.board.forEach((cas)=>{
            if(!cas)remplie=false;
        })

        return (
            <div  className={"mt-5"}>
                <div>
                    <h2 className={"font-weight-bold"}>Player : {this.state.player}</h2>
                    {!winner&&!remplie?(this.shouldIPlay()?<h6 className={"text-success"}>Your turn!</h6>:<h6 className={"text-warning"}>Waiting for...</h6>):null}
                </div>
                <Board onClick={this.handleClick} value={this.state.board} />
                {winner?
                    <div>
                        <div className={"text-white "+(this.state.player===winner?"bg-success":"bg-danger")}>
                           {this.state.player===winner?"Won":"Lose"}
                        </div>
                        <Button variant={"outline-dark"} onClick={this.restart}>Restart</Button>
                    </div>
                    :null}
                {remplie&&!winner?
                    <div>
                        <div className={"text-white bg-dark"}>
                            Draw
                        </div>
                        <Button variant={"outline-dark"} onClick={this.restart}>Restart</Button>
                    </div>
                    :null}
            </div>);
    }

}
