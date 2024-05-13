import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom'

const TopBar = () => {
    const location = useLocation();
    const active = "activeNav";
    const navigate = useNavigate();
  return (
    <Navbar expand="lg" className='custom-navbar'>
       <Container>
        <Navbar.Brand className='navIcon'><b>GUVI ZEN CLASS</b></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link className={`${location.pathname === '/'? "navItem":""}`} onClick={()=>navigate("/")}>
                    <MdSpaceDashboard className={`navIcon ${location.pathname === '/'? active:""}`}/>
                    <span className='ms-2'>Dashboard</span>
                </Nav.Link>
                {/* <Nav.Link className={`${location.pathname === '/mentor'? "navItem":""}`} onClick={()=>navigate("/mentor")}>
                    <FaUserPlus className={`navIcon ${location.pathname === '/mentor'? active:""}`}/>
                    <span className='ms-2'>Add Mentor</span>
                </Nav.Link> */}
                <Nav.Link className={`${location.pathname === '/student'? "navItem":""}`} onClick={()=>navigate("/student")}>
                    <FaUserPlus className={`navIcon ${location.pathname === '/student'? active:""}`}/>
                    <span className='ms-2'>Add Student</span>
                </Nav.Link>
                <Nav.Link className={`${location.pathname === '/all-student'? "navItem":""}`} onClick={()=>navigate("/all-student")}>
                    <FaUserPlus className={`navIcon ${location.pathname === '/all-student'? active:""}`}/>
                    <span className='ms-2'>All Student</span>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
       </Container>  
    </Navbar>
  )
}

export default TopBar;