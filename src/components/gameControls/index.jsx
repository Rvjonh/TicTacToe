import { useState } from "react";
import { useGameState } from "../../App"

import './style.scss';

export default function GameControls(){
    const { getShakeClass, handle2Player, handleComputer, gameLvl, setGameLvl} = useGameState();

    const [requestGameLvl, setRequestGameLvl] = useState(false);

    const handleGameLvl =()=>{
        setRequestGameLvl(true);
    }

    const handleSetGameLvl=(e)=>{
        const difficultForComputerGame = e.target.dataset.lvl;
        setGameLvl(difficultForComputerGame);
        handleComputer();
    }
    
    const handleGameLvlAgain =()=>{
        handleComputer();
    }

    const getIconGameLvl=()=>{
        return gameLvl==='easy' ? '🍭':'😡';
    }

    return(
        <div className={`controls ${getShakeClass()}`}>
            
            {!requestGameLvl ?
                <>
                    <button onClick={handle2Player} className="btn">😀 2 Players 😎</button>
                    <div>
                        <button onClick={handleGameLvl} className="btn">🤖 Vs Computer 💻</button>
                        {gameLvl && 
                            <button onClick={handleGameLvlAgain} title={`Use Game lvl: ${gameLvl}${getIconGameLvl()}`} className="btn btn-red">🔄{getIconGameLvl()}</button>
                        }
                    </div>
                </>
            :
                <>
                    <button onClick={handleSetGameLvl} data-lvl='easy' className="btn btn-green">🍭EASY🎈</button>
                    <button onClick={handleSetGameLvl} data-lvl='hard' className="btn btn-red">😡HARD💥</button>
                </>
            }
        </div> 
    )
}