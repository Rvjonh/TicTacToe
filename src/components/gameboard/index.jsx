import { useEffect, useState } from 'react';
import { useGameState } from './../../App';
import Checker from './checkboard';
import * as Computer from './ComputerIA.js';
import { RobotThinking } from './robot';

import './style.scss';

export default function GameBoard(){
    const {slots, setSlots, moves, setMoves, getPlayer1Symbol, getPlayer2Symbol, turn, setTurn, typeGame, setTypeGame, gameLvl, setWinner, animationFlag, setAnimationFlag } =  useGameState();

    const [computerThinking, setComputerThinking] = useState(false);

    const handleCheckMark = (e)=>{
        if( typeGame === "2Players" ){
            playTwoPlayers(e);
        }else if( typeGame === 'Computer' ){
            playWithComputer(e);
        }else{
            console.log("Game Error, not found type of game!")
        }
    }

    useEffect(()=>{
        if(!turn && typeGame==='Computer'){
            setComputerThinking(true)
            setTimeout(()=>{
                const huPlayer = getPlayer1Symbol();
                const iaPlayer = getPlayer2Symbol();

                let computerMark = null
                if(gameLvl==="hard"){
                    computerMark = Computer.getBestIndex(slots, huPlayer, iaPlayer);
                }else{
                    computerMark = Computer.getIndex(slots);
                }

                setMarkIn(computerMark, iaPlayer!=""? iaPlayer : 'O');
                setTurn(!turn);
                setComputerThinking(false)
            },500)
        }
    },[turn, typeGame])

    const playTwoPlayers=(e)=>{
        const index = e.target.dataset.value ?? false;
        if(isAvailable(index)){
            const PlayerTurn = turn;

            if( PlayerTurn ){
                const Player1Symbol = getPlayer1Symbol();
                setMarkIn(index, Player1Symbol !="" ? Player1Symbol:'X');
            }else{
                const Player2Symbol = getPlayer2Symbol();
                setMarkIn(index, Player2Symbol!=""? Player2Symbol : 'O');
            }
            setTurn(!PlayerTurn);
        }
    }
    const isAvailable = (index)=>{
        return index && slots[index]==="";
    }

    const playWithComputer=(e)=>{
        if(turn){
            playTwoPlayers(e);
        }
    }

    const setMarkIn=(index=null, symbol=null)=>{
        if(index===null) throw Error("Must indicate index for the symbol");
        if(index===null) throw Error("Must indicate symbol to add");

        let newSlots = [...slots];
        newSlots[index] = symbol;
        setSlots(newSlots)

        if(moves>0){
            setMoves(moves-1);
        }else{
            handleWinning(newSlots);
        }
    }

    const handleWinning=(arr=[])=>{
        const crossLine = Checker(arr);
        if(crossLine){
            setAnimationFlag(crossLine);
            if(typeGame === '2Players'){
                setWinner(turn ? "player1":"player2")
            }else if(typeGame === 'Computer'){
                setWinner(turn ? "player1":"computer")
            }
            setTypeGame("");
        }else if(isTIE(arr)){
            setAnimationFlag("");
            setWinner("TIE")
            setTypeGame("");
        }
    }
    const isTIE = (arr)=>{
        return !arr.filter((item)=>{
            return item === '';
        }).length;
    }

    const getColorMark=(item)=>{
        if(item === getPlayer1Symbol()){
            return 'slot-player1';
        }else if(item === getPlayer2Symbol()){
            return 'slot-player2';
        }
        return 'slot-player-void';
    }

    return(
        <div className="game-board" onClick={handleCheckMark}>

            {computerThinking && <RobotThinking />}

            <div className={`animation-line ${animationFlag}`} />

            {slots.map((item, index)=>{
                return <span key={`slot-${index}`} 
                            className={`slot ${'slot'+(index+1)} ${getColorMark(item)}`}
                            data-value={index}
                        >
                        {item}
                    </span>
            })}

            <div className='div10' />
            <div className='div11' />
            <div className='div12' />
            <div className='div13' />

        </div>
    )
}