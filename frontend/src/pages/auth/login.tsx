import { useState } from "react";
import { useRouter } from "next/router";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Layout, Card, Input, Button } from "antd";
import { postLogin } from "../../api/auth/auth";
import { setCookie } from "@/lib/cookie";

function Login() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    const result = await postLogin({
      id: id,
      password: password,
    });

    if (result) {
      setCookie("token", result.token);
      localStorage.setItem("userInfo", result.user);
      router.push("/");
    } else {
      alert("아이디 혹은 비밀번호가 다릅니다.");
      setPassword("");
      return;
    }
  };

  return (
    <Layout
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="로그인" style={{ width: 300 }}>
        <Input
          placeholder="Input ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: 20 }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => submitHandler()}
          >
            {" "}
            로그인{" "}
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
export default Login;
