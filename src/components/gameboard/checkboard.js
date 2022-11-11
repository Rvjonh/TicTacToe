
export default function Checker(arr){

    if(checkFirstColumn(arr)){
        return("first-column")
    }else if(checkSecondColumn(arr)){
        return("second-column")
    }else if(checkThirdColumn(arr)){
        return("third-column")
    }else if(checkFirstRow(arr)){
        return("first-row")
    }else if(checkSecondRow(arr)){
        return("second-row")
    }else if(checkThirdRow(arr)){
        return("third-row")
    }else if(checkDiagonal(arr)){
        return("diagonal")
    }else if(checkSecondDiagonal(arr)){
        return("second-diagonal")
    }
    return null;
}

const checkFirstRow=(arr=[])=>{
    return arr[0]===arr[1] && arr[0]===arr[2] && arr[0]!=='';
}

const checkSecondRow=(arr=[])=>{
    return arr[3]===arr[4] && arr[3]===arr[5] && arr[3]!=='';
}

const checkThirdRow=(arr=[])=>{
    return arr[6]===arr[7] && arr[6]===arr[8] && arr[6]!=='';
}

const checkFirstColumn=(arr=[])=>{
    return arr[0]===arr[3] && arr[0]===arr[6] && arr[0]!=='';
}

const checkSecondColumn=(arr=[])=>{
    return arr[1]===arr[4] && arr[1]===arr[7] && arr[1]!=='';
}

const checkThirdColumn=(arr=[])=>{
    return arr[2]===arr[5] && arr[2]===arr[8] && arr[2]!=='';
}

const checkDiagonal=(arr=[])=>{
    return arr[0]===arr[4] && arr[0]===arr[8] && arr[0]!=='';
}

const checkSecondDiagonal=(arr=[])=>{
    return arr[2]===arr[4] && arr[2]===arr[6] && arr[2]!=='';
}