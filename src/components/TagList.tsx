import { useState } from "react";
import TagButton from "./TagButton";

interface TagListProps {
    tags: string[];
    onTagClick: (tag: string) => void;
}

const TagList = ({ tags, onTagClick }: TagListProps) => {
    const [selectedTag, setSelectedTag] = useState<string>(tags[0]);

    return (
        <>
        <div>
            {selectedTag}
        </div>
        <div className="flex flex-wrap gap-x-4 bg-social"
            onClick={(event) => {
                const eventTarget = event.target as HTMLDivElement;
                const tag = eventTarget.textContent as string;
                onTagClick(tag); // API 호출을 보내기 위한 tag처리
            }}
        >
            {tags.map((tag) => (
                <div>
                <TagButton
                    isChecked={tag === selectedTag} 
                    key={tag}
                    onClick={() => setSelectedTag(tag)}>
                    {tag}
                </TagButton>
                </div>
            ))}

        </div>
        </>
        
    );
};

export default TagList;

