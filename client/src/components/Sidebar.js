import styled from "styled-components";
import SidebarLink from "./SidebarLink";
import SidebarLogo from "./SidebarLogo";
const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarLogo />
      <Ul>
        <SidebarLink icon="dashboard" to="/" text="Dashboard" />
        <SidebarLink icon="insert_invitation" to="" text="Requests" />
        <SidebarLink icon="event_available" to="" text="Session" />
        <SidebarLink icon="business" to="" text="Departements" />
        <SidebarLink icon="groups" to="" text="Learners" />
        <SidebarLink icon="class" to="/Courses" text="Courses" />
        <SidebarLink icon="cases" to="" text="Partners" />
      </Ul>
      <Ul bottom>
        <CentringDiv>
          <SidebarLink icon="settings" to="" text="Settings" />
          <SidebarLink icon="logout" to="" text="Log out" />
        </CentringDiv>
      </Ul>
    </SidebarWrapper>
  );
};
const CentringDiv = styled.div`
  position: relative;
  left: -50%;
  top: 0;
`;
const SidebarWrapper = styled.div`
  position: fixed;
  height: 95vh;
  width: 233px;
  top: 16px;
  left: 16px;
  background: #393940;
  border-radius: 10px;
`;
const Ul = styled.ul`
  position: ${(props) => (props.bottom ? "absolute" : "static")};
  bottom: 10px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

/* Logo */

export default Sidebar;
