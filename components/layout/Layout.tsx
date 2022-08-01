import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import bgImage from "../../images/quiz-background.jpeg";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box position={"relative"}>
        <Box zIndex={-2} position="absolute" width={"100vw"} height={"100vh"}>
          <Image src={bgImage} objectFit="cover" layout="fill" />
        </Box>
        <Box
          position={"absolute"}
          border={"10px solid grey"}
          width="100vw"
          height="100vh"
          borderRadius={2}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h1" textAlign={"center"} gutterBottom>
            QUIZ
          </Typography>
          <Divider />
          <Box
            flex={1}
            padding={5}
            sx={{ overflowY: "scroll", scrollbarWidth: "thin" }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
