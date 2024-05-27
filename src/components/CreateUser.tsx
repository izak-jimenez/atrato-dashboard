import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ICreateUserInput, Status } from "../types/user";
import { useState } from "react";
import { regexRules } from "../config";
import {
  CreateUser as CreateUserMutation,
  CreateCard,
} from "../graphql/mutations";
import { getCard } from "../services";
import { ICardResponse, ICreateCardInput } from "../types/card";
import { ApiError } from "../services/card-service";
import { isCard, parseStatus } from "../utils";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  middleName: string;
  fLastName: string;
  sLastName: string;
  email: string;
  phone: string;
  status: Status;
  assignedAnalyst: string;
}

export const CreateUser = () => {
  const [userStatus, setUserStatus] = useState<Status>(Status.PENDING);
  const navigate = useNavigate();
  const [createUser, createUserMutationState] = useMutation(
    CreateUserMutation,
    {
      onCompleted: () => reset(),
    }
  );
  const [createCard, createCardMutationState] = useMutation(CreateCard);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      middleName: "",
      fLastName: "",
      sLastName: "",
      email: "",
      phone: "",
      status: Status.PENDING,
      assignedAnalyst: "",
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setUserStatus(event.target.value as Status);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const {
      name,
      middleName,
      fLastName,
      sLastName,
      email,
      phone,
      status,
      assignedAnalyst,
    } = data;

    const createCardResponse: ICardResponse | ApiError = await getCard();

    const isCardPredicate = isCard(createCardResponse);

    const createCardInput: ICreateCardInput = {
      number: isCardPredicate ? createCardResponse.cardNumber : "",
      cvv: isCardPredicate ? createCardResponse.cvv : "",
      type: isCardPredicate ? createCardResponse.type : "",
      pin: isCardPredicate ? "" + createCardResponse.pin : "",
      expiration: isCardPredicate ? createCardResponse.date : "",
    };

    const createCardResult = await createCard({
      variables: { data: { ...createCardInput } },
    });

    const createUserInput: ICreateUserInput = {
      name,
      middleName,
      fLastName,
      sLastName,
      email,
      phone,
      status,
      assignedAnalyst,
      cardId: parseInt(createCardResult.data.createCard.id),
    };

    try {
      toast.promise(
        createUser({ variables: { data: { ...createUserInput } } }),
        {
          loading: "Creando usuario..",
          success: "Se ha creado el usuario de forma exitosa!🎉",
          error: `Ocurrió un error 😥 Por favor intenta de nuevo -  ${createUserMutationState.error}`,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Toaster position="top-right" />
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 10 }}>
          <CardHeader title="Nuevo Usuario" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                      pattern: regexRules.lettersAndSpacesOnly,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        {...field}
                        {...(errors.name &&
                          errors.name.type === "required" && {
                            helperText: "Debes ingresar un nombre",
                          })}
                        {...(errors.name &&
                          errors.name.type === "pattern" && {
                            helperText: "Ingresa solo letras y espacios",
                          })}
                        {...(errors.name && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="middleName"
                    control={control}
                    rules={{
                      pattern: regexRules.lettersAndSpacesOnly,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="middleName"
                        label="Segundo Nombre"
                        variant="outlined"
                        {...field}
                        {...(errors.middleName &&
                          errors.middleName.type === "pattern" && {
                            helperText: "Ingresa solo letras y espacios",
                          })}
                        {...(errors.middleName && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="fLastName"
                    control={control}
                    rules={{
                      required: true,
                      pattern: regexRules.lettersAndSpacesOnly,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="fLastName"
                        label="Apellido Paterno"
                        variant="outlined"
                        {...field}
                        {...(errors.fLastName &&
                          errors.fLastName.type === "required" && {
                            helperText: "Debes ingresar un apellido paterno",
                          })}
                        {...(errors.fLastName &&
                          errors.fLastName.type === "pattern" && {
                            helperText: "Ingresa solo letras y espacios",
                          })}
                        {...(errors.fLastName && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="sLastName"
                    control={control}
                    rules={{
                      pattern: regexRules.lettersAndSpacesOnly,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="sLastName"
                        label="Apellido Materno"
                        variant="outlined"
                        {...field}
                        {...(errors.sLastName &&
                          errors.sLastName.type === "pattern" && {
                            helperText: "Ingresa solo letras y espacios",
                          })}
                        {...(errors.sLastName && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: true,
                      pattern: regexRules.email,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        {...field}
                        {...(errors.email &&
                          errors.email.type === "required" && {
                            helperText: "Debes ingresar un email",
                          })}
                        {...(errors.email &&
                          errors.email.type === "pattern" && {
                            helperText: "Ingresa un email válido",
                          })}
                        {...(errors.email && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: true,
                      pattern: regexRules.digitsOnly,
                      maxLength: 10,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="phone"
                        type="tel"
                        label="Teléfono"
                        variant="outlined"
                        {...field}
                        {...(errors.phone &&
                          errors.phone.type === "required" && {
                            helperText: "Debes ingresar un teléfono",
                          })}
                        {...(errors.phone &&
                          errors.phone.type === "pattern" && {
                            helperText: "Ingresa un teléfono válido",
                          })}
                        {...(errors.phone &&
                          errors.phone.type === "maxLength" && {
                            helperText:
                              "Ingresa un teléfono de no más de 10 dígitos",
                          })}
                        {...(errors.phone && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box>
                  <Controller
                    name="assignedAnalyst"
                    control={control}
                    rules={{
                      required: true,
                      pattern: regexRules.lettersAndSpacesOnly,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        id="assignedAnalyst"
                        label="Analista Asignado"
                        variant="outlined"
                        {...field}
                        {...(errors.assignedAnalyst &&
                          errors.assignedAnalyst.type === "required" && {
                            helperText: "Debes ingresar un analista",
                          })}
                        {...(errors.assignedAnalyst &&
                          errors.assignedAnalyst.type === "pattern" && {
                            helperText: "Ingresa solo letras y espacios",
                          })}
                        {...(errors.assignedAnalyst && {
                          error: true,
                        })}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: 5 }}>
                <Box>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <>
                        <InputLabel id="statusLabel">Estatus</InputLabel>
                        <Select
                          {...field}
                          labelId="statusLabel"
                          id="status"
                          value={userStatus}
                          label="Estatus"
                          onChange={handleChange}
                        >
                          <MenuItem value={Status.PENDING}>
                            {parseStatus(Status.PENDING)}
                          </MenuItem>
                          <MenuItem value={Status.PROCESSING}>
                            {parseStatus(Status.PROCESSING)}
                          </MenuItem>
                          <MenuItem value={Status.COMPLETED}>
                            {parseStatus(Status.COMPLETED)}
                          </MenuItem>
                        </Select>
                      </>
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="large" type="submit" variant="contained">
              Crear
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};
