export async function checker(uid: number) {
  const checker = await fetch(`https://enka.network/api/uid/${uid}`);
  const result = await checker.json();
  return result.message;
}
