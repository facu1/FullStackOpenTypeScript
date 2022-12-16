import { ContentProps } from "../types";

const Content = ({ courseParts }: ContentProps) => (
  <>
    {courseParts.map(({ name, exerciseCount }) => (
      <p key={name}>
        {name} {exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
