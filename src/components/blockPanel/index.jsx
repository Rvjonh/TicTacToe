import { useEffect, useState } from "react";
import { useGameState } from "./../../App";
import GameControls from './../gameControls';
import './style.scss';

export default function BlockPanel({...props}){
    const {getPlayer1Symbol, getPlayer2Symbol, ShakeControls, winner} = useGameState();

    const [WinnerMsj, setWinnerMsj] = useState(null);

    useEffect(()=>{
        let msj = null;
        if(winner==='player1'){
            msj = `🌟Player 1 Won! with '${getPlayer1Symbol()}'🌟`;
        }else if(winner==='player2'){
            msj = `🌟Player 2 Won! with '${getPlayer2Symbol()}'🌟`; 
        }else if(winner==='computer'){
            msj = `🤖Computer Won! with '${getPlayer2Symbol()}'🌟`; 
        }else if(winner==='TIE'){
            msj = "😲It's a TIE🥴";
        }
        setWinnerMsj(msj)
    },[winner])

    return <div onClick={ShakeControls} {...props} className="blockpanel">
        {winner && 
            <p className="final-msj">
                { WinnerMsj }
            </p>
        }
        <GameControls />
    </div>
}