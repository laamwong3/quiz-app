import { Box } from "@mui/material";
import Image from "next/image";
import bgImage from "../../images/quiz-background.jpeg";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box position={"relative"}>
        <Box
          zIndex={-2}
          position="absolute"
          minWidth={"100vw"}
          minHeight={"100vh"}
        >
          <Image src={bgImage} objectFit="cover" layout="fill" />
        </Box>
        <Box
          border={"10px solid grey"}
          width="100vw"
          height="100vh"
          borderRadius={2}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
