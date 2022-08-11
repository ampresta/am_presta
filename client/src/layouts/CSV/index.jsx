import React, { useState } from "react";
import Papa from "papaparse";
import axiosAuth from "services/authAxios";
import { addCoursesRoute } from "utils/APIRoutes";
import { addPartnersRoute } from "utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Csv = () => {
  const navigate = useNavigate();
  const uploadType = localStorage.getItem("uploadType");

  const [error, setError] = useState("");

  const [file, setFile] = useState("");

  useEffect(() => {}, []);

  const upload = (data) => {
    switch (uploadType) {
      case "courses":
        addCourses(data);
        break;

      case "providers":
        console.log("uploading courses");
        addProvider(data);
        break;

      default:
        break;
    }
  };

  const addCourses = (DATA) => {
    DATA.map(async (course) => {
      const { data } = await axiosAuth.post(addCoursesRoute, {
        nom: course.nom,
        provider: course[" providerID"],
        description: course[" description"],
      });
    });
    navigate("/courses");
  };

  const addProvider = (DATA) => {
    DATA.map(async (provider) => {
      const { data } = await axiosAuth.post(addPartnersRoute, provider);
    });
    navigate("/partners");
  };

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      parsedData.splice(-1);
      upload(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginLeft: "50%" }}>
      <label htmlFor="csvInput" style={{ display: "block" }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        accept=".csv"
        type="File"
      />
      <div>
        <button onClick={handleParse}>Add Courses</button>
      </div>
    </div>
  );
};

export default Csv;
