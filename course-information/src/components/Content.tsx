import { ContentProps } from "../types";
import { assertNever } from "../utils";

const Content = ({ courseParts }: ContentProps) => (
  <>
    {/* {courseParts.map(({ name, exerciseCount }) => (
      <p key={name}>
        {name} {exerciseCount}
      </p>
    ))} */}
    {courseParts.forEach((part) => {
      switch (part.name) {
        case "Fundamentals":
          return (
            <p key={part.name}>
              {part.name} {part.exerciseCount} {part.description}
            </p>
          );
        case "Using props to pass data":
          return (
            <p key={part.name}>
              {part.name} {part.exerciseCount} {part.groupProjectCount}
            </p>
          );
        case "Deeper type usage":
          return (
            <p key={part.name}>
              {part.name} {part.exerciseCount} {part.description}{" "}
              {part.exerciseSubmissionLink}
            </p>
          );
        default:
          return assertNever(part);
      }
    })}
  </>
);

export default Content;
