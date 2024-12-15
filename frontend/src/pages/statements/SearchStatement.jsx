import { useState } from "react"
import { fetchData } from "../../utility/fetchData";
import Modal from "../../components/modal/Modal";
import StatementsList from "./StatementsList";
export default function SearchStatement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchStatements, setSearchStatements] = useState([]);

  const handleUpdate = (e) => {
    setSearchQuery(e.target.value);
  };

    const handleSearch = async() => {
        fetchData(`http://localhost:3001/statements/search/${searchQuery}`)
        .then((data) => {
            setSearchOpen(true);
            setSearchStatements(data.files);
        })
    }

    const handleClose = () => {
        setSearchOpen(false);
    }

    return (
        <>
            <div className="input-wrapper">
                <label htmlFor="search">Search</label>
                <input value={searchQuery} type="text" className="normal-input" onChange={(e) => handleUpdate(e)}/>
                <button type="button" onClick={() => {handleSearch()}}>Search</button>
            </div>
            {searchOpen && (
                <Modal isOpen={searchOpen} type='center' toggleSidebar={handleClose}>
                    <h2 className="h2">
                        Search results
                    </h2>
                    <StatementsList statements={searchStatements} loading={{statements:false}}></StatementsList>
                </Modal>
            )}
        </>
    )
}