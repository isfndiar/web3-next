"use server";

import { cookies } from "next/headers";

export async function deleteCookies() {
  cookies().set("username", "", {
    maxAge: -1,
    expires: new Date(0),
    httpOnly: true,
  });
}
