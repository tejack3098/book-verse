import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder, updateOrder } from "../../services/OrderService";
import { IOrder } from "../../models/IOrder";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    const response = await getAllOrders(new URLSearchParams());
    setOrders(response);
  };

  const filterOrders = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredOrders(filtered);
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    fetchOrders();
  };

  const handleEdit = (order: IOrder) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  const handleSave = async () => {
    if (selectedOrder) {
      await updateOrder(selectedOrder.id, selectedOrder);
      fetchOrders();
      handleClose();
    }
  };

  const handleOrderChange = (field: string, value: string | number) => {
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        [field]: typeof value === "string" ? value : parseFloat(value.toString()),
      });
    }
  };

  const handleOrderItemChange = (index: number, field: string, value: string | number) => {
    if (selectedOrder) {
      const updatedItems = [...selectedOrder.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: typeof value === "string" ? parseFloat(value) : value,
      };
      setSelectedOrder({ ...selectedOrder, items: updatedItems });
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="flex-start" style={{ padding: "16px" }}>
      <Grid item xs={12} style={{ marginBottom: "16px" }}>
        <TextField
          fullWidth
          label="Search by Order ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>

      {filteredOrders.map((order) => (
        <Grid item xs={12} md={8} lg={6} key={order.orderId}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order ID: {order.orderId}</Typography>
              <Typography>User ID: {order.userId}</Typography>
              <Typography>Total: ${order.total.toFixed(2)}</Typography>
              {order.deliveryDate && (
                <Typography>Delivery Date: {order.deliveryDate}</Typography>
              )}
              <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
                Items:
              </Typography>
              {order.items.map((item) => (
                <Typography key={item.bookId} color="textSecondary">
                  Book: {item.title}, Quantity: {item.quantity}, Price per Unit: ${item.priceperunit.toFixed(2)}
                </Typography>
              ))}
            </CardContent>
            <Grid container justifyContent="flex-end" spacing={1} style={{ padding: "8px" }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(order)}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}

      <Dialog open={!!selectedOrder} onClose={handleClose}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Total"
            name="total"
            type="number"
            fullWidth
            value={selectedOrder?.total || ""}
            onChange={(e) => handleOrderChange("total", parseFloat(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            fullWidth
            value={selectedOrder?.deliveryDate || ""}
            onChange={(e) => handleOrderChange("deliveryDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {selectedOrder?.items.map((item, index) => (
            <div key={item.bookId} style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1">Edit Item: {item.title}</Typography>
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                fullWidth
                value={item.quantity}
                onChange={(e) => handleOrderItemChange(index, "quantity", parseFloat(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Price per Unit"
                type="number"
                fullWidth
                value={item.priceperunit}
                onChange={(e) => handleOrderItemChange(index, "priceperunit", parseFloat(e.target.value))}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AdminDashboard;
