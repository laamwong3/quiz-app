import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useInput } from "../contexts/InputContext";
import { useNotification } from "../contexts/NotificationContext";
import { Questions } from "./api/questions";

interface Choice {
  selectOptions?: string[];
  correctAnswer?: string;
}

const Quiz: NextPage = () => {
  const router = useRouter();

  const [questionSet, setQuestionSet] = useState<Questions>();
  const [choices, setChoices] = useState<Choice[]>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { setNotification } = useNotification();

  const { input, setInput } = useInput();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: questions } = useSWRImmutable<Questions>(
    () =>
      input
        ? `https://opentdb.com/api.php?amount=10&category=${input.category}&difficulty=${input.difficulty}&type=multiple`
        : null,
    fetcher
  );

  const handleNextQuestion = () => {
    if (!selected) {
      setNotification({
        open: true,
        type: "error",
        message: "Please select a answer",
      });
      return;
    }
    // if (
    //   choices &&
    //   selectedAnswer === choices[currentQuestion - 1].correctAnswer
    // ) {
    //   setCurrentScore((prevState) => prevState + 1);
    // }
    if (currentQuestion === 10) {
      router.replace(`/result?score=${currentScore}`);
    } else {
      setCurrentQuestion((prevState) => prevState + 1);
      setSelected(false);
      setSelectedAnswer("");
    }
  };

  console.log(questions);
  console.log(choices);

  const shuffle = (arrToShuffle: string[]) => {
    for (let i = 0; i < arrToShuffle.length; i++) {
      let j = Math.floor(Math.random() * i);
      let k = arrToShuffle[i];
      arrToShuffle[i] = arrToShuffle[j];
      arrToShuffle[j] = k;
    }
    return arrToShuffle;
  };

  useEffect(() => {
    if (questions) {
      let tempArr: Choice[] = [];
      setQuestionSet(questions);
      if (questions?.results) {
        questions?.results.map((q) => {
          if (q.incorrect_answers && q.correct_answer) {
            tempArr.push({
              selectOptions: shuffle([
                ...q.incorrect_answers,
                q.correct_answer,
              ]),
              correctAnswer: q.correct_answer,
            });
          }
        });
      }
      setChoices(tempArr);
    }
  }, [questions]);

  return (
    <>
      <Stack direction={"column"} gap={{ xs: 3, md: 1 }}>
        <Typography variant="h4" textAlign={"center"}>
          Welcome, {input.player}
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">
            {questionSet &&
              questionSet.results &&
              questionSet?.results[0].category}
          </Typography>
          <Typography variant="h6">
            Score:{" "}
            <Box component="span" color={"green"}>
              {currentScore}
            </Box>
          </Typography>
        </Stack>
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Question {currentQuestion}
        </Typography>
        <Stack
          direction={"column"}
          sx={{ border: "2px solid grey", height: 500 }}
        >
          <Typography variant="h5" padding={3} textAlign="center">
            {questionSet &&
              questionSet.results &&
              questionSet?.results[currentQuestion - 1].question}
          </Typography>
          <Stack
            flex={1}
            direction={"column"}
            justifyContent="space-evenly"
            alignItems={"center"}
          >
            {choices &&
              choices[currentQuestion - 1] &&
              choices[currentQuestion - 1].selectOptions?.map(
                (option, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    // disabled={selected}
                    color={
                      selected
                        ? option === choices[currentQuestion - 1].correctAnswer
                          ? "success"
                          : option === selectedAnswer
                          ? "error"
                          : "primary"
                        : "primary"
                    }
                    onClick={
                      !selected
                        ? () => {
                            setSelected(true);
                            setSelectedAnswer(option);
                            if (
                              option ===
                              choices[currentQuestion - 1].correctAnswer
                            ) {
                              setCurrentScore((prevState) => prevState + 1);
                            }
                          }
                        : () => {}
                    }
                    sx={{ width: "90%" }}
                  >
                    {option}
                  </Button>
                )
              )}
          </Stack>

          <Stack direction={"row"} justifyContent="space-around" padding={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.replace("/")}
            >
              QUIT
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNextQuestion}
            >
              NEXT QUESTION
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Quiz;
