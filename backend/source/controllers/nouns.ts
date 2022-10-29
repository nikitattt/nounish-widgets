import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Nouns {
  id: Number;
  currentBid: Number;
}

const getNounsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the post id from the req
  // let id: string = req.params.id;
  // get the post
  // let result: AxiosResponse = await axios.get(
  //   `https://jsonplaceholder.typicode.com/posts/${id}`
  // );
  let nounsData: Nouns = {
    id: 123,
    currentBid: 56.66,
  };
  return res.status(200).json(nounsData);
};

export default { getNounsData };
