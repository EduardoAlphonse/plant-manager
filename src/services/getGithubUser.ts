interface UserData {
  name: string;
  avatar: string;
}

export async function getGithubUser(username: string): Promise<UserData> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  const userData = {
    name: data.name.split(' ')[0],
    avatar: data.avatar_url,
  }

  return userData;
}