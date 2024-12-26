import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Button from "../../../components/button/Button";
import { fetchData } from "../../../utility/fetchData";

export default function NewHistory({
  rerender,
  investment,
  isOpen,
  setIsOpen,
}) {
  const [formData, setFormData] = useState({
    current: 0,
    invested: 0,
    year: 2024,
    month: 1,
    id: investment?.id || 0, // Default to 0 if no investment
  });

  // Close modal function
  const closeNewHistory = () => {
    setIsOpen(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(
      "http://localhost:3001/investments/history",
      "POST",
      formData
    ).then((successData) => {
      setIsOpen(false); // Close modal after submission
      rerender(); // Trigger a rerender in parent component
    });
  };

  return (
    <Modal type={"center"} isOpen={isOpen} toggleSidebar={closeNewHistory}>
      <h2 className="h2">Log new history for: {investment.description}</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            className="normal-input"
            value={formData.year}
            onChange={handleInputChange}
          >
            {[2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selector */}
        <div className="input-wrapper">
          <label htmlFor="month">Month</label>
          <select
            name="month"
            id="month"
            className="normal-input"
            value={formData.month}
            onChange={handleInputChange}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Invested Amount Input */}
        <div className="input-wrapper">
          <label htmlFor="invested">Invested this month (R)</label>
          <input
            className="normal-input"
            type="number"
            name="invested"
            id="invested"
            min={0}
            value={formData.invested}
            onChange={handleInputChange}
          />
        </div>

        {/* Current Value Input */}
        <div className="input-wrapper">
          <label htmlFor="current">Current value this month (R)</label>
          <input
            className="normal-input"
            type="number"
            name="current"
            id="current"
            min={0}
            value={formData.current}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="primary-btn"
          styles={{ marginTop: "30px" }}
        >
          Log history +
        </Button>
      </form>
    </Modal>
  );
}
