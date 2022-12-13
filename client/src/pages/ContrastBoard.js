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
import Compare from "../components/Compare/Compare";
import Companyconstar from "../components/Compare/Companycon";
import Companyconstar1 from "../components/Compare/Companyconstar";
import BasicSelect from "../components/Compare/Select";
import { Card, CardHeader } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  CommitNumber,
  IssueNumber,
  StarNumber,
  ForkNumber,
  TimeLine,
  Language,
  Contribute,
  CommitFrequency,
  IssueFrequency,
  ContributorList,
} from "../components/DashBoard";
import StarFreqTab from "../components/AnalyzeBoard/StarFreqTab";
import CommitFreqTab from "../components/AnalyzeBoard/CommitFreqTab";
import IssueFreqTab from "../components/AnalyzeBoard/IssueFreqTab";
import Companytab from "../components/AnalyzeBoard/Companytab";
export default function Contrastboard() {
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
const dat=[200,300,400,500,600];

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
    localStorage.setItem("starInterval", "month");
    localStorage.setItem("commitInterval", "month");
    localStorage.setItem("issueInterval", "month");
   
  
    return (
    
      <Container maxWidth="xl">
      
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">Pytorch  vs <BasicSelect /></Typography>
         
        </Box>
       
      </Container>
    );
  }
}
