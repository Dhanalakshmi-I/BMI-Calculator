import React, { useState } from "react";
import underweight from "../Assets/underweight.jpg";
import normalweight from "../Assets/normalweight.jpg";
import overweight from "../Assets/overweight.jpg";
import obesity from "../Assets/obesity.jpg";

function BMIForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [result, setResult] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!name || !weight || !height) {
      setResult("Please fill all fields");
      return;
    }

    let w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (w <= 0 || h <= 0) {
      setResult("Height and Weight must be greater than 0");
      return;
    }

    // Convert pounds to kg
    if (unit === "lbs") {
      w = w * 0.453592;
    }

    const bmi = w / (h * h);
    let cat = "";
    let img = null;

    if (bmi < 18.5) {
      cat = "Underweight";
      img = underweight;
    } else if (bmi < 25) {
      cat = "Normal";
      img = normalweight;
    } else if (bmi < 30) {
      cat = "Overweight";
      img = overweight;
    } else {
      cat = "Obese";
      img = obesity;
    }

    setCategory(cat);
    setImage(img);
    setResult(`${name}, your BMI is ${bmi.toFixed(2)} (${cat})`);
  };

  return (
    <div style={styles.container}>
      <h2>BMI Calculator</h2>

      <form onSubmit={calculateBMI}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={styles.input}
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="lbs">Pounds (lbs)</option>
        </select>

        <input
          type="number"
          placeholder="Enter Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Calculate BMI
        </button>
      </form>

      {result && <h3>{result}</h3>}

      {image && (
        <img
          src={image}
          alt={category}
          width="150"
          style={{ marginTop: "15px" }}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0"
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default BMIForm;