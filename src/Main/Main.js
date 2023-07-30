import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './Main.css';
import HomeScreen from './HomeScreen/HomeScreen';
import UserDetailScreen from './UserDetailScreen/UserDetailScreen';
import LogoutScreen from './UserDetailScreen/LogoutScreen';
import AnswerScreen from './AnswerScreen/AnswerScreen';
import HistoryScreen from './HistoryScreen/HistoryScreen';
import Modal from 'react-bootstrap/Modal';
import SavedAnswersPage from './SavedAnswers/SavedAnswersPage';
import Button from 'react-bootstrap/Button';

const Main = () => {
  const [dataList, setDataList] = useState([]);
  const [activeTab, setActiveTab] = useState('Home');
  const [isUserVerified, setIsUserVerified] = useState(false); // Track user verification
  const [solveScreen, setSolveScreen] = useState(false);
  const [history, setHistory] = useState([]); // State variable for history data
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup for history
  const [showSavedPopup, setShowSavedPopup] = useState(false); // Popup for saved answers
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isStarred, setIsStarred] = useState(false);


  const SESSION_DURATION = 90 * 60 * 1000; // 90 minutes in milliseconds

  const answer = null;

  const resetSolveScreen = () => {
    setSolveScreen(false);
  };

  const handleSaveAnswer = (ans) => {
    // ans is string:string dictionary
    // copy it to answer
    for (const key in ans) {
      answer[key] = ans[key];
    }
  };

  const handleTabChange = async (tab) => {
    // Check if the tab is "History" and window.UserID is null
    if (tab === 'SavedAnswers' && window.UserID === null) {
      // Open the popup modal
      setShowSavedPopup(true);
      setTimeout(() => {
        setShowSavedPopup(false);
      }, 3000);
    }
    else if (tab === 'History' && window.UserID === null) {
      // Open the popup modal
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } 
    else if (tab ==="LogoutTab" && window.UserID != null) {
      setShowLogoutModal(true);
    }
    else {
      setActiveTab(tab);
      if (tab === 'History') {
        setIsHistoryLoading(true);
        await fetchHistory();
        setIsHistoryLoading(false);
      } else if (tab === 'SavedAnswers') {
        setIsHistoryLoading(true);
        await fetchSavedAnswers();
        setIsHistoryLoading(false);
      }
    }
  };

  // Callback function to update user verification status
  const handleUserVerification = () => {
    if (!isUserVerified) {
      setIsUserVerified(true);
      setActiveTab('Home'); // Switch to Home tab after successful verification
    }
  };


  useEffect(() => {
    const storedSession = localStorage.getItem('Session');
    if (storedSession) {
      const { userID, expiration } = JSON.parse(storedSession);
      const currentTime = Date.now();
      if (currentTime < expiration) {
        window.UserID = userID;
        if (typeof handleUserVerification === 'function') {
          handleUserVerification();
        }
      } else {
        localStorage.removeItem('Session');
        window.UserID = null;
      }
    }
  }, [handleUserVerification]);

const startSession = (userID) => {
    const expiration = Date.now() + SESSION_DURATION;
    const session = { userID, expiration };
    localStorage.setItem('Session', JSON.stringify(session));
  };

  const endSession = () => {
    localStorage.removeItem('Session');
    window.UserID = null;
  };

  const handleSolveClick = () => {
    setSolveScreen(true);
  };

  const fetchSavedAnswers = async () => {
    try {
      const response = await fetch(`http://localhost:7025/api/Solution/GetStarred?id=${window.UserID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle the error if the API request fails
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      // if data is not null and its length is greater than 0
      if (data && data.length > 0) {
        setHistory(data.reverse());
      }
      else {
        setHistory(data);
      }

      return Promise.resolve(); // Resolve the Promise when history data is set
    } catch (error) {
      // Handle the error
      console.error(error);
      return Promise.reject(error); // Reject the Promise if an error occurs
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:7025/api/Solution/GetHistory?id=${window.UserID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle the error if the API request fails
        throw new Error('Failed to fetch history');
      }
  
      const data = await response.json();
      // if data is not null and its length is greater than 0
      if (data && data.length > 0) {
        setHistory(data.reverse());
      }
      else {
        setHistory(data);
      }
  
      return Promise.resolve(); // Resolve the Promise when history data is set
    } catch (error) {
      // Handle the error
      console.error(error);
      return Promise.reject(error); // Reject the Promise if an error occurs
    }
  };
  
  const handleLogout = () => {	
    endSession();	
    setIsUserVerified(false);	
    setActiveTab('Home');	
    setShowLogoutModal(false);	
  };	


  return (
    <div id="mainScreen">
      <div className="tg-header-container">
        <h1 className="tg-header">TG-Solver</h1>
      </div>

      <Tabs className="Hebrew" activeKey={activeTab} onSelect={handleTabChange}>
        {window.UserID == null ? (
          <Tab eventKey="My Details" title="התחבר">
            <UserDetailScreen onUserVerified={handleUserVerification} startSession={startSession} />
          </Tab>
        ) : (
          <Tab eventKey="LogoutTab" title="התנתק">
              <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} 
                dialogClassName="text-right" centered>	
                <Modal.Body className="text-center bold-text">	
                  ?האם אתה בטוח שברצונך להתנתק	
                </Modal.Body>	
                <Modal.Footer className="text-right" dialogClassName="text-right" centered>	
                  <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>	
                    חזור	
                  </Button>	
                  <Button variant="primary" onClick={handleLogout}>	
                    התנתק	
                  </Button>	
                </Modal.Footer>	
              </Modal>
          </Tab>
        )}
          <Tab eventKey="SavedAnswers" title="תשובות ששמרתי">
              {/* Render the HistoryScreen component if connected */}
              {!isHistoryLoading && (
                <SavedAnswersPage history={history} setHistory={setHistory} 
                  isStarred={isStarred} setIsStarred={setIsStarred}/>
              )}

              {/* Popup modal if not connected */}
              <Modal show={showSavedPopup} onHide={() => setShowSavedPopup(false)} centered>
                <Modal.Body className="text-center bold-text">התחבר כדי לצפות בתשובות ששמרת</Modal.Body>
              </Modal>
          </Tab>

          <Tab eventKey="History" title="היסטוריית שאלות">
              {/* Render the HistoryScreen component if connected */}
              {!isHistoryLoading && (
                <HistoryScreen history={history} setHistory={setHistory} 
                isStarred={isStarred} setIsStarred={setIsStarred}/>
              )}
            
              {/* Popup modal if not connected */}
              <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
                <Modal.Body className="text-center bold-text">התחבר כדי לצפות בהיסטוריה</Modal.Body>
              </Modal>
          </Tab>
      

          <Tab eventKey="Home" title="עמוד הבית">
            {solveScreen ? (
              <AnswerScreen
                text="חזור לדף הבית"
                resetSolveScreen={resetSolveScreen}
                isStarred={isStarred}
                setIsStarred={setIsStarred}
                IsNotFav={true}
              />
            ) : (
              <HomeScreen
                dataList={dataList}
                setDataList={setDataList}
                handleSolveClick={handleSolveClick}
                handleSaveAnswer={handleSaveAnswer}
                setIsStarred={setIsStarred}
              />
            )}
          </Tab>
      </Tabs>
    </div>
  );
};

export default Main;
