import { useRecoilState } from "recoil";
import { textState } from "../store/textState";

const RecoilTestCopy = () => {
    const [text, setText] = useRecoilState(textState);

    setText('1234');
    console.log(text);
    return <div>
        <input type="text"
            className={`border-2 border-gray-300 rounded-md p-2`}
            value={text}
            onChange={(e) => setText(e.target.value)} />
        <p>Entered Text: {text}</p>
        <p>Entered Text: {JSON.stringify(textState)}</p>

    </div>;
};


export default RecoilTestCopy;
