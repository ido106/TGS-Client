import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Form, FormControl, Modal } from 'react-bootstrap';
import './HistoryScreen.css';
import AnswerScreen from '../AnswerScreen/AnswerScreen';

const HistoryScreen = ({ history, setHistory, isStarred, setIsStarred}) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const removeItem = async (id) => {
    fetch('http://localhost:7025/api/Solution/RemoveAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: window.UserID,
        answer_id: id
      })
    })
      .then(response => response.json())
      .then(new_history => {
        if (new_history == null) {
          setHistory([]);
        } else {
          setHistory(new_history.reverse());
        }
      });
  };

  const openModal = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    removeItem(selectedItemId);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredHistory = history.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNameOnclick = (id) => {
    // fetch the answer from the server and save it in window.FromHistoryAnswer
    fetch(`http://localhost:7025/api/Solution/GetAnswer?user_id=${window.UserID}&answer_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(answer => {
        window.FromHistoryAnswer = answer;
        setShowAnswer(true);
        setIsStarred(answer.star);
      }
    );
  }

  return (
    showAnswer ?
    <AnswerScreen text="חזור להיסטוריה" resetSolveScreen={() => setShowAnswer(false)} 
                  isStarred={isStarred} setIsStarred={setIsStarred}
                  IsNotFav={true} /> :
    <Container>
      <Row>
        <Col>
          <Form>
            <FormControl
              type="text"
              placeholder="חפש"
              onChange={onSearch}
              className="mr-sm-2 Hebrew"
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <th className="right-align"></th>
                <th className="right-align">תאריך פתרון</th>
                <th className="right-align">שם</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td className="right-align">
                    <Button
                      className="Hebrew remove-button red-button"
                      variant="danger"
                      onClick={() => openModal(item.id)}
                    >
                      הסר
                    </Button>
                  </td>
                  <td className="right-align">{item.time}</td>
                  <td className="right-align"><div onClick={() => handleNameOnclick(item.id)}>{item.name} </div></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={handleCancelDelete}
        centered
        className="custom-modal"
        dialogClassName="text-right"
      >
        <div className="modal-text">?האם למחוק לצמיתות</div>
        <Modal.Footer className="text-right" dialogClassName="text-right" centered>
          <Button variant="success" onClick={handleCancelDelete} className="green-button">
            בטל
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} className="red-button">
            הסר
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HistoryScreen;
