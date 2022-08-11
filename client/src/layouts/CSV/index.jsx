import React, { useState } from "react";
import Papa from "papaparse";
import axiosAuth from "services/authAxios";
import { addCoursesRoute } from "utils/APIRoutes";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Csv = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  const [file, setFile] = useState("");

  const addCourses = () => {
    data.map((course) => {
      const { data } = axiosAuth.post(addCoursesRoute, {
        nom: course.nom,
        provider: course[" provider"],
        description: course[" description"],
      });
    });
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
      setData(parsedData);
      addCourses();
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
