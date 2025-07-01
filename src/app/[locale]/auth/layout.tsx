import NextLink from "next/link";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* <div className="w-full flex-none md:w-64"> */}
        <Box
          //component="main"
          sx={{
            display: "flex",
            flex: "1 1 auto",
          }}
        >
          <Grid 
            container 
            sx={{ flex: "1 1 auto" }}>
            <Grid
                size={{xs: 12, lg: 6}}
                sx={{
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
              {/* <Box
                component="header"
                sx={{
                  left: 0,
                  p: 3,
                  position: "fixed",
                  top: 0,
                  width: "100%",
                }}
              > */}
                <Box
                  component={NextLink}
                  href="/"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 32,
                    width: "50%",
                  }}
                >
                  <Image
                    alt="Dive Vzla Logo"
                    src="/logo_dive_venezuela.png"
                    width={200}
                    height={100}
                  />
                </Box>
              {/* </Box> */}
              {children}
            </Grid>
            <Grid
                size={{xs: 12, lg: 6}}
                sx={{
                    alignItems: "center",
                    //background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                    background: "#003c77",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    "& img": {
                    maxWidth: "100%",
                    },
                }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  align="center"
                  color="inherit"
                  sx={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    mb: 1,
                  }}
                  variant="h1"
                >
                  Bienvenido a{" "}
                  <Box component="a" sx={{ color: "#f26524" }} target="_blank">
                    Dive Vzla
                  </Box>
                </Typography>
                <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
                  La plataforma de buceo de Venezuela.
                </Typography>
                <Image
                  alt=""
                  src="/images/header/banner_01.webp"
                  style={{ borderRadius: 10 }}
                  width={700}
                  height={500}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
       {/* </div> */}
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}
    </div>
  );
}
