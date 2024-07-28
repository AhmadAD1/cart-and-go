import { Backdrop, CircularProgress } from "@mui/material";

import { useApiProvider } from "../../providers/apiProvider";

const LoadingProgress = () => {
  const { isLoading } = useApiProvider();
  return (
    <Backdrop
      open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingProgress;
