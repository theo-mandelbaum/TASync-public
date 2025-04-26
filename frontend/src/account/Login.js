import { useState } from "react";
import FormErrors from "../components/FormErrors";
import { login } from "../lib/allauth";
import { Link } from "react-router-dom";
import { useConfig } from "../auth";
import ProviderList from "../socialaccount/ProviderList";
import WebAuthnLoginButton from "../mfa/WebAuthnLoginButton";
import {
  Container,
  Heading,
  Input,
  FieldsetRoot,
  FieldsetContent,
  FieldRoot,
  FieldLabel,
  Button,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ fetching: false, content: null });
  const config = useConfig();
  const hasProviders = config.data.socialaccount?.providers?.length > 0;

  function submit() {
    setResponse({ ...response, fetching: true });
    login({ email, password })
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
  return (
    <Container h="100%">
      <Heading>Login</Heading>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <Link to="/account/password/reset">Forgot your password?</Link>
          </FieldRoot>
          <FormErrors param="password" errors={response.content?.errors} />
          <Button disabled={response.fetching} onClick={() => submit()}>
            Login
          </Button>
          {config.data.account.login_by_code_enabled ? (
            <Button asChild>
              <Link to="/account/login/code">Send me a sign-in code</Link>
            </Button>
          ) : null}
          <WebAuthnLoginButton>Sign in with a passkey</WebAuthnLoginButton>
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
