import { Icon } from "@mui/material";

export default function Data() {
  const notificationsData = [
    {
      id: 1,
      icon: <Icon>warning</Icon>,
      route: "/courses",
      label: "requests to join course :",
      transmitter: "rachid",
      subject: "5G",
    },
    {
      id: 2,
      icon: <Icon>warning</Icon>,
      route: "/courses",
      label: "requests to join course :",
      transmitter: "imad",
      subject: "Big Data",
    },
    {
      id: 3,
      icon: <Icon>warning</Icon>,
      route: "/courses",
      label: "requests to join course :",
      transmitter: "swil7",
      subject: "5G",
    },
    {
      id: 4,
      icon: <Icon>warning</Icon>,
      route: "/courses",
      label: "requests to join course :",
      transmitter: "Lbig",
      subject: "Big Data",
    },
  ];

  return notificationsData;
}
