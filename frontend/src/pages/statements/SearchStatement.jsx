import { useState } from "react"
import { fetchData } from "../../utility/fetchData";
import Modal from "../../components/modal/Modal";
import StatementsList from "./StatementsList";
import Button from "../../components/button/Button";
import searchIcon from "../../assets/search.svg"

export default function SearchStatement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchStatements, setSearchStatements] = useState([]);

  const handleUpdate = (e) => {
    setSearchQuery(e.target.value);
  };

    const handleSearch = async(e) => {
        e.preventDefault();
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
            <form onSubmit={handleSearch} style={{maxWidth:"300px", position:"relative", marginBottom:"20px"}}>
                <input style={{marginRight:"20px"}} value={searchQuery} type="text" className="normal-input search-input" onChange={(e) => handleUpdate(e)}/>
                <Button type="button" onClick={handleSearch} className="primary-btn" styles={{position:"absolute", padding: "10px 15px", right:"0px", top:"9px"}}><img src={searchIcon} /></Button>
            </form>
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