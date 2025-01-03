import FilteredFolders from "../../components/filtered-folders/FilteredFolders";
export default function Tax() {
  return (
    <main>
      <h1 className="h1">Tax</h1>
      <FilteredFolders title="Folders" name={"taxes"}></FilteredFolders>
    </main>
  );
}
