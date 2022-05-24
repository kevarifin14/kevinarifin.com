import QueryString from "query-string";

export function generateQueryString(params: Record<string, any>) {
  return QueryString.stringify(params);
}

export function generateEndpoint(
  endpoint: string,
  params: Record<string, any>
) {
  if (Object.keys(params).length === 0) {
    return endpoint;
  }
  return `${endpoint}?${generateQueryString(params)}`;
}

export const get = async (endpoint: string, params: Record<string, any>) => {
  const endpointWithParams = generateEndpoint(endpoint, params);
  const response = await fetch(endpointWithParams);

  if (response.status === 200) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};

export const post = async (
  endpoint: string,
  body: Record<string, any>,
  headers?: Record<string, any>
) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (response.status >= 200 && response.status < 400) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};
