// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Questions {
  response_code?: number;
  results?: Result[];
}

export interface Result {
  category?: string;
  type?: string;
  difficulty?: string;
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Questions>
) {
  const url = `https://opentdb.com/api.php?amount=10&category=${req.query.category}&difficulty=${req.query.difficulty}&type=multiple`;
  // const url = `https://opentdb.com/api.php?amount=10&category=${req.query.category}&difficulty=${req.query.difficulty}&type=multiple`;
  console.log(req.query);
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
  // res.status(200).json({ name: 'John Doe' })
}
