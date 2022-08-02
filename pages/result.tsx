import { Button, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
const Result: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Stack
        padding={10}
        gap={5}
        direction={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="100%"
      >
        <Typography variant="h3" textAlign={"center"}>
          You Scored: {router.query.score} / 10
        </Typography>
        <Button variant="contained" onClick={() => router.replace("/")}>
          TRY AGAIN
        </Button>
      </Stack>
    </>
  );
};

export default Result;
