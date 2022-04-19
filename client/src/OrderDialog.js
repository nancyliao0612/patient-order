import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Divider from "@mui/material/Divider";

function OrderDialog({ handleDialog, OrderId, isDialogOpen, patientName }) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState([] || "");
  const [isEditing, setIsEditing] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  const getOrders = async () => {
    setLoading(true);
    try {
      const {
        data: { order },
      } = await axios.get(`/api/v1/orders/${OrderId}`);
      // for starter, there is no order message in the db, so for that case, just setMessage to null
      if (order) {
        console.log(order);
        // const allMessages = order.map((item) => item.Message);
        // console.log(allMessages);
        setMessage(order);
      } else {
        setMessage(null);
      }
      // order ? setMessage(allMessages) : setMessage(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [OrderId]);

  function handleChange(e) {
    setOrder(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      const response = await axios.post(`/api/v1/orders/${OrderId}`, {
        Message: order,
        Id: OrderId,
      });
      const patientOder = response.data.order;
      console.log(patientOder);
      setMessage((prevMessage) => [...prevMessage, patientOder]);
      setOrder("");
    } else {
      const response = await axios.patch(`/api/v1/orders/${uniqueId}`, {
        Message: order,
        Id: OrderId,
      });
      const patientOder = response.data.order;
      console.log(patientOder);
      const updatedOrder = message.map((item) => {
        return item._id === patientOder._id
          ? { ...item, Message: patientOder.Message }
          : item;
      });
      setMessage(updatedOrder);
      setOrder("");
      setIsEditing(false);
    }
  };

  function handleEdit(id) {
    const editMessage = message.filter((item) => item._id === id);
    console.log(editMessage);
    setOrder(editMessage[0].Message);
    setIsEditing(true);
    setUniqueId(editMessage[0]._id);
    console.log(uniqueId);
  }

  return (
    <Dialog open={isDialogOpen} maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        病人{patientName} - 醫囑
        <IconButton
          aria-label="close"
          onClick={handleDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="order-section">
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="請輸入醫囑"
              style={{ width: 300, padding: 5 }}
              onChange={handleChange}
              name="order"
              value={order}
            />
            {/* {!message ? (
              <button>新增</button>
            ) : isEditing ? (
              <button>更新</button>
            ) : (
              <button disabled>新增</button>
            )} */}
            {!message ? (
              <button>新增</button>
            ) : isEditing ? (
              <button>更新</button>
            ) : (
              <button>新增</button>
            )}
          </div>
        </form>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <div>
          {message.map((order, index) => {
            return (
              <div key={index} className="order-message">
                <p>{order.Message}</p>
                <button onClick={() => handleEdit(order._id)}>編輯</button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDialog;
