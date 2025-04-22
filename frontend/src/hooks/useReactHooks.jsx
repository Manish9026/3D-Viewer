import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate  } from 'react-router-dom';

const useReactHooks = () => {

    const navigate = useNavigate();
    const loaction = useLocation();
    const dispatch=useDispatch();

  return {
        navigate,
        loaction,
        dispatch
    }
}

export default useReactHooks