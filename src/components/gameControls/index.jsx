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
        return gameLvl==='easy' ? 'π­':'π‘';
    }

    return(
        <div className={`controls ${getShakeClass()}`}>
            
            {!requestGameLvl ?
                <>
                    <button onClick={handle2Player} className="btn">π 2 Players π</button>
                    <div>
                        <button onClick={handleGameLvl} className="btn">π€ Vs Computer π»</button>
                        {gameLvl && 
                            <button onClick={handleGameLvlAgain} title={`Use Game lvl: ${gameLvl}${getIconGameLvl()}`} className="btn btn-red">π{getIconGameLvl()}</button>
                        }
                    </div>
                </>
            :
                <>
                    <button onClick={handleSetGameLvl} data-lvl='easy' className="btn btn-green">π­EASYπ</button>
                    <button onClick={handleSetGameLvl} data-lvl='hard' className="btn btn-red">π‘HARDπ₯</button>
                </>
            }
        </div> 
    )
}