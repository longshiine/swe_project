import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Button } from "antd";
import {
  getUserInfoFromLocalStorage,
  removeUserInfoFromLocalStorage,
} from "../../lib/localStorage";

function Header() {
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  const userInfo = getUserInfoFromLocalStorage();
  const logoutHandler = () => {
    removeUserInfoFromLocalStorage();
    router.push("/");
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded ? (
        <Layout.Header
          style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
        >
          <Link
            href="/"
            style={{
              float: "left",
              width: 200,
              height: 31,
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <div>SWE-Project</div>
          </Link>
          <div
            style={{
              float: "right",
              width: 140,
              height: 70,
              marginRight: "-40px",
            }}
          >
            {userInfo ? (
              <>
                <Link
                  // size="small"
                  href="/post/write"
                  style={{ fontSize: 10, color: "white", marginRight: "10px" }}
                >
                  글쓰기
                </Link>
                <Link
                  // size="small"
                  href="/mypage"
                  style={{ fontSize: 10, color: "white" }}
                >
                  마이페이지
                </Link>
                <Button
                  size="small"
                  type="text"
                  style={{ fontSize: 10, color: "white" }}
                  onClick={() => logoutHandler()}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  type="text"
                  onClick={() => router.push("/auth/login")}
                  style={{ fontSize: 10, color: "white", marginRight: "10px" }}
                >
                  로그인
                </Button>
                <Link
                  href="/auth/signup"
                  style={{ fontSize: 10, color: "white" }}
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </Layout.Header>
      ) : (
        false
      )}
    </>
  );
}

export default Header;
