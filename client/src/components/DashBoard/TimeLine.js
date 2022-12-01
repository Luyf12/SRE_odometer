import moment from "moment";
import { useAppContext } from "../../context/appContext";
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot,
} from "@mui/lab";

function MileStone({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <div>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            sx={{
              bgcolor:
                (type === "order1" && "primary.main") ||
                (type === "order2" && "success.main") ||
                (type === "order3" && "info.main") ||
                (type === "order4" && "warning.main") ||
                "error.main",
            }}
          />
          {isLast ? null : <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {moment(time).format("MMM Do, YYYY")}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </div>
  );
}

const TimeLine = ({
  created_at,
  pushed_at,
  recent_released_at,
  updated_at,
}) => {
  const TIMELINES = [
    {
      title: "create-at",
      time: created_at,
      type: "order1",
    },
    {
      title: "latest-release",
      time: recent_released_at,
      type: "order2",
    },
    {
      title: "latest-update",
      time: updated_at,
      type: "order3",
    },
    {
      title: "latest-push",
      time: pushed_at,
      type: "order4",
    },
  ];
  return (
    <Card
      sx={{
        "& .MuiTimelineItem-missingOppositeContent:before": {
          display: "none",
        },
      }}
    >
      <CardHeader title="TimeLine" />
      <CardContent sx={{ height: 412 }}>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <MileStone
              key={item.title}
              item={item}
              isLast={index === TIMELINES.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default TimeLine;
