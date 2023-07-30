import {Button} from "react-bootstrap";
import React from "react";

const SaveQ = ()=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate the form inputs and submit the data to the server or store it in local storage
    };
    return(
        <Button className="submit-button"
                type="submit"
                onClick={handleSubmit}>
            שמור
        </Button>

    )
}
export default SaveQ;
