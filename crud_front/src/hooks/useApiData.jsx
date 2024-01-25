import axios from "axios";
import { useEffect, useState } from "react";

function useApiData(url, initValues = []) {
  const [dataArray, setDataArray] = useState(initValues);
  const [apiError, setApiError] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((resp) => {
        console.log("get data resp ===", resp.data);
        setDataArray(resp.data);
      })
      .catch((error) => {
        console.warn(error);
        setApiError(error);
      });
  }, [url]);

  return [dataArray, setDataArray, apiError];
}

export default useApiData;
