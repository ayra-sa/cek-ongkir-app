import Layout from "@/components/Layout";
import WithAuth from "@/components/WithAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("auth_token_test");
    router.push("/login");
  };
  return (
    <Layout title="Home">
      <div className="text-center text-2xl font-bold mt-10">
        <h1>Welcome to the Cek Ongkir App</h1>
      </div>

      <div className="flex items-center justify-center mt-10">
        <button
          className="bg-transparent border border-blue-500 rounded-md px-5 py-2 font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default WithAuth(Home);
