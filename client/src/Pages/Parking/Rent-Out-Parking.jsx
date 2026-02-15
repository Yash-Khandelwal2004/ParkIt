import React, { useState } from "react";

const RentParking = () => {
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [count, setCount] = useState("");
const [type, setType] = useState("four wheeler");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const rentingData = { address, fee, count, type };

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/parking/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(rentingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Success:", data);

      setAddress("");
      setFee("");
      setCount("");
      setType("Two Wheeler");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />

      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Fee"
      />

    
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Number of Parkings"
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="two wheeler">two wheeler</option>
        <option value="four wheeler">four wheeler</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RentParking;
