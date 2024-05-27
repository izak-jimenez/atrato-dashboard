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
} from "@mui/material";
import { ChevronLeft, Edit } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cards from "react-credit-cards-2";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user";
import {
  generateCreditCardExpiryDateString,
  parseStatus,
  setStatusChipColor,
} from "../utils";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { UpdateUserForm } from "./UpdateUserForm";

export type UpdateUserProps = {
  user: IUser;
};

export const UpdateUser = ({ user }: UpdateUserProps) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:508px)");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    </Container>
  );
};
