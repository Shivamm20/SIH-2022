import { useState, useEffect } from "react";
import axios from "axios";

const DistrictsAPI=(token)=> {
  const [districtData, setDistricts] = useState([]);
  const [callback,setCallback] = useState(false);
  useEffect(() => {
    const getDistricts = async () => {
      const res = await axios.get(`/api/districtData`,{
        headers:{Authorization:token}
      });
      setDistricts(res.data.districtData);
      // console.log(res.data.districtData);
    };
    getDistricts();
  }, [token,callback]);

  return {
    districtData: [districtData, setDistricts],
    callback:[callback,setCallback]
  };
}

export default DistrictsAPI
