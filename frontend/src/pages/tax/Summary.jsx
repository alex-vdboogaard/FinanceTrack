import { useEffect, useState } from "react";
import { getCurrentMonthInfo } from "../../utility/dates";
import deleteIcon from "../../assets/delete.svg";
import pops from "pop-message";
import { fetchData } from "../../utility/fetchData";
export default function Summary() {
  const [year, setYear] = useState(getCurrentMonthInfo().year);
  const [items, setItems] = useState([]);
  const [totalOwed, setTotalOwed] = useState(0);
  const [rerender, setRerender] = useState(false);

  const calculateTotals = (items) => {
    const totalDue = items.reduce((acc, item) => acc + parseFloat(item.due), 0);
    setTotalOwed(totalDue);
  };

  const url = "http://localhost:3001/user/tax";

  const handleSave = (item) => {
    fetchData(url, "PUT", item);
  };

  const handleDelete = async (item) => {
    const confirm = await pops.confirmPop(
      `Are you sure you want to delete '${item.name}'?`
    );
    if (confirm) {
      fetchData(url, "DELETE", item).then(() => {
        const updatedItems = items.filter((i) => i.id !== item.id);
        setItems(updatedItems);
        calculateTotals(updatedItems);
        pops.simplePop("success", "Item deleted");
      });
    }
  };

  const handleUpdate = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const handleNew = () => {
    const formData = {
      name: "Item",
      amount: 0,
      due: 0,
      year: year,
    };
    fetchData(url, "POST", formData).then(() => {
      handleRerender();
    });
  };

  useEffect(() => {
    fetchData(url).then((data) => {
      setItems(data.items);
      calculateTotals(items);
    });
  }, [year, rerender]);

  return (
    <div className="summary-wrapper">
      <h2 className="h2">Summary for {year}</h2>
      <table>
        <thead>
          <tr className="no-border">
            <th>
              Item <button onClick={handleNew}>+</button>
            </th>
            <th>Amount (R)</th>
            <th>Due to SARS (R)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleUpdate(index, "name", e.target.value)
                    }
                    onBlur={(e) => handleSave(item)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleUpdate(index, "amount", parseFloat(e.target.value))
                    }
                    onBlur={() => handleSave(item)}
                  />
                </td>
                <td>
                  <span>{item.due >= 0 ? "+ " : ""}</span>
                  <input
                    type="number"
                    value={item.due}
                    onChange={(e) =>
                      handleUpdate(index, "due", parseFloat(e.target.value))
                    }
                    onBlur={() => handleSave(item)}
                  />
                </td>
                <td className="delete-icon">
                  <button onClick={() => handleDelete(item)}>
                    <img src={deleteIcon} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>R{totalOwed}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
