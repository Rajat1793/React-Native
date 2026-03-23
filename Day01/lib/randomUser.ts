export type RandomUser = {
  login: { uuid: string };
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  location: {
    city: string;
    state: string;
    country: string;
  };
  dob: { age: number };
};

const API =
  "https://randomuser.me/api/?results=15&inc=name,email,phone,picture,location,dob,login";

export async function fetchRandomUser(): Promise<RandomUser[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`Http ${res.status}`);
  const data = await res.json();

  return data.results;
}