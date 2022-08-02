import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useInput } from "../contexts/InputContext";
import { Questions } from "./api/questions";

interface Choice {
  selectOptions?: string[];
}

const Quiz: NextPage = () => {
  const [questionSet, setQuestionSet] = useState<Questions>();
  const [choices, setChoices] = useState<Choice[]>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);

  const { input, setInput } = useInput();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: questions } = useSWR<Questions>(
    () =>
      input
        ? `https://opentdb.com/api.php?amount=10&category=${input.category}&difficulty=${input.difficulty}&type=multiple`
        : null,
    fetcher
  );
  // if (choices && choices[currentQuestion - 1].selectOptions)
  //   console.log(choices[currentQuestion - 1].selectOptions);

  console.log(choices);

  useEffect(() => {
    if (questions) {
      let tempArr: Choice[] = [];
      setQuestionSet(questions);
      if (questionSet?.results) {
        questionSet?.results.map((q) => {
          if (q.incorrect_answers && q.correct_answer) {
            tempArr.push({
              selectOptions: [...q.incorrect_answers, q.correct_answer],
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
        <Box sx={{ border: "2px solid grey", height: 500 }}>
          <Typography variant="h5" padding={3} textAlign="center">
            {questionSet &&
              questionSet.results &&
              questionSet?.results[currentQuestion - 1].question}
          </Typography>
          <Grid container>
            {choices &&
              choices[currentQuestion - 1].selectOptions?.map(
                (option, index) => (
                  <Grid item key={index}>
                    <Button>{option}</Button>
                  </Grid>
                )
              )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Quiz;
