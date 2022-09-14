function getLengthOfMissingArray(arrayOfArrays) {
    let isNull = false
    if (!arrayOfArrays || arrayOfArrays.length===0) return 0;
    let lengths = []
    arrayOfArrays.forEach(el => {
        if (el){
            if (el.length===0) isNull = true
            lengths.push(el.length)
        } else {
            isNull = true
        }

    })
    if (isNull) return 0
    lengths.sort((a,b)=>(a-b))
    for (let i = 0; i < lengths.length; i++) {
        if (lengths[i] !== lengths[i+1]-1 || lengths[i+1] === undefined){
            return lengths[i]+1
        }
    }
}


console.log(getLengthOfMissingArray([[3, 1],
    [],
    [3, 0, 0],
    [0, 0, 0, 3],
    [4, 1, 2, 3, 2],
    [4, 4, 2, 0, 2, 0]] ))
