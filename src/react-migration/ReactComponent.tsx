/* eslint-disable */

import React from 'react';

type HelloWorldProps = {
 title: string;
 respondFunction: () => void;
};

export function HelloWorld ({ title, respondFunction }: HelloWorldProps) {
  return (
    <div>
      <button onClick={() => respondFunction()}>{title}</button>
    </div>
  );
}
