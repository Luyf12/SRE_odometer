import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box,Grid, Container, Typography, Icon,Button } from "@mui/material";
import { Card, CardHeader } from "@mui/material";

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
import LineBarChart from "../components/DashBoard/Linebar";
import LineBarChart1 from "../components/DashBoard/Linebar1";
import LineBarChart2 from "../components/DashBoard/Linebar2";
import CompanyList from  "../components/DashBoard/CompanyList";
export default function Dashstars() {
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

    return (

      <Container maxWidth="xl">
         
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Company Stargazers</Typography>
          <Link to={`/analyze/star/${id}`} className="btn edit-btn">
             Stargazers
            </Link>
            <Link to={`/analyze/issue/${id}`} className="btn edit-btn">
             issue creators
            </Link>

            <Link to={`/analyze/commit/${id}`} className="btn edit-btn">
             pull request creators
            </Link>
        </Box>
       
        <Box>
         

         
          <Grid container spacing={3}>
            
        
          <Grid item xs={12} sm={6} md={6}>
            <Card>
         <LineBarChart/>
       
            </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Card>
            <CompanyList/>
            </Card>
            </Grid>
          </Grid>
        </Box> 
      
      </Container>
        
    );
  }
}
