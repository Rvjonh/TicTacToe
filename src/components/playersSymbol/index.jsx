import { useState } from "react";
import { useGameState } from "./../../App";

import './style.scss';

export default function PlayersSymbol(){
    const {getPlayer1Symbol, getPlayer2Symbol, handleChangeSymbol, typeGame, turn} = useGameState();

    const [erorrMsj, setErrorMsj] = useState(false);

    const handleCheckChangeSymbol = (e)=>{
        const newSymbol = e.target.value;
        const player = e.target.name;
        
        if(symbolsAreNoEqual(newSymbol, player)){
            handleChangeSymbol(newSymbol, player);
        }else{
            showErrorMessage();
        }
    }

    const symbolsAreNoEqual = (newSymbol,player) => {
        let auxChecker = null;
        if(player === 'player1'){
            auxChecker = getPlayer2Symbol();
        }else{
            auxChecker = getPlayer1Symbol();
        }
        return newSymbol !== auxChecker; 
    }

    const showErrorMessage=()=>{
        setErrorMsj(true);
        setTimeout(()=>{
            setErrorMsj(false);
        },3000)
    }

    return(
        <div className="config">

            {erorrMsj && 
                <div className="error-msj">
                    Same Symbols not allowed!
                    <button className="btn" onClick={()=>setErrorMsj(false)}>❌</button>
                </div>
            }

            <div className="config-symbols">
                <label className='input-tag' htmlFor="player1">
                    <span>Player 1:</span>
                    <input name='player1' 
                            value={getPlayer1Symbol()}
                            onChange={handleCheckChangeSymbol}
                            type="text" placeholder="X"
                            disabled={typeGame ? true : false}
                            maxLength="1"/>
                </label>

                <label className='input-tag' htmlFor="player2">
                    <span>Player 2:</span>
                    <input name='player2' 
                            value={getPlayer2Symbol()}
                            onChange={handleCheckChangeSymbol}
                            type="text" placeholder="O"
                            disabled={typeGame ? true : false}
                            maxLength="1"/>
                </label>
                <span className={`positioner ${turn ? "player1":"player2"}`} />
            </div>

        </div>
    )
}