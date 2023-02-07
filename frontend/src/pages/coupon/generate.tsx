import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Card, Input, Button } from "antd";
import { setCookie } from "@/lib/cookie";
import { generateCoupon } from "../../api/coupon/coupon";

function Generate() {
  const router = useRouter();
  const [campaign, setCampaign] = useState("");
  const [points, setPoints] = useState("");
  const [num, setNum] = useState("");

  const submitHandler = async () => {
    if (campaign === "") {
      alert("캠페인 이름을 입력해주세요");
      return;
    }
    if (points === "") {
      alert("포인트를 입력해주세요");
      return;
    }
    if (num === "") {
      alert("발행 개수를 입력해주세요");
      return;
    }
    const result = await generateCoupon({
      campaign,
      points,
      num: Number(num),
    });

    if (result) {
      alert("쿠폰 발행에 성공했습니다.");
      router.push("/coupon/list");
    } else {
      alert("쿠폰 발행에 실패했습니다. 다시 시도해주세요.");
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
      <Card title="쿠폰 발행" style={{ width: 300 }}>
        <Input
          placeholder="캠페인 이름을 입력하세요"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="포인트를 입력하세요"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="발행 개수를 입력하세요"
          value={num}
          onChange={(e) => setNum(e.target.value)}
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
            발행{" "}
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
export default Generate;
