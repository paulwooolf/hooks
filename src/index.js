import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);

    const [ dataState, setDataState ] = useState(initialState);

    useEffect(() => {
        setDataState(initialState)
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error
        }))
        return () => cancelled = true;
    }, [ request ]);
    return dataState;
}

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id])
    return useRequest(request);
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

    const {data, loading, error} = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>
    }
    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <div>{id} - {data && data.name}</div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
