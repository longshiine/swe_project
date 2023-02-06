import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Layout, Card, Input, Select, Button } from "antd";
import { postUser, getUser, patchUser } from "../../api/auth/auth";

function EditProfile() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const readMyInfo = async () => {
    const result = await getUser();
    if (result) {
      setId(result.id);
      setPassword(result.password);
      setName(result.name);
      setGender(result.gender);
      setEmail(result.email.split("@")[0]);
      setDomain(result.email.split("@")[1]);
      setPasswordCheck(result.password);
    }
  };

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordError(passwordCheck !== e.target.value); //같으면 false 다르면 true
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordError(password !== e.target.value); //같으면 false 다르면 true
    setPasswordCheck(e.target.value);
  };

  const submitHandler = async () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (password === "" || passwordCheck === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    const user = await patchUser({
      id: id,
      password: password,
      name: name,
      gender: gender,
      email: `${email}@${domain}`,
    });
    if (user === null) {
      alert("회원정보 수정에 실패했습니다.");
      return;
    }
    alert("회원정보 수정에 성공했습니다.");
    router.push("/mypage");
  };

  useEffect(() => {
    readMyInfo();
  }, []);

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
      <Card title="회원가입" style={{ width: 300 }}>
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>ID / PW</div>
        <Input
          placeholder="Input ID"
          value={id}
          disabled={true}
          onChange={(e) => setId(e.target.value)}
          prefix={<UserOutlined />}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="input password"
          value={password}
          onChange={onChangePassword}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          prefix={<LockOutlined />}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="check password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          prefix={<LockOutlined />}
          style={{ marginBottom: 20 }}
        />
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>개인 정보</div>
        <Input
          value={name}
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "80%", marginBottom: 10 }}
        />
        <Select
          defaultValue="male"
          value={gender}
          onChange={(value) => setGender(value)}
          style={{ width: "80%", marginBottom: 10 }}
          options={[
            { value: "male", label: "male" },
            { value: "female", label: "female" },
          ]}
        />
        <Input.Group compact style={{ marginBottom: 10 }}>
          <Input
            className="site-input-left"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: 80,
            }}
            placeholder="email"
          />
          <Input
            className="site-input-split"
            style={{
              width: 35,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: "none",
            }}
            placeholder="@"
            disabled
          />
          <Input
            className="site-input-right"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            style={{
              width: 120,
            }}
            placeholder="domain.com"
          />
        </Input.Group>
        {passwordError && (
          <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
        )}
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
            수정하기{" "}
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
export default EditProfile;
