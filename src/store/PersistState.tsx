import { atom, AtomEffect, useRecoilState } from 'recoil';

interface UserInfo {
  name: string;
  email: string;
}

// sessionStorage 동기화를 위한 Atom Effect 정의
const sessionStorageEffect =
  <T,>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    // 컴포넌트가 마운트될 때 sessionStorage에서 값 불러오기
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      // 저장된 값이 있으면 파싱하여 atom의 초기값으로 설정
      setSelf(JSON.parse(savedValue));
    }

    // atom의 값이 변경될 때마다 sessionStorage에 저장
    onSet((newValue, _, isReset) => {
      if (isReset) {
        // atom이 reset되면 sessionStorage에서도 해당 키 삭제
        sessionStorage.removeItem(key);
      } else {
        // 새로운 값을 JSON 문자열로 변환하여 sessionStorage에 저장
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

// 사용자 정보를 하나의 객체로 관리하는 atom
export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: {
    name: '',
    email: '',
  },
  effects: [sessionStorageEffect('user-info')],
});
