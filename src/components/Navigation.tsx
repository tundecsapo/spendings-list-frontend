import { ReactNode } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PaymentsIcon from "@mui/icons-material/Payments";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Navigation = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppBar
        position="fixed"
        style={{ background: "white" }}
        sx={{
          boxShadow: "0 3px 2px -2px gray",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                color: theme.palette.primary.dark,
              })}
            >
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#f5f0f9",
                  height: "28px",
                  borderRadius: 2,
                }}
              >
                <PaymentsIcon />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 2,
                }}
              >
                Spendings
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};
