export async function sleep(time = 1000) {
  return await new Promise((resolve) => setTimeout(() => resolve(true), time));
}
