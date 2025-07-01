"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";

export default function LoginForm () {
  
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <Box
        /* sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }} */
      >
{/*         <GeneralErrorModal 
          opened={error} 
          setOpened={setError} 
          message={message}/> */}
        <Box
          sx={{
            //maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Inicio de Sesión</Typography>
              <Typography color="text.secondary" variant="body2">
                ¿No tienes cuenta? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Regístrate
                </Link>
              </Typography>
            </Stack>
            <form noValidate>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <FormControl  
                  variant="filled"
                  margin="none"
                  >
                  <InputLabel
                   size="small"
                    >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    fullWidth
                    name="password"
                    //notched
                  />
                </FormControl>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                <Link
                  component={NextLink}
                  href="/auth/password-recovery"
                  underline="hover"
                  variant="subtitle2"
                >
                  Olvidé mi contraseña
                </Link>
              </Typography>
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continuar
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </div>
  );
};