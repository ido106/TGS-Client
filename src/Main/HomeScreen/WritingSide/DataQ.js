import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./DataQ.css";

const DataQ = ({ dataList, setDataList }) => {
  const deleteItem = (index) => {
    // Create a new array without the deleted item
    const updatedDataList = [...dataList];
    updatedDataList.splice(index, 1);

    // Update the state with the new array
    setDataList(updatedDataList);
  };

  function printHebrewData(data) {
    if (data) {
      // if data.claim in nil or in length 0 return data.claim
      if (!data.claim || data.claim.length === 0) {
        return data.claim;
      }
      let revData = data.claim.slice().reverse();
      let revStr = revData.join(" ");
      // add data.exp to be shown in the beginning of the string
      revStr = data.exp + " - " + revStr;
      
      return revStr;
    }
  }

  return (
    <div>
      <ListGroup className={"scrollable-list"}>
        <ListGroupItem className="Hebrew bold-text">שאלה</ListGroupItem>
        {dataList
          ? dataList.map((d, index) => (
              <ListGroupItem className="Hebrew" key={index}>
                {printHebrewData(d)}
                <Button
                  variant="outline-dark"
                  className="btn-sm dataQ_bt"
                  onClick={() => deleteItem(index)}
                >
                  X
                </Button>
              </ListGroupItem>
            ))
          : null}
      </ListGroup>
    </div>
  );
};

export default DataQ;
