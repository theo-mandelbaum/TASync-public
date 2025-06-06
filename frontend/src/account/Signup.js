import { useState } from "react";
import FormErrors from "../components/FormErrors";
import { signUp } from "../lib/allauth";
import { Link } from "react-router-dom";
import { useConfig } from "../auth";
import ProviderList from "../socialaccount/ProviderList";
// import Button from '../components/Button'
import {
  Container,
  Text,
  Heading,
  Input,
  FieldsetRoot,
  FieldsetContent,
  FieldRoot,
  FieldLabel,
  Button,
} from "@chakra-ui/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Errors, setPassword2Errors] = useState([]);
  const [response, setResponse] = useState({ fetching: false, content: null });
  const config = useConfig();
  const hasProviders = config.data.socialaccount?.providers?.length > 0;

  function submit() {
    if (password2 !== password1) {
      setPassword2Errors([
        { param: "password2", message: "Password does not match." },
      ]);
      return;
    }
    setPassword2Errors([]);
    setResponse({ ...response, fetching: true });
    signUp({ email, password: password1 })
      .then((content) => {
        setResponse((r) => {
          console.log(r);
          return { ...r, content };
        });
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          console.log(r);
          return { ...r, fetching: false };
        });
      });
  }

  return (
    <Container h="100%">
      <Heading>Sign Up</Heading>
      <Text fontSize="lg" mb={4}>
        Already have an account? <Link to="/account/login">Login here.</Link>
      </Text>
      <FormErrors errors={response.content?.errors} />
      <FieldsetRoot>
        <FieldsetContent>
          <FieldRoot>
            <FieldLabel>Email</FieldLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </FieldRoot>
          <FormErrors param="email" errors={response.content?.errors} />
          <FieldRoot>
            <FieldLabel>Password</FieldLabel>
            <Input
              autoComplete="new-password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              type="password"
              required
            />
          </FieldRoot>
          <FormErrors param="password" errors={response.content?.errors} />
          <FieldRoot>
            <FieldLabel>Password (again)</FieldLabel>
            <Input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              required
            />
          </FieldRoot>
          <FormErrors param="password2" errors={password2Errors} />
          <Button disabled={response.fetching} onClick={() => submit()}>
            Sign Up
          </Button>
          <Text>
            <Link to="/account/signup/passkey">Sign up using a passkey</Link>
          </Text>
          {hasProviders ? (
            <>
              <Heading as="h2">Or use a third-party</Heading>
              <ProviderList callbackURL="/account/provider/callback" />
            </>
          ) : null}
        </FieldsetContent>
      </FieldsetRoot>
    </Container>
  );
}
