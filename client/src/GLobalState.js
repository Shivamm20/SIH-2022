import React ,{createContext,useEffect,useState} from "react";
import axios from "axios";

import DistrictsAPI from "./components/api/DatadistrictAPI";

export const GlobalState = createContext()
export const DataProvider = ({children})=>{
    const [token,setToken]= useState(false); 

    useEffect(()=>{
    //     const firstLogin = localStorage.getItem('firstLogin');
    //     if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token');
        
                setToken(res.data.accesstoken);
    
                setTimeout(()=>{
                    refreshToken()
                },10*60*1000)
            }
            refreshToken()
    //     }
    },[])

    const state = {
        districtApi:DistrictsAPI(token),
    } 

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

