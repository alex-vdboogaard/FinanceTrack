export default function UpcomingPayment({ loan }) {
    const getLastDayOfMonth = () => {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const day = lastDay.getDate();
        const month = lastDay.toLocaleString("default", { month: "long" });
        const year = lastDay.getFullYear();

        return `${day} ${month} ${year}`;
    };

    const day = getLastDayOfMonth();
    return (
        <tr>
            <td>{loan.name}</td>
            <td>{loan.balance}</td>
            <td>{loan.monthly_repayment}</td>
            <td>{day}</td>
        </tr>
    );
}
