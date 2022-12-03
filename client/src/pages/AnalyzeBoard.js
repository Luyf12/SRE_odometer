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
import StarFreqTab from "../components/AnalyzeBoard/StarFreqTab";
import CommitFreqTab from "../components/AnalyzeBoard/CommitFreqTab";
import IssueFreqTab from "../components/AnalyzeBoard/IssueFreqTab";
import Companytab from "../components/AnalyzeBoard/Companytab";
export default function Analyzeboard() {
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
    localStorage.setItem("starInterval", "month");
    localStorage.setItem("commitInterval", "month");
    localStorage.setItem("issueInterval", "month");

    return (
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">Companies</Typography>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <Card>
                <Companytab/>
              </Card>
            </Grid>
           
               
            
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Stars Frequency" />
              <Card>
                <StarFreqTab />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Commits Frequency" />
              <Card>
                <CommitFreqTab />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Issues Frequency" />
              <Card>
                <IssueFreqTab />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
