import { useState, useCallback } from "react";
import { getSessionToken, settings, Client } from "./lib/allauth";

function APICard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <a href={props.docs}>API documentation</a>
        <div className="mb-3">
          <label>Status</label>
          <input
            className="form-control"
            value={props.response.status}
            readOnly
          />
        </div>
        <pre className="overflow-x-scroll">
          {JSON.stringify(props.response.data, undefined, 4)}
        </pre>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [drfResponse, setDRFResponse] = useState({ status: "", data: "" });
  const [ninjaResponse, setNinjaResponse] = useState({ status: "", data: "" });
  const [sched_apiResponse, setSched_apiResponse] = useState({
    status: "",
    data: "",
  });

  const fetchResult = useCallback(async (url, x, y, setResponse) => {
    const params = { x, y };
    const query = new URLSearchParams(params);
    const sessionToken = getSessionToken();
    const options = { headers: {} };
    if (settings.client === Client.APP && sessionToken) {
      options.headers["X-Session-Token"] = sessionToken;
    }
    if (settings.withCredentials) {
      options.credentials = "include";
    }
    const response = await window.fetch(`${url}?${query.toString()}`, options);

    const data = await response.json();
    setResponse({ status: response.status, data });
  }, []);

  const onCalculate = useCallback(
    (e) => {
      e.preventDefault();
      let baseUrl = "";
      try {
        baseUrl = new URL(settings.baseUrl).origin;
      } catch {}
      fetchResult(baseUrl + "/drf/api/add/", x, y, setDRFResponse);
      fetchResult(baseUrl + "/ninja/api/add", x, y, setNinjaResponse);
      fetchResult(baseUrl + "/sched_api/schools", x, y, setSched_apiResponse);
      return false;
    },
    [x, y, setNinjaResponse, setDRFResponse, setSched_apiResponse]
  );

  return (
    <div>
      <h2>Calculator</h2>
      <form>
        <fieldset>
          <div className="mb-3">
            <label>𝓍</label>
            <input
              className="form-control"
              value={x}
              onChange={(e) => setX(e.target.value)}
              type="number"
            />
          </div>
          <div className="mb-3">
            <label>𝓎</label>
            <input
              className="form-control"
              value={y}
              onChange={(e) => setY(e.target.value)}
              type="number"
            />
          </div>
          <button onClick={onCalculate} className="btn btn-primary">
            Add these inputs
          </button>
        </fieldset>

        <div className="row">
          <div className="col">
            <APICard
              title="Ninja"
              docs="/ninja/api/docs"
              response={ninjaResponse}
            />
          </div>
          <div className="col">
            <APICard
              title="Django REST Framework"
              docs="/drf/api/schema/redoc/"
              response={drfResponse}
            />
          </div>
          <div className="col">
            <APICard
              title="sched api thing"
              docs="/sched_api/docs/"
              response={sched_apiResponse}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
