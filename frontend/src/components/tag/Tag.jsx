import "./Tag.css";
export default function Tag({ tag }) {
    if (!tag) {
        return;
    }

    return (
        <p className="tag" style={{ backgroundColor: tag.colour || "black" }}>
            {tag.name}
        </p>
    );
}
