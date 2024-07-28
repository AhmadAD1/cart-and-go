import Flex from "@components/Flex/Flex";
import { Typography } from "@mui/material";
import { STYLE } from "@src/constants";
function SectionTitle({ title }: { title: string }) {
  const fl = title.charAt(0);
  const restLetters = title.slice(1);
  return (
    <Flex jc="flex-start">
      <Typography component={"span"} sx={{ fontSize: "2rem", color: STYLE.primaryColor, fontWeight: 700, mr: 0.2 }}>
        {fl}
      </Typography>
      <Typography
        sx={{
          mb: -1,
          position: "relative",
          fontWeight: 800,
          textTransform: "uppercase",
          "&:before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: 0.08,
            backgroundColor: STYLE.primaryColor,
            top: 2.2,
            left: -3,
          },
        }}>
        {restLetters}
      </Typography>
    </Flex>
  );
}

export default SectionTitle;
