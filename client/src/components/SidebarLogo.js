import styled from "styled-components";
const SidebarLogo = () => {
  return (
    <Wrapper>
      <StyledImage src="AMP_Logo.svg"></StyledImage>
      <Line></Line>
    </Wrapper>
  );
};
const StyledImage = styled.img`
  width: 160px;
  height: 60px;
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 16px;
`;

const Line = styled.hr`
  width: 160px;
`;
export default SidebarLogo;
