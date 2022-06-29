import { ControllerLink } from "helpers/urlApi";
import styled from "styled-components";

export const Wrapper = styled.article`
  display: flex;
`;

export const Title = styled.h1`
  margin-top: 0;
`;

export const Details = styled.div`
  padding-left: 20px;
  max-width: 500px;
`;

export const Poster = styled.img`
  width: 240px;
  height: 100%;
`;

export const Link = styled(ControllerLink)`
  &.matchUrl {
    color: red;
  }
`;