import { Icon } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "services/authAxios";
import { getNotifsCollabRoute, getNotifsSocRoute } from "utils/APIRoutes";

import { useMaterialUIController, setChangedNotif,setUpdater } from "context";
import { marknoptifReadRoute } from "utils/APIRoutes";


const generate_notif = (data, entity, description, emetteur, id) => {
  switch (entity) {
    case "Request":
      if (data.Request !== null) {
        const cours = data.Request.Cour.nom;
        const notif_component = {
          id,
          icon: <Icon>warning</Icon>,
          route: "/requests",
          label: description,
          transmitter: emetteur,
          subject: cours,
        };
        return notif_component;
      }
      return{
        id,
        icon: <Icon>warning</Icon>,
        route: "/requests",
        label: description,
        transmitter: emetteur,
        subject: "",
      };

    default:
      break;
  }
};

export const markRead = async (notifId) => {
  await axios.post(marknoptifReadRoute, { notifId });
};

export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const { accountType,userId,updater } = controller;

  const [notifs, setNotifs] = useState(null);

  // Get initial Notifs no ws
  useEffect(() => {
    const getNotifs = async () => {
      let route;
      if (accountType === "Societe") {
        route = getNotifsSocRoute;
      } else if (accountType === "Collab") {
        route = getNotifsCollabRoute;
      }
      const { data } = await axios.post(route);
      setNotifs(data);
      setChangedNotif(dispatch, data.length);
    };
    getNotifs();
	  setUpdater(dispatch,!updater);
  }, []);

  const socket = useRef();

  // Update Notifs using ws
 // useEffect(() => {
    //socket.current = io("ws://102.50.245.168:58356/ws");

 // }, [socket]);

  useEffect(() => {
     const socket_=new WebSocket("ws://institute-eca.ma:58356/ws")
	  socket_.onopen = function(e) {
	  socket_.send(JSON.stringify({
		    type: "join",
		  username:userId
	  }));
	  }
	  socket_.addEventListener('message',async (event) => {
		      console.log('Message from server ', event.data);
     const  data=JSON.parse(event.data);
		  if(data.type==="notif"){
      let route;
      if (accountType === "Societe") {
        route = getNotifsSocRoute;
      } else if (accountType === "Collab") {
        route = getNotifsCollabRoute;
      }
      const { data } = await axios.post(route);
      setNotifs(data);
      setChangedNotif(dispatch, data.length);
		  }});
  }, [socket]);



  const notificationsData = [];

  // console.log(notifs);

  if (Array.isArray(notifs) && notifs.length > 0) {
    notifs.map((notif) => {
      const { nom, prenom } = notif.Notification_change.emetteur;
      const { description, entity } = notif.Notifications_Entity;
      const notif_content = generate_notif(
        notif,
        entity,
        description,
        `${nom} ${prenom}`,
        notif.id
      );
      notificationsData.push(notif_content);
    });
  }

  return notificationsData;
}
