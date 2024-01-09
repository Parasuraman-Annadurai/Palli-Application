import React from 'react'

import { trackPwdRequirement } from '../../utils/validate';

const GetPasswordPopover = ({password}) => {
  const requirementsList = trackPwdRequirement(password);
  console.log(requirementsList);
  return (
    <div>
      <ul>
        {requirementsList.map((item) => (
          <li key={item.key} style={{ color: item.error ? 'red' : 'green' }}>
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPasswordPopover;