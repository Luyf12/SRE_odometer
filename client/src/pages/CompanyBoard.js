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
import Companytab from "../components/CompanyBoard/Companytab";

export default function Companyboard() {
  const { owner, name } = useParams();
  console.log(owner + " " + name);

  useEffect(() => {
    getCompany(owner, name);
  }, []);
  const { comp_isLoading, comp_detail, getCompany } = useAppContext();
  console.log(comp_detail);

  if (comp_isLoading) {
    return <Loading center />;
  } else {
    return (
      <Container maxWidth="xl">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <CardHeader title="Companies" />
              <Card>
                <Companytab data={comp_detail} />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
