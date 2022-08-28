import { Icon } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "services/authAxios";
import { getNotifsCollabRoute, getNotifsSocRoute } from "utils/APIRoutes";

import { useMaterialUIController, setChangedNotif } from "context";
import { marknoptifReadRoute } from "utils/APIRoutes";

const ALL_NOTIFS_TYPES = ["Session", "Provider", "Voucher", "Proof", "Request"];

const generate_notif = (data, entity, description, emetteur, id) => {
  switch (entity) {
    case "Request":
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

    default:
      break;
  }
};

export const markRead = async (notifId) => {
  await axios.post(marknoptifReadRoute, { notifId });
};

export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const { changedNotif, accountType } = controller;

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
  }, []);

  const socket = useRef();

  // Update Notifs using ws
  useEffect(() => {
    socket.current = io("http://127.0.0.1:8000");
  }, [socket]);

  useEffect(() => {
    socket.current.on("notif", async () => {
      let route;
      if (accountType === "Societe") {
        route = getNotifsSocRoute;
      } else if (accountType === "Collab") {
        route = getNotifsCollabRoute;
      }
      const { data } = await axios.post(route);
      setNotifs(data);
      setChangedNotif(dispatch, data.length);
    });
  }, [socket]);

  const notificationsData = [];

  // console.log(notifs);

  if (Array.isArray(notifs) && notifs.length > 0) {
    notifs.map((notif) => {
      const { nom, prenom } = notif.Notification_change.emetteur.Collaborateur;
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
