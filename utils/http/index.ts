import QueryString from 'query-string';

export function generateQueryString(params) {
  return QueryString.stringify(params);
}

export function generateEndpoint(endpoint, params) {
  if (Object.keys(params).length === 0) {
    return endpoint;
  }
  return `${endpoint}?${generateQueryString(params)}`;
}

export const del = async (endpoint) => {
  const response = await fetch(endpoint, { method: 'DELETE' });

  if (response.status === 200) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};

export const get = async (endpoint, params = {}) => {
  const endpointWithParams = generateEndpoint(endpoint, params);
  const response = await fetch(endpointWithParams);

  if (response.status === 200) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};

export const post = async (endpoint, body, headers?) => {
  const response = await fetch(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    },
  );

  if (response.status >= 200 && response.status < 400) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};

export const patch = async (endpoint, body) => {
  const response = await fetch(
    endpoint,
    { method: 'PATCH', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } },
  );

  if (response.status >= 200 && response.status < 400) {
    const responseJson = response.json();
    return responseJson;
  }
  throw new Error(`${response.status}`);
};
