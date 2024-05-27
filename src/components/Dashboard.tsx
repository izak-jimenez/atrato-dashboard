import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user";
import { UserCard } from "./UserCard";

export type DashboardProps = {
  users: IUser[];
};

export const Dashboard = ({ users }: DashboardProps) => {
  console.log("USERS: ", users);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/users/create");
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="end"
        sx={{ paddingBottom: "2rem" }}
      >
        <Button variant="outlined" onClick={handleCreateUser}>
          Crear Usuario
        </Button>
      </Stack>
      {users.length > 0 ? (
        <Grid container rowSpacing={2} spacing={2}>
          {users.map((user) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={6} key={user.id}>
                <UserCard user={user} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box display="flex" alignContent="center" justifyContent="center">
          <Typography>Está muy vacío aquí...</Typography>
        </Box>
      )}
    </Box>
  );
};
