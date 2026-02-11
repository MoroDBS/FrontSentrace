export default async (input, init) => {
  if (typeof input !== 'string') {
    throw new TypeError(`fetchOrThrow expects a string URL, but received: ${typeof input} - ${String(input)}`);
  }
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
};
