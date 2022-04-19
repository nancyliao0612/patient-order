import { useState } from "react";
import OrderDialog from "./OrderDialog";
// Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Patient({ Name, OrderId }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialog() {
    setIsDialogOpen((prevState) => !prevState);
  }

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleDialog}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                sx={{
                  position: "absolute",
                  left: 30,
                  top: 10,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={Name} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {isDialogOpen && (
        <OrderDialog
          handleDialog={handleDialog}
          OrderId={OrderId}
          isDialogOpen={isDialogOpen}
          patientName={Name}
        />
      )}
    </>
  );
}

export default Patient;
