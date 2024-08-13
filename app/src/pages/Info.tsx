import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ICartItem } from '../models/ICartItem';



interface InfoProps {
  cartItems: ICartItem[];
  totalPrice: string;
}

export default function Info({ cartItems, totalPrice }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={`${item.title} (${item.quantity})`}
              secondary={`Price: $${item.price.toFixed(2)}`}
            />
            <Typography variant="body1" fontWeight="medium">
              ${ (item.price * item.quantity).toFixed(2) }
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
