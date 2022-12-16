import { TotalProps } from "../types";

const Total = ({ courseParts }: TotalProps) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
