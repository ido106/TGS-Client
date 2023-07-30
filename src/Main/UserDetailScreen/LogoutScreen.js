

function LogoutScreen({setActiveTab, endSession, setIsUserVerified}) {
    const handleLogout = () => {
        endSession(); // End the session
        setIsUserVerified(false);
        setActiveTab('Home'); // Switch to Home tab
      };

return(
    <div>
    האם ברצונך להתנתק?
    <button onClick={handleLogout}>התנתק</button>
    </div>
);
}
export default LogoutScreen;