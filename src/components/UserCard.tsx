import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user";

export type UserCardProps = {
  user: IUser;
};

export const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    middleName,
    fLastName,
    sLastName,
    email,
    phone,
    birthday,
    assignedAnalyst,
    status,
    card,
  } = user;

  const handleCardClick = () => {
    navigate(`users/${id}`);
  };

  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 5,
          cursor: "pointer",
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardHeader
          title={`${name} ${middleName} ${fLastName} ${sLastName}`}
          titleTypographyProps={{ variant: "h5" }}
          avatar={<Avatar />}
          subheader={`ID: ${id}`}
          sx={{ color: "#183189", fontWeight: "bold" }}
        />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography gutterBottom>{email}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
