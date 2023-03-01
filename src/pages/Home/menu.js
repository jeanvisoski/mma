import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
