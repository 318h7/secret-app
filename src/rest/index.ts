const API_URL = import.meta.env.VITE_API_URL as string ?? "";

export const postData = async <RES extends object, REQ extends object = object>(
    endpoint = "/", data: REQ = {} as REQ
) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json() as RES; // parses JSON response into native JavaScript objects
  }

  export const getData = async (endpoint = "/") => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
