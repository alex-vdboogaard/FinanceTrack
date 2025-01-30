export default function Separator({ top = false }) {
  const styles = {
    borderTop: "1px solid #bbb",
    maxWidth: "99%",
    width: "100%",
    marginTop: top === false ? "40px" : "0px",
  };

  return <hr style={styles} />;
}
