/* eslint-disable */
import React from "react";
type HelloWorldProps = {
 title: string;
};
export default function HelloWorld({ title }: HelloWorldProps) {
  return (
    <div>
      {title}
    </div>
  );
}