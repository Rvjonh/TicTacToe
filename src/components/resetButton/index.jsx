import { useGameState } from "./../../App";

import './style.scss';

export default function ResetButton(){
    const {handleReset} = useGameState();

    return(
        <button className='btn resetButton' onClick={handleReset}>
            ❌
        </button>
    )
}