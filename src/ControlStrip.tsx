import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";

// Arrange controls horizontally with consistent margins between items.
//
// In this simple app, it's a bit excessive to create this component. But in a more complex app,
// this pattern is very much preferable to setting margin-right on every item in every toolbar. 
export default function ControlStrip({children}: React.PropsWithChildren<object>): JSX.Element {
  const theme = useTheme();
  const style = {
    marginBottom: 2,
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  }
  return <Box sx={style}>{children}</Box>;
}