import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../graphql/mutations";
import { IFormInput } from "./CreateUser";
import { IUpdateUserInput, IUser, Status } from "../types/user";
import { regexRules } from "../config";
import { parseStatus } from "../utils";

export type UpdateUserFormProps = {
  user: IUser;
  closeHandler: Function;
};

export const UpdateUserForm = ({ user, closeHandler }: UpdateUserFormProps) => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<Status>(user.status);
  const [updateUser, { data, loading, error }] = useMutation(UpdateUser, {
    onCompleted: () => {
      closeHandler();
      navigate(0);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name as string,
      middleName: user.middleName as string,
      fLastName: user.fLastName as string,
      sLastName: user.sLastName as string,
      email: user.email as string,
      phone: user.phone as string,
      status: user.status,
      assignedAnalyst: user.assignedAnalyst as string,
    },
  });

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setUserStatus(event.target.value as Status);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async ({
    name,
    middleName,
    fLastName,
    sLastName,
    email,
    phone,
    status,
    assignedAnalyst,
  }) => {
    const updateUserInput: IUpdateUserInput = {
      userId: parseInt(user.id.toString()),
      name,
      middleName,
      fLastName,
      sLastName,
      email,
      phone,
      status: userStatus,
      assignedAnalyst,
    };

    try {
      toast.promise(
        updateUser({ variables: { data: { ...updateUserInput } } }),
        {
          loading: "Actualizando usuario..",
          success: "Se ha actualizado el usuario de forma exitosa!🎉",
          error: `Ocurrió un error 😥 Por favor intenta de nuevo -  ${error}`,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 10 }}>
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
                          size="small"
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
            <Button
              size="large"
              variant="contained"
              onClick={() => closeHandler()}
              fullWidth
            >
              Cancelar
            </Button>
            <Button size="large" type="submit" variant="contained" fullWidth>
              Actualizar
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
