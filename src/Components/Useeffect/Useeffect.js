import { useEffect, useLayoutEffect, useState } from "react"


function Useeffect(){
    const [count, setCount] = useState(1)

    // useEffect( () => {
    //     let timer = setInterval(() => {
    //         console.log(`Useeffect lan ${count}`)
    //     }, 1000);
    //     return (()=>
    //         {   
    //             clearInterval(timer)
    //             console.log(`Clean up ${count}`)
    //         })
    // },[count])

    

    function handleClick(){
        setCount(prev => prev + 1)
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increase</button>
        </div>
    )
}

export default Useeffect;