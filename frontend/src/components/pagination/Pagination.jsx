import Button from "../button/Button";

export default function Pagination({ numPages, handleChange, activePage }) {
    return (
        <div className="pagination-wrapper">
            {activePage > 1 && (
                <Button
                    className="secondary-btn"
                    onClick={() => handleChange(activePage - 1)}
                >
                    Prev
                </Button>
            )}
            {Array.from({ length: numPages }, (_, index) => {
                const page = index + 1; // Calculate the page number
                return (
                    <Button
                        key={page}
                        className={
                            page === activePage
                                ? "primary-btn"
                                : "secondary-btn"
                        }
                        onClick={() => handleChange(page)}
                    >
                        {page}
                    </Button>
                );
            })}
            {activePage < numPages && (
                <Button
                    className="secondary-btn"
                    onClick={() => handleChange(activePage + 1)}
                >
                    next
                </Button>
            )}
        </div>
    );
}
