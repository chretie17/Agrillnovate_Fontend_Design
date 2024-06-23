import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Popover,
  Badge,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { connectSSE, disconnectSSE } from '../services/AdminNotificationService';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  popover: {
    padding: '16px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  notificationButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: 'green',
  },
  noNotifications: {
    padding: '16px',
    textAlign: 'center',
    color: '#888',
  },
}));

const NotificationsList = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // Add this line to define anchorEl and setAnchorEl

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);

    const handleNotification = (notification) => {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [notification, ...prevNotifications];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
      });
    };

    const eventSource = connectSSE(handleNotification);

    return () => {
      disconnectSSE(eventSource);
    };
  }, []);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget); // Fix reference to setAnchorEl
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Fix reference to setAnchorEl
  };

  const open = Boolean(anchorEl); // Fix reference to anchorEl
  const id = open ? 'notifications-popover' : undefined;

  return (
    <div>
      <IconButton
        aria-label="notifications"
        className={classes.notificationButton}
        onClick={handleNotificationClick}
      >
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl} // Fix reference to anchorEl
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.popover}>
          {notifications.length === 0 ? (
            <Typography className={classes.noNotifications}>No notifications</Typography>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.notificationID}>
                  <ListItemText
                    primary={notification.message}
                    secondary={moment(notification.dateSent).format('YYYY-MM-DD HH:mm:ss')}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default NotificationsList;
