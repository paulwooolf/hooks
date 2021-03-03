import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, toggleVisible] = useState(true);



    if (visible) {
        return (
            <div>
                <Notification />
                {/*<HookCounter value={value} />*/}
                <button onClick={() => setValue((s) => s+1)}>+</button>
                <button onClick={() => setValue((s) => s-1)}>-</button>
                <button onClick={() => toggleVisible(false)}>hide</button>
                <PlanetInfo id={value} />
            </div>
        )
    } else {
        return (
        <div>
            <button onClick={() => toggleVisible(true)}>show</button>
        </div>
        )
    }
};

const Notification = () => {
    const [val, setVal] = useState('Hello');

    useEffect(() => {
        const timeout = setTimeout(() => setVal(''), 2500);
        return () => clearTimeout(timeout);
    }, [])

    return <div><p>{val}</p></div>
}

const HookCounter = ({value}) => {



    return (
            <p>{ value }</p>
    )
}

const PlanetInfo = ({ id }) => {

    const [ name, setName ] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then(res => res.json())
            .then(data => !cancelled && setName(data.name) );
        return () => cancelled = true;
    }, [id])

    return (
        <div>{id} - {name}</div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


// import React, { useContext } from "react";
// import ReactDOM from 'react-dom';
//
// const MyContext = React.createContext();
//
// const App = () => {
//     return (
//         <MyContext.Provider value="Hello world 123">
//             <Child />
//         </MyContext.Provider>
//     )
// }
//
// const Child = () => {
//     const value = useContext(MyContext);
//     return <p>{value}</p>
// }
//
// ReactDOM.render(<App />, document.getElementById('root'));
