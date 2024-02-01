import styled from "styled-components";
import Face from "../../icons/face.svg?react";

export const Container = styled.div`
  background-color: ${({ theme: { colors } }) => colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const FaceIcon = styled(Face)`
  stroke: ${({ theme: { colors } }) => colors.main};
`;
