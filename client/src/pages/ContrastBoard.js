import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Toolbar,
  Button,
} from "@mui/material";
import React from "react";
import Compare from "../components/ContrastBoard/Compare";
import Compare1 from "../components/ContrastBoard/Compare1";
import Compare2 from "../components/ContrastBoard/Compare2";

import Conbin from "../components/ContrastBoard/Conbin";
import Conbin1 from "../components/ContrastBoard/Conbin1";
import Conbin2 from "../components/ContrastBoard/Conbin2";
import Conbin3 from "../components/ContrastBoard/Conbin3";

import Companyconstar from "../components/ContrastBoard/Companycon";
import Companyconstar1 from "../components/ContrastBoard/Companycon1";
import Companyconstar2 from "../components/ContrastBoard/Companycon2";
import ConList from "../components/ContrastBoard/Conlist";
import ConList1 from "../components/ContrastBoard/Conlist1";
import ConList2 from "../components/ContrastBoard/Conlist2";
import ConList3 from "../components/ContrastBoard/Conlist3";

import { Card, CardHeader } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export default function Contrastboard() {
  const [age, setage] = React.useState(2);
  useEffect(() => {
    getDashBoard(id);
  }, []);
  const { id } = useParams();
  const { isLoading, detail, getDashBoard } = useAppContext();
  const {
    forks,
    stars,
    open_issues,
    timeline,
    language,
    commit_frequency,
    issue_frequency,
    contributors,
  } = detail;

  console.log(detail.language);
const dat=[23400,detail.open_issues,detail.forks,detail.stars,3547];

  if (isLoading) {
    return <Loading center />;
  } else {
    const contribute = {
      name: [],
      contributions: [],
    };

    if (contributors) {
      for (var i = 0; i < Math.min(5, contributors.length); ++i) {
        contribute.name.push(contributors[i].name);
        contribute.contributions.push(contributors[i].contributions);
      }
    }

    const handleChange = (event) => { 
      setage(event.target.value);
      
    };
  let Mes;
  let Mes1;
  let Mes2;
  let Mes3;
  if(age==1){
      Mes=(  <Compare 
                  
          total={dat} />
          )
      Mes1=(
           <Companyconstar />
      )
     Mes2=(
      <ConList/>
     )
     Mes3=(<Conbin1/>)
  
  }
  else if(age==2){
      Mes=(  <Compare1
                  
          total={dat} />)
          Mes1=(
              <Companyconstar1 />
         )
         Mes2=(
          <ConList2/>
         )
         Mes3=(<Conbin2/>)
  }
  else if(age==3){
      Mes=(  <Compare2
                  
          total={dat} />)
          Mes1=(
              <Companyconstar2 />
         )
         Mes2=(
          <ConList3/>
         ) 
         Mes3=(<Conbin3/>)
  }
   
  
    return (
    
      <Container maxWidth="xl">
      
        <Box sx={{ pb: 5 }}>
        <Container maxWidth="xl">
    <Box sx={{ minWidth: 3 }}>
   
      <FormControl fullWidth>
      <Grid container spacing={3}>
     
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="repo"
          onChange={handleChange}
        > 
    
          <MenuItem value={1}>vs vue</MenuItem>
          <MenuItem value={2}>vs django</MenuItem>
          <MenuItem value={3}>vs node</MenuItem>
        </Select>
      
        <Grid item xs={12} sm={6} md={12}>
                <Card> {Mes}</Card>
              
               
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
              <Card>
              <Typography variant='h6'>本项目language</Typography>
              <Conbin />
                </Card>
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
              <Card>
              <Typography variant='h6'>对比项目language</Typography>
            {Mes3}
                </Card>
         </Grid>
       
         <Grid item xs={12} sm={6} md={12}>
              <Card>
              <Typography variant='h6'>Company信息对比</Typography>
               {Mes1}
                </Card>
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
              <Card>
              <Typography variant='h6'>本项目</Typography>
              <ConList1/>
                </Card>
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
              <Card>
                <Typography variant='h6'>对比项目</Typography>
              {Mes2}
                </Card>
         </Grid>
         </Grid>
      
      </FormControl>
    
    </Box>
</Container>
        </Box>
       
      </Container>
    );
  }
}
