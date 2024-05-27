import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
  Chip,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ChevronLeft, Delete, Edit } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cards from "react-credit-cards-2";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  generateCreditCardExpiryDateString,
  parseStatus,
  setStatusChipColor,
} from "../utils";
import { UpdateUserForm } from "./UpdateUserForm";
import { DeleteUser } from "../graphql/mutations";
import { IUser } from "../types/user";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export type UpdateUserProps = {
  user: IUser;
};

export const UpdateUser = ({ user }: UpdateUserProps) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:508px)");
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const [deleteUser, { data, loading, error }] = useMutation(DeleteUser, {
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleDelete = () => {
    try {
      toast.promise(
        deleteUser({
          variables: { deleteUserId: parseInt(user.id.toString()) },
        }),
        {
          loading: "Eliminando usuario..",
          success: "Se ha eliminado el usuario de forma exitosa!🎉",
          error: `Ocurrió un error 😥 Por favor intenta de nuevo -  ${error}`,
        }
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const chipColor = setStatusChipColor(user.status);

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
    card: { number, cvv, type, pin, expiration },
  } = user;

  const DeleteUserDialog = () => {
    return (
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que quieres eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const EditUserDialog = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Modificar Datos"}
        </DialogTitle>
        <DialogContent>
          <UpdateUserForm user={user} closeHandler={handleClose} />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="md">
      <Box>
        <Stack
          direction="row"
          justifyContent="start"
          sx={{ paddingBottom: "2rem" }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            startIcon={<ChevronLeft />}
          >
            Regresar
          </Button>
        </Stack>
        <Card>
          <CardHeader
            title={`${name} ${middleName} ${fLastName} ${sLastName}`}
            titleTypographyProps={{ variant: "h5" }}
            avatar={<Avatar />}
            subheader={`ID: ${id}`}
            sx={{ color: "#183189", fontWeight: "bold" }}
            action={
              <Grid container spacing={2}>
                <Grid item>
                  <Chip
                    sx={{ backgroundColor: chipColor, color: "white" }}
                    label={parseStatus(user.status)}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleOpen}>
                    <Edit />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleOpenDeleteDialog}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            }
          />
          <Divider />
          <CardContent>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ color: "#9AA3C3" }}>
                          EMAIL
                        </Typography>
                        <Typography gutterBottom>{email}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#9AA3C3" }}>
                          TELÉFONO
                        </Typography>
                        <Typography gutterBottom>{phone}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#9AA3C3" }}>
                          ANALISTA ASIGNADO
                        </Typography>
                        <Typography gutterBottom>{assignedAnalyst}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Divider
                  orientation={!matches ? "horizontal" : "vertical"}
                  flexItem
                  variant="middle"
                />
                <Grid item flex={1}>
                  <Stack direction="row" justifyContent="end">
                    <Cards
                      number={number as string}
                      expiry={generateCreditCardExpiryDateString(
                        expiration.toString()
                      )}
                      cvc={cvv as string}
                      name={`${name as string} ${middleName as string} ${
                        fLastName as string
                      } ${sLastName as string}`}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
      <EditUserDialog />
      <DeleteUserDialog />
    </Container>
  );
};
