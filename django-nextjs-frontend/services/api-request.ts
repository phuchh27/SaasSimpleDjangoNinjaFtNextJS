export async function sendRequest(
  body: any,
  url: string,
  method: string = "GET"
): Promise<Response> {
  if (typeof method !== "string") {
    throw new Error("Method must be a string");
  }

  const METHOD = method.toUpperCase();
  console.log(body, url, method);
  console.log(METHOD);

  const requestOptions: RequestInit = {
    method: METHOD,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  };

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
