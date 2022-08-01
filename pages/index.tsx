import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import illusion from "../images/online-test.svg";
import { categories, difficulties } from "../constants";
import { ChangeEvent, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useRouter } from "next/router";

interface Input {
  player: string;
  category: number;
  difficulty: "easy" | "medium" | "hard";
}

const Home: NextPage = () => {
  const [input, setInput] = useState({} as Input);
  const { setNotification } = useNotification();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    const { category, difficulty, player } = input;
    if (
      player !== undefined &&
      category !== undefined &&
      difficulty !== undefined
    ) {
      router.push("/quiz");
    } else {
      setNotification({
        open: true,
        type: "error",
        message: "Please fill all the required details",
      });
    }
  };
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems={"center"}
        gap={3}
      >
        <Stack
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            height: { xs: "30%", sm: "30%", md: "30%" },
          }}
          direction={"row"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Image src={illusion} objectFit={"fill"} />
        </Stack>
        <Stack
          width={"100%"}
          height={"100%"}
          flex={1}
          direction={"column"}
          justifyContent="center"
          alignItems={"center"}
          gap={5}
        >
          <Typography variant="h3"> Quiz Settings</Typography>
          <TextField
            name="player"
            label="Player Name"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            value={input.player}
            onChange={handleChange}
          />
          <TextField
            name="category"
            label="Category"
            variant="outlined"
            select
            fullWidth
            helperText="Please select a category"
            value={input.category}
            onChange={handleChange}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.value}>
                {category.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="difficulty"
            label="Difficulty"
            variant="outlined"
            select
            fullWidth
            helperText="Please select a difficulty"
            value={input.difficulty}
            onChange={handleChange}
          >
            {difficulties.map((difficulty, index) => (
              <MenuItem key={index} value={difficulty.value}>
                {difficulty.difficulty}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleClick}>
            Start Quiz
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
