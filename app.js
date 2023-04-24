import React, { useState } from "react";

const App = () => {
  const [inputData, setInputData] = useState({
    outdoorTemp: "",
    indoorTemp: "",
    flowRate: "",
  });
  const [predictedValues, setPredictedValues] = useState({});

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform prediction locally
    const { outdoorTemp, indoorTemp, flowRate } = inputData;
    const tReturn = parseFloat(outdoorTemp);
    const spReturn = parseFloat(indoorTemp);
    const tSaturation = parseFloat(indoorTemp);
    const tOutdoor = parseFloat(outdoorTemp);
    const rhSupply = parseFloat(flowRate);
    const rhReturn = parseFloat(indoorTemp);
    const rhOutdoor = 0; // Placeholder for rhOutdoor value, update it as needed
    const power = 0; // Placeholder for power value, update it as needed

    const tSupply = 3.77 + 0.21*tReturn + 0.0*spReturn + 0.78*tSaturation + 0.04*tOutdoor + -0.06*rhSupply + 0.02*rhReturn + -0.01*rhOutdoor + 0.26*power; // Calculation for tSupply

    const predicted_T_Supply = tSupply; // Update predicted_T_Supply with calculated tSupply
    const predicted_Energy =
      parseFloat(outdoorTemp) *
      parseFloat(indoorTemp) *
      parseFloat(flowRate); // Calculation for predicted Energy

    // Update state with predicted values
    setPredictedValues({
      predicted_T_Supply,
      predicted_Energy,
    });
  };

  return (
    <div>
      <h1>HVAC Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Outdoor Temperature:
          <input
            type="number"
            name="outdoorTemp"
            value={inputData.outdoorTemp}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Indoor Temperature:
          <input
            type="number"
            name="indoorTemp"
            value={inputData.indoorTemp}
            onChange={handleInputChange}
            />
            </label>
            <label>
            Flow Rate:
            <input
                     type="number"
                     name="flowRate"
                     value={inputData.flowRate}
                     onChange={handleInputChange}
                   />
            </label>
            <button type="submit">Predict</button>
            </form>
            {predictedValues.predicted_T_Supply && (
            <div>
            <h2>Predicted Values:</h2>
            <p>Predicted T_Supply: {predictedValues.predicted_T_Supply}</p>
            <p>Predicted Energy: {predictedValues.predicted_Energy}</p>
            </div>
            )}
            </div>
            );
            };
            
            export default App;