import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Template(props: Props) {
  return <>{props.children}</>;
}
