import React from 'react'
import {useState} from "react/cjs/react.production.min";

const App = () => {
    return (
        <div>
            <HookCounter />
        </div>
    )
};

const HookCounter = () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <p>{ value }</p>
            <button onClick={() => setValue((s) => s+1)}>+</button>
            <button onClick={() => setValue((s) => s-1)}>-</button>
        </div>
    )
}
