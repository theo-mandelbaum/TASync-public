import { useState } from "react";
import FormErrors from "../components/FormErrors";
import { Navigate } from "react-router-dom";
import { verifyEmail } from "../lib/allauth";
import Button from "../components/Button";
import { Container, Fieldset, Field, Input, Heading } from "@chakra-ui/react";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState({ fetching: false, content: null });

  function submit() {
    setResponse({ ...response, fetching: true });
    verifyEmail(code)
      .then((content) => {
        setResponse((r) => {
          return { ...r, content };
        });
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }

  if ([200, 401].includes(response.content?.status)) {
    return <Navigate to="/account/email" />;
  }
  return (
    <Container h="100%">
      <Heading>Confirm Email Address</Heading>
      <FormErrors errors={response.content?.errors} />
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Code</Field.Label>
            <Field.Content>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="code"
                required
              />
              <FormErrors param="key" errors={response.content?.errors} />
            </Field.Content>
          </Field.Root>
          <Button disabled={response.fetching} onClick={() => submit()}>
            Confirm
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </Container>
  );

  // return (
  //   <div>
  //     <h1>Confirm Email Address</h1>
  //     <FormErrors errors={response.content?.errors} />

  //     <div><label>Code <input value={code} onChange={(e) => setCode(e.target.value)} type='code' required /></label>
  //       <FormErrors param='key' errors={response.content?.errors} />
  //     </div>
  //     <Button disabled={response.fetching} onClick={() => submit()}>Confirm</Button>
  //   </div>
  // )
}
