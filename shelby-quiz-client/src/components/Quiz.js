import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import { Card, CardContent, CardHeader, Typography, List, ListItemButton, Box, LinearProgress} from "@mui/material";
import {getFormatedTime} from "../helper"

export default function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnsIndex, setQnsIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1)
    }, [1000]);
  }


  useEffect(() => {    
    setContext({
      timeTaken:0,
      selectOptions[]
    })
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);

        return () => {clearInterval(timer)}

      });
  }, []);

  const updateAnswer = (gnId, optionIdx) =>{
    const temp = [...context.selectOptions]
   // console.log(gnId);
    temp.push({
      gnId,
      selected:optionIdx
    })    

    if(qnsIndex < 4){
      setContext({selectOptions:[...temp]})
      setQnsIndex(qnsIndex+1)
    }
    else{
      setContext({selectOptions:[...temp], timeTaken })

    }

  }
  return (
    qns.length != 0
    ? <Card sx={{ maxWidth: 640, mx: 'auto', mt: 5,
     '& .MuiCardHeader-action':{m:0}, alignSelf: 'center' }}>
      <CardHeader title={'Question ' + (qnsIndex + 1) + ' of 5'}
          action= {<Typography> {getFormatedTime(timeTaken)}</Typography>}/>
      
      <Box>
        <LinearProgress variant="determinate" value={(qnsIndex + 1) * 100 / 5 }/>
      </Box>
       <CardContent>
        <Typography variant ="h6">
          {qns[qnsIndex].qnInWords}
        </Typography>
        <List>
            {qns[qnsIndex].options.map((item, idx) =>            
            <ListItemButton key={idx} onClick={() => updateAnswer(qns[qnsIndex].gnId, idx) }>
              <div>
               <b> {String.fromCharCode(65 + idx)+ " . "} </b> {item}
              </div>

            </ListItemButton>            
            )}
          </List>
       </CardContent>
      </Card> 
      : null
  )
}
