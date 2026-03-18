let notifications = [
  {
    id: 1,
    userId: 1,
    message: "Notificação 1",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    message: "Notificação 2",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    userId: 3,
    message: "Notificação 3",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    userId: 1,
    message: "Notificação 4",
    date: new Date().toISOString(),
  },
  {
    id: 5,
    userId: 2,
    message: "Notificação 5",
    date: new Date().toISOString(),
  },
];
let id = 1;

/* Função para  */
export const getAllNotifications = () => {
  return notifications;
};

/* Função para  */
export const getNotificationsByUserId = (userId) => {
  return notifications.filter((n) => n.userId === userId);
};

/* Função para  */
export const createNotification = (data) => {
  const notification = {
    id: id++,
    userId: data.userId,
    message: data.message,
    date: data.date,
  };
  notifications.push(notification);
  return notification;
};

/* Função para  */
export const updateNotification = (notificationId, data) => {
  const notification = notifications.find((n) => n.id === notificationId);
  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.message = data.message ?? notification.message;
  notification.date = data.date ?? notification.date;

  return notification;
};

/* Função para  */
export const deleteNotification = (notificationId) => {
  notifications = notifications.filter((n) => n.id !== notificationId);
};
