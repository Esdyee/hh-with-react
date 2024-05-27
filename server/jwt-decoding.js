// Base64 URL-safe 형식을 일반 Base64 형식으로 변환하는 함수
function base64UrlToBase64(base64Url) {
    return base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .concat('='.repeat((4 - base64Url.length % 4) % 4)); // 패딩 추가
}

// Base64 URL-safe 형식을 디코딩하는 함수
// function decodeBase64Url(base64Url) {
//     const base64 = base64UrlToBase64(base64Url);
//     return atob(base64);
// }

// Base64 URL-safe 형식을 16진수 문자열로 디코딩하는 함수
function decodeBase64UrlToHex(base64Url) {
    const base64 = base64UrlToBase64(base64Url);
    const binaryData = atob(base64);
    return Array.from(binaryData).map((char) => 
        char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join('');
}

// JWT 서명 부분 디코딩 예제
const signature = "Xp68vXNqXl_O2c3USCWH2lWsijSD_sheohg44RRVy3k";
const decodedSignatureHex = decodeBase64UrlToHex(signature);
console.log(decodedSignatureHex);
