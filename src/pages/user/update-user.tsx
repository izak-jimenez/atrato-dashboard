import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { FindUser } from "../../graphql/queries";
import { IUser } from "../../types/user";
import toaster, { Toaster } from "react-hot-toast";
import { UpdateUser } from "../../components/UpdateUser";
import { BallTriangle } from "react-loader-spinner";

export const UpdateUserPage = () => {
  const [user, setUser] = useState<IUser>();
  const { id } = useParams();
  const truthyIdValue: number = id ? parseInt(id) : 1;
  const { data, loading, error } = useQuery(FindUser, {
    variables: { userId: truthyIdValue },
    onCompleted(data) {
      setUser(data.user);
    },
    onError() {
      toaster.error("Ocurrió un error al cargar el usuario. Intenta de nuevo.");
    },
  });

  const displaySpinner = () => {
    return (
      <Box display="flex" alignContent="center" justifyContent="center">
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
    );
  };

  return (
    <Box>
      <Toaster position="top-right" />
      {loading ? (
        displaySpinner()
      ) : user ? (
        <UpdateUser user={user} />
      ) : (
        displaySpinner()
      )}
    </Box>
  );
};
