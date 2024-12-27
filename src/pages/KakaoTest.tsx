import { useEffect, useCallback } from "react";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const KakaoTest = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    // 카카오톡 로그인 함수
    function loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/kakao-test",
            // state: "sendfriend_feed",
            scope: "friends,talk_message", // 앱 동의 항목 설정 및 사용자 동의 필요
        });
    }

    // 카카오 로그인 여부 확인
    function checkLogin() {
        console.log(window.Kakao.Auth);
        if (!window.Kakao.Auth.getAccessToken()) {
            console.log("Not logged in.");
            return;
        }
    }

    function selectFriends() {
        window.Kakao.Picker.selectFriends({
            returnUrl: "http://localhost:5173/kakao-test", // 필수
            title: "친구 선택",
            maxPickableCount: 5,
            minPickableCount: 1,
        });
    }

    async function sendToken() {
        const tokenResponse = await axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${authorizationCode}`,
            {
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            },
        );
        const accessToken = tokenResponse.data.access_token;
        console.log(accessToken);
    }

    function createKaKaoButton() {
        window.Kakao.Share.createDefaultButton({
            container: "#kakaotalk-sharing-btn",
            objectType: "feed",
            content: {
                title: "strawbarry cake",
                description: "description test",
                imageUrl:
                    "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
                link: {
                    // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                    mobileWebUrl: "https://developers.kakao.com",
                    webUrl: "https://developers.kakao.com",
                },
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845,
            },
            buttons: [
                {
                    title: "view web",
                    link: {
                        mobileWebUrl: "https://www.naver.com",
                        webUrl: "https://www.naver.com",
                    },
                },
                {
                    title: "view app",
                    link: {
                        mobileWebUrl: "https://developers.kakao.com",
                        webUrl: "https://developers.kakao.com",
                    },
                },
            ],
        });
    }

    function getCookie(name: string) {
        console.log("document.cookie", document.cookie);
        const parts = document.cookie.split(name + "=");
        if (parts.length === 2) {
            return parts[1].split(";")[0];
        }
        console.log("parts", parts);
    }

    useEffect(() => {
        createKaKaoButton();
    }, []);

    return (
        <div>
            <a id="kakao-login-btn" onClick={loginWithKakao}>
                <img
                    src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                    width="222"
                    alt="카카오 로그인 버튼"
                />
            </a>
            <div className="flex flex-col gap-2 mt-5">
                <PrimaryButton
                    onClick={checkLogin}
                    theme="dark"
                    isDisabled={false}
                >
                    로그인 여부 확인
                </PrimaryButton>
                <PrimaryButton
                    onClick={selectFriends}
                    theme="dark"
                    isDisabled={false}
                >
                    친구 선택
                </PrimaryButton>
                <h4>token-result</h4>
                <p id="token-result"></p>
            </div>

            <a id="kakaotalk-sharing-btn">
                <img
                    src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                    alt="kakaotal share button"
                />
            </a>
        </div>
    );
};

export default KakaoTest;
