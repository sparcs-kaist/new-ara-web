/* eslint-disable */

import React from 'react';

type HelloWorldProps = {
 title: string;
};

export function HelloWorld ({ title }: HelloWorldProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
