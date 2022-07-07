import styled from "styled-components";


export const Wrapper = styled.main`
  padding-left: 20px;
  padding-right: 20px;
`;

export const Header = styled.header`
  background-color: #69f3;
  padding: 20px 30px;
  box-shadow: 0 0 8px 0px #000c;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 1.2em;
  margin-left: 5px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: last baseline;
  font-size: 0.8em;
  color: gray;
`;


const TMDBLogoUrl = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"

export const TMDBLogo = () => {
  return (
    <LogoWrapper>
      Powered by <a href="https://www.themoviedb.org/" rel="noopener noreferrer" target="_blank"><Logo src={TMDBLogoUrl} /></a>
    </LogoWrapper>
  );
}