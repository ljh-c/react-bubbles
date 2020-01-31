import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      axiosWithAuth()
        .get('/colors')
        .then(res => {
          setColorList(res.data);
          setIsLoading(false);
          console.log('now false');
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setIsLoading={setIsLoading} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
