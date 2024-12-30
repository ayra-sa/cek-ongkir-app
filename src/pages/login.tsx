import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DUMMY_USER = {
  username: "admin",
  password: "password123",
  token: "token1235564994iwerijef8734835jsdjfjsjf8u89945jksmfn",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      localStorage.setItem("auth_token_test", DUMMY_USER.token);

      router.push("/");
    } else {
      setError("Username atau password salah.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token_test")
    if (!!token) return router.push("/")
  }, [router])
  return (
    <div className="flex place-content-center items-center h-screen">
      <div className="border border-stone-300 py-10 px-8 rounded-md min-w-[30%]">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form onSubmit={handleLogin} className="space-y-1 mt-10">
          <Input id="username" label="Username" name="username" value={username} handleChange={(e) => setUsername(e.target.value)} />
          <Input id="password" label="Password" name="password" type="password" value={password} handleChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="!mt-10 bg-blue-500 px-5 py-2 text-white rounded-md font-medium">Login</button>
        </form>
        {error ? <p className="text-sm text-red-500 mt-2">{error}</p> : null}
      </div>
    </div>
  );
};

export default Login;
