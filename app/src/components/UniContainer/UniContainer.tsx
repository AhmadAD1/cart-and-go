import React, { ReactNode } from "react";
import { Container, ContainerProps } from "@mui/material";

interface UniContainerProps {
  children: ReactNode;
}

const UniContainer: React.FC<UniContainerProps & ContainerProps> = ({ children, ...props }) => {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
};

export default UniContainer;
