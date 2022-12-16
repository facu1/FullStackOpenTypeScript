import { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: ContentProps) => (
  <>
    {courseParts.map((part) => (
      <Part key={part.name} {...part} />
    ))}
  </>
);

export default Content;
