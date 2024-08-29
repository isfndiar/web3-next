"use server";
import { cookies } from "next/headers";
export async function create(username: string) {
  if (cookies().get("username")?.value) {
    return "user sudah login";
  }
  const oneDay = 24 * 60 * 60 * 1000;
  const cookieStore = cookies();
  const token = cookieStore.set("username", username, {
    expires: Date.now() - oneDay,
  });
  return token;
}
