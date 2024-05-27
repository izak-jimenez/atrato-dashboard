import { BallTriangle } from "react-loader-spinner";
import { Dashboard } from "../components/Dashboard";
import { useQuery } from "@apollo/client";
import { Box, Container } from "@mui/material";
import { AllUsersQuery } from "../graphql/queries";

export const DashboardPage = () => {
  const { data, loading, error } = useQuery(AllUsersQuery);
  return (
    <Container sx={{ paddingTop: "4rem" }}>
      <Box>
        {loading ? (
          <Box
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#d8a4ff"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </Box>
        ) : (
          <Dashboard users={data.users ?? []} />
        )}
      </Box>
    </Container>
  );
};
