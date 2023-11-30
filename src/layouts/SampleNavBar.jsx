//Remove this file

import { SampleButton } from "../components/SampleButton";

//keep layout components like navbar, sidebar etc in this folder

// you may use components inside layout components

export const SampleNavBar = () => {
  return (
    <div>
      Sample nav bar
      <SampleButton />
    </div>
  );
};
