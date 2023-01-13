import React, { useState } from "react"

const RandomProgram = () => {
    const [requestedTime, setRequestedTime] = useState({ min: 0, sec: 0 });

    const handleClick = (e) => {
        e.preventDefault()
        console.log(requestedTime.min * 60 + requestedTime.sec)
    }

    const handleChange = (e, type) => {
        setRequestedTime({ ...requestedTime, [type]: Number(e.target.value) })
    }

    return (
        <div>
            <form>
                <label>Min:</label>
                <input onChange={(e) => handleChange(e, "min")} />

                <label>Sec:</label>
                <input onChange={(e) => handleChange(e, "sec")} />
                <button onClick={handleClick}>Get</button>
            </form>
        </div>
    )
}

export default RandomProgram