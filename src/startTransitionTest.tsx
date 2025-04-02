import { useTransition, useState } from 'react';

const StartTransitionTest = () => {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // 가상의 데이터베이스 (100만개 해야 노트북에서 테스트가 됨)
  const DATABASE = Array.from({ length: 1000000 }, (_, i) => `항목 ${i + 1}`);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // 입력값은 즉시 업데이트
    setSearchQuery(query);

    // const results = DATABASE.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
    // setSearchResults(results);

    // 무거운 검색 작업은 startTransition으로 감싸기
    startTransition(() => {
      const results = DATABASE.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요..."
          className="w-full p-2 border rounded"
        />
      </div>

      {isPending ? (
        <div className="text-gray-500">검색 중...</div>
      ) : (
        <div className="space-y-2">
          <div className="font-bold">검색 결과: {searchResults.length}개</div>
          <div className="max-h-[400px] overflow-auto">
            {searchResults.slice(0, 100).map((result, index) => (
              <div key={index} className="p-2 border-b">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTransitionTest;

// obsidian://adv-uri?vault=38486a6d522dec99&uid=847b90b4-7071-405c-86e3-7578263cf4ac&filepath=Main%2FReact%2FstartTransition%20Test.md
// [naver](https://naver.com)
