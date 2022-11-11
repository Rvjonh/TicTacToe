import { useState, useEffect, createContext, useContext } from 'react';
import GameBoard from '../components/gameboard';
import BlockPanel from '../components/blockPanel';
import './style.scss';
import Header from './../components/header';
import PlayersSymbol from './../components/playersSymbol';
import ResetButton from './../components/resetButton';
import Subtitle from './../components/subtitle';

const GameProvider = createContext();
export const useGameState = ()=>useContext(GameProvider)

export default function App(){
    const [typeGame, setTypeGame] = useState("");
    const [gameLvl, setGameLvl] = useState('');
    const [symbols, setSymbols] = useState({player1: 'X', player2:'O'});
    const [turn, setTurn] = useState(true);
    const [slots, setSlots] = useState(["","","","","","","","",""]);
    const [moves, setMoves ] = useState(4);//countdown to start evaluating who wins ...

    const [shakeFlag, setShakeFlag] = useState({play:false, class:""});
    const [animationFlag, setAnimationFlag] = useState("");
    const [winner, setWinner] = useState("");


    const getPlayer1Symbol = ()=>{
        return symbols.player1;
    }

    const getPlayer2Symbol = ()=>{
        return symbols.player2;
    }

    const handleChangeSymbol = (newSymbol=null, player=null)=>{
        if(newSymbol===null || player==null) throw Error("Required Symbol and played to signed!");
        setSymbols({...symbols, [player]:newSymbol})
    }

    const handleReset=()=>{
        setTypeGame("");
        resetGame();
    }

    const resetGame=()=>{
        setSlots(["","","","","","","","",""]);
        setMoves(4);
        setAnimationFlag("");
        setWinner("");
    }

    const ShakeControls = ()=>{
        if(!shakeFlag.play){
            setShakeFlag({play:true, class:"shake"});
            setTimeout(()=>{
                setShakeFlag("");
            },1000)
        }
    }

    const getShakeClass=()=>{
        return shakeFlag.class;
    }

    const handle2Player = ()=>{
        setTypeGame("2Players");
        resetGame();
    }
    const handleComputer = ()=>{
        setTypeGame("Computer")
        resetGame();
    }

    return(
        <GameProvider.Provider value={{ 
                                        slots, setSlots, 
                                        winner, setWinner,
                                        moves, setMoves,
                                        animationFlag, setAnimationFlag,
                                        getPlayer1Symbol, getPlayer2Symbol, 
                                        handleChangeSymbol,
                                        typeGame, setTypeGame,
                                        gameLvl, setGameLvl,
                                        turn, setTurn,
                                        ShakeControls,
                                        getShakeClass,
                                        handleReset,
                                        handle2Player,
                                        handleComputer,
                                    }}>
        <main className="game">

            <Header />

            <PlayersSymbol />

            <figure className="tictactoe-animation">

                {!typeGame && <BlockPanel />}

                <GameBoard />

                {typeGame && <ResetButton />}
            </figure>

            <Subtitle />

        </main>
    </GameProvider.Provider>
    )
}