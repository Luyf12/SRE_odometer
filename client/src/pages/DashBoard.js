import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Box,Grid, Container, Typography } from "@mui/material";
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
import LineBarChart from "../components/AnalyzeBoard/CompanyChartissue";
export default function DashboardApp() {
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
          <Typography variant="h4">Report</Typography>
        </Box>
       
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CommitNumber />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <IssueNumber total={open_issues} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StarNumber total={stars} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ForkNumber total={forks} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TimeLine {...timeline} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Language {...language} />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6}>
              <CommitFrequency {...commit_frequency} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <IssueFrequency {...issue_frequency} />
            </Grid> */}
            <Grid item xs={12} sm={6} md={12}>
              <Contribute {...contribute} />
            </Grid>
            {contributors && (
              <Grid item xs={12} sm={6} md={12}>
                <ContributorList {...contributors} />
              </Grid>
            )}
              
          </Grid>
        </Box>
    
     
          
     
      
      </Container>
    );
  }
}
