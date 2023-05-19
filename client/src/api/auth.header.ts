export default function authHeader() {
  const tokenStr = localStorage.getItem("user");

  if (tokenStr) {
    return { Authorization: tokenStr };
  } else {
    return { Authorization: "" };
  }
}
