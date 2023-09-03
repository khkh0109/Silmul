import * as S from './Dropdown.style';

type DropdownProps = {
  visible: boolean;
  skillList: string[] | null;
  handleItemClick: (skill: string) => void;
};

function Dropdown({ visible, skillList, handleItemClick }: DropdownProps) {
  return (
    <S.DropdownWrapper className={visible ? 'visible' : ''}>
      <S.DropdownMenu>
        {skillList?.map((skill, index) => {
          return (
            <S.Item key={index} onClick={() => handleItemClick(skill)}>
              {skill}
            </S.Item>
          );
        })}
        {visible === true && skillList?.length === 0 && (
          <S.NotFoundMessage>검색한 기술 스택이 없어요.</S.NotFoundMessage>
        )}
      </S.DropdownMenu>
    </S.DropdownWrapper>
  );
}

export default Dropdown;
