// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useState } from "react";

// table component import
import DataTable from "examples/Tables/DataTable";

//import QuotaData
import QuotaListData from "../../data/QuotaListData";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DefaultProjectCard({ image, title, action, closeAddModel }) {
  const [expanded, setExpanded] = useState(false);

  const { columns, rows } = QuotaListData();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        overflow: "visible",
      }}
    >
      <MDBox width="100%" shadow="xxl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          display="flex"
          sx={{
            width: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { xs } }) => xs,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={1} p={1}>
        <MDBox mb={3} display="flex" justifyContent="center">
          <MDTypography variant="h5" textTransform="capitalize">
            {title}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" justifyContent="center" pb={2}>
          <MDButton
            variant="contained"
            size="small"
            color={action.color}
            onClick={() => closeAddModel(true)}
          >
            {action.label}
          </MDButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: "#2b85eb" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </MDBox>
      </MDBox>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MDBox>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              noEndBorder
              showTotalEntries={false}
              entriesPerPage={false}
            />
          </MDBox>
        </CardContent>
      </Collapse>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default DefaultProjectCard;
