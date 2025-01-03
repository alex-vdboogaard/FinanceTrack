import FilteredFolders from "../../components/filtered-folders/FilteredFolders";
import Summary from "./Summary";
import "./Tax.css";
export default function Tax() {
  return (
    <main>
      <h1 className="h1">Tax</h1>
      <FilteredFolders title="Folders" name={"taxes"}></FilteredFolders>
      <Summary></Summary>
    </main>
  );
}
