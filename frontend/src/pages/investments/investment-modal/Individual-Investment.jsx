import { useEffect, useState } from "react";
import { fetchData } from "../../../utility/fetchData";
import Modal from "../../../components/modal/Modal";

export default function IndividualInvestment({
  investment = { id: 1, description: "Default Investment" },
  toggleModal,
  isOpen,
}) {
  const [investmentHistory, setInvestmentHistory] = useState([]);

  useEffect(() => {
    if (investment?.id) {
      fetchData(
        `http://localhost:3001/investments/history/${investment.id}`
      ).then((data) => {
        setInvestmentHistory(data.history);
      });
    }
  }, [investment.id]); // Use investment.id to avoid re-fetching unnecessarily.

  return (
    investment && (
      <Modal isOpen={isOpen} type={"center"} toggleSidebar={toggleModal}>
        <h2>{investment.description}</h2>
        {investmentHistory &&
          investmentHistory.map((item, index) => (
            <p key={index}>{item.invested}</p>
          ))}
      </Modal>
    )
  );
}
