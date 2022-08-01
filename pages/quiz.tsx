import { NextPage } from "next";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useInput } from "../contexts/InputContext";
import { Questions } from "./api/questions";

const Quiz: NextPage = () => {
  const { input, setInput } = useInput();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: questions, mutate } = useSWR<Questions>(
    () =>
      input
        ? `https://opentdb.com/api.php?amount=10&category=${input.category}&difficulty=${input.difficulty}&type=multiple`
        : null,
    fetcher
  );
  console.log(questions);

  return <div>quiz</div>;
};

export default Quiz;
