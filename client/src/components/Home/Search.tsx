import { useState } from 'react';
import * as S from './Search.style';
import Dropdown from './Dropdown';
import { skillData } from './skillsData';

type SearchProps = {
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (option: string) => void;
};

function Search({ setSearchTerm, category, setCategory }: SearchProps) {
  const [visible, setVisible] = useState(false);
  const [skillList, setSkillList] = useState<typeof skillData | null>(null);

  const filterSkills = (inputValue: string): typeof skillData => {
    const value = inputValue.toLowerCase().trim().replace(/\s/g, '');

    return skillData.filter((item) => {
      const skill = item.toLowerCase().trim().replace(/\s/g, '');
      return skill.includes(value);
    });
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleItemClick = (skill: string) => {
    setSearchTerm(skill);
    setVisible(false);
  };

  const handleClickList = (e: React.MouseEvent<HTMLLIElement>) => {
    setCategory(e.currentTarget.id);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const hasSkill = hasSkillValue(e.target.value, category);
    setVisible(hasSkill);
    if (e.target.value.trim() !== '') {
      const filteredSkills = filterSkills(e.target.value);
      setSkillList(filteredSkills);
    }
  };

  const hasSkillValue = (value: string, category: string) => {
    if (category !== 'skill') {
      return false;
    }

    if (value.trim() === '') {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <S.SearchWrapper>
        <S.InputWrapper>
          <S.SearchIcon />
          <S.Input type='text' placeholder='검색하기' onChange={handleInput} />
        </S.InputWrapper>
        <S.Nav>
          <S.NavList>
            <li
              id='userName'
              className={category === 'userName' ? 'select' : ''}
              onClick={handleClickList}
            >
              작성자
            </li>
            <li
              id='title'
              className={category === 'title' ? 'select' : ''}
              onClick={handleClickList}
            >
              프로젝트
            </li>
            <li
              id='skill'
              className={category === 'skill' ? 'select' : ''}
              onClick={handleClickList}
            >
              기술스택
            </li>
          </S.NavList>
          <S.Select name='search' id='search' onChange={handleSelectCategory} value={category}>
            <option value='userName'>작성자</option>
            <option value='title'>프로젝트</option>
            <option value='skill'>기술스택</option>
          </S.Select>
          <S.ArrowDownIcon />
        </S.Nav>
      </S.SearchWrapper>
      <Dropdown visible={visible} skillList={skillList} handleItemClick={handleItemClick} />
    </>
  );
}

export default Search;
