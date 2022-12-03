import { Icon } from "@iconify/react";
import moment from "moment";
import { Box, Stack, Card, Typography, CardHeader, Chip } from "@mui/material";

function Contributor({ contributor }) {
  const { name, company, public_repos, followers, created_at, avatar_url } =
    contributor;
  const url = "https://github.com/" + name;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={avatar_url}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 120 }}>
        <a href={url}>{name}</a>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography> */}
      </Box>
      <Stack direction="row" spacing={2} sx={{ minWidth: 480 }}>
        <Chip
          icon={<Icon icon="codicon:repo" color="black" width={18} />}
          label={`${public_repos} public repos`}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<Icon icon="carbon:user-follow" color="black" width={18} />}
          label={`${followers} followers`}
          variant="outlined"
          color="primary"
        />
        {company && (
          <Chip
            icon={
              <Icon icon="carbon:location-company" color="black" width={18} />
            }
            label={`${company}`}
            variant="outlined"
            color="primary"
          />
        )}
      </Stack>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        create at{" "}
        {moment(moment(created_at).format("YYYYMMDD"), "YYYYMMDD").fromNow()}
      </Typography>
    </Stack>
  );
}

const ContributorList = (contributors) => {
  const contributorList = Object.values(contributors);
  return (
    <Card>
      <CardHeader title="Contributors List" />
      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {contributorList.map((contributor) => {
          return (
            <Contributor key={contributor.name} contributor={contributor} />
          );
        })}
      </Stack>
    </Card>
  );
};

export default ContributorList;
