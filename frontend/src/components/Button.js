import { Button as ChaButton } from "@chakra-ui/react";
export default function Button(props) {
  return (
    <ChaButton className="btn btn-primary" {...props}>
      {props.children}
    </ChaButton>
  );
}
