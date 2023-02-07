import { useState } from "react";
import { useRouter } from "next/router";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Layout, Card, Input, Select, Button } from "antd";
import { postUser, getUserById } from "../../api/auth/auth";
import { checkCouponByCode } from "../../api/coupon/coupon";

function Signup() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [couponCheck, setCouponCheck] = useState(false);
  const [referrerCheck, setReferrerCheck] = useState(false);

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

  const checkCoupone = async () => {
    const coupon = await checkCouponByCode(couponCode);
    if (coupon) {
      alert("사용 가능한 쿠폰입니다.");
      setCouponCheck(true);
      return;
    } else {
      alert("쿠폰이 유효하지 않습니다.");
      setCouponCheck(false);
      setCouponCode("");
    }
  };
  const checkReferrer = async () => {
    const referrer = await getUserById(referrerId);
    if (referrer) {
      alert("존재하는 사용자 입니다.");
      setReferrerCheck(true);
      return;
    } else {
      alert("존재하지 않는 사용자입니다.");
      setReferrerCheck(false);
      setReferrerId("");
    }
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
    if (couponCode !== "" && !couponCheck) {
      alert("쿠폰을 확인해주세요");
      return;
    }
    if (referrerId !== "" && !referrerCheck) {
      alert("추천인을 확인해주세요");
      return;
    }
    const user = await postUser({
      id: id,
      password: password,
      name: name,
      gender: gender,
      email: `${email}@${domain}`,
      referrer_id: referrerId,
      coupon_code: couponCode,
    });
    if (user === null) {
      alert("이미 존재하는 아이디입니다.");
      setId("");
      return;
    }
    alert("회원가입에 성공했습니다.");
    router.push("/auth/login");
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
      <Card title="회원가입" style={{ width: 300 }}>
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>ID / PW</div>
        <Input
          placeholder="Input ID"
          value={id}
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
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>Infomation</div>
        <Input
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
        <Input.Group compact style={{ marginBottom: 20 }}>
          <Input
            className="site-input-left"
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
            onChange={(e) => setDomain(e.target.value)}
            style={{
              width: 120,
            }}
            placeholder="domain.com"
          />
        </Input.Group>
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>
          Coupon & Referrer (Optional)
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder="쿠폰 코드 (선택)"
            value={couponCode}
            disabled={couponCheck}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{ width: "70%", marginBottom: 10, marginRight: 5 }}
          />
          {couponCheck ? null : (
            <Button onClick={() => checkCoupone()}>확인</Button>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Input
            placeholder="추천인 (선택)"
            value={referrerId}
            disabled={referrerCheck}
            onChange={(e) => setReferrerId(e.target.value)}
            style={{ width: "70%", marginBottom: 10, marginRight: 5 }}
          />
          {referrerCheck ? null : (
            <Button onClick={() => checkReferrer()}>확인</Button>
          )}
        </div>
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
            가입하기{" "}
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
export default Signup;
