import { useNavigate } from "react-router-dom"
import AccountCircle from "./AccountCircle"

const Header = () => {

  const navigate = useNavigate();

  const handleHome = () =>{
    navigate('/')
  }

  return (
    <div className="header">
      <div className="logo" onClick={handleHome}>
        Type<span>Master</span>
      </div>
      <div className="user-icon">
        {/* user icon  */}
        <AccountCircle />
      </div>
    </div>
  )
}

export default Header