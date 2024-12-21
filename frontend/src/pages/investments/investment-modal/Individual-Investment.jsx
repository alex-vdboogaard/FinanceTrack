import { useEffect, useState } from "react";
import { fetchData } from "../../../utility/fetchData";
import Modal from "../../../components/modal/Modal";
import TimeSeriesChart from "../../../components/graph/TimeSeriesChart";
import pops from "pop-message";

export default function IndividualInvestment({
  investment = { id: 1, description: "Default Investment" },
  toggleModal,
  isOpen,
}) {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [rerender, setRerender] = useState(false);

  const handleNewValue = async () => {
    const value = await pops.inputPops([
      { invested: "invested" },
      { currentValue: "currentValue" },
      { year: "year" },
      { month: "month" },
    ]);
    value.investment_id = investment.id;
    if (value) {
      fetchData(
        "http://localhost:3001/investments/history",
        "POST",
        value
      ).then(() => {
        handleRerender();
      });
    }
  };

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    if (investment?.id) {
      fetchData(
        `http://localhost:3001/investments/history/${investment.id}`
      ).then((data) => {
        // Ensure history is properly set
        setInvestmentHistory(Array.isArray(data.history) ? data.history : []);
      });
    }
  }, [investment.id, rerender]);

  // Variables for the chart
  const variables = [
    {
      key: "invested",
      label: "Invested Amount",
      color: "rgba(75, 192, 192, 1)",
    },
    {
      key: "currentValue",
      label: "Current Value",
      color: "rgba(192, 75, 192, 1)",
    },
  ];

  // Format the data to include a readable label for each month
  const formattedHistory = investmentHistory.map((item) => ({
    label: `${item.year}-${String(item.month).padStart(2, "0")}`, // Format as YYYY-MM
    ...item,
  }));

  return (
    investment && (
      <Modal isOpen={isOpen} type={"center"} toggleSidebar={toggleModal}>
        {formattedHistory.length > 0 ? (
          <div style={{ width: "1000px" }}>
            <h2>
              {investment.description}{" "}
              <button
                onClick={() => {
                  handleNewValue();
                }}
              >
                + update
              </button>
            </h2>

            <TimeSeriesChart
              title={"Investment History"}
              items={formattedHistory}
              variables={variables}
            />
          </div>
        ) : (
          <p>No investment history available.</p>
        )}
      </Modal>
    )
  );
}
