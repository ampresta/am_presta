import { NavLink } from "react-router-dom";
import styled from "styled-components";
const SidebarLink = (props) => {
  return (
    <StyledLi>
      <StyledNavLink to={props.to}>
        <IconWrapper className="material-icons">{props.icon}</IconWrapper>
        <TextWrapper>{props.text}</TextWrapper>
      </StyledNavLink>
    </StyledLi>
  );
};
const StyledNavLink = styled(NavLink)`
  margin: 2px 15px;
  color: #0e94d4;
  text-decoration: none;
  margin-left: 22px;
  margin-top: 1px;
  margin-bottom: 1px;
`;

const IconWrapper = styled.span`
  font-size: 22px;
  color: white;
  margin-right: 19px;
  vertical-align: middle;
`;
const TextWrapper = styled.span`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 14px;
  color: white;
  vertical-align: middle;
`;
const StyledLi = styled.li`
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #3f3f46;
  height: 7vh;
  max-height: 48px;
  margin-bottom: 5px;
`;
export default SidebarLink;
