import React, { useContext } from 'react';
import Authcontext from './Authcontext';

const UseAuth = () => {
        const context = useContext(Authcontext);
        return context;
};

export default UseAuth;