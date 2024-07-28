import { Box, BoxProps } from "@mui/material";

interface FlexProps extends Omit<BoxProps, "component"> {
  jc?: React.CSSProperties["justifyContent"];
  ai?: React.CSSProperties["alignItems"];
  gap?: number | string;
  dir?: React.CSSProperties["flexDirection"];
  style?: any;
}

const Flex: React.FC<FlexProps> = ({
  children,
  jc = "center",
  ai = "center",
  gap = 0,
  dir = "row",
  style,
  ...rest
}) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: jc,
        alignItems: ai,
        gap,
        flexDirection: dir,
        ...style,
      }}
      {...rest}>
      {children}
    </Box>
  );
};

export default Flex;
