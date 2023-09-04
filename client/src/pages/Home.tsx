import { useState, useRef } from 'react';

import { useGetPortfolioList } from '../hooks/useGetPortfolioList';
import { useAuth } from '../hooks/useAuth';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useDebounce } from '../hooks/useDebounce';

import Banner from '../components/Home/Banner';
import Sort from '../components/Home/Sort';
import Search from '../components/Home/Search';
import ArrowUp from '../components/Home/ArrowUp';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

import * as S from './Home.style';

import { GetPortfolio, SortOption, CategoryOption } from '../types/index';

function Home() {
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [category, setCategory] = useState<CategoryOption>('userName');
  const [searchTerm, setSearchTerm] = useState('');
  const inputValue = useDebounce<string>(searchTerm, 500);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    PortfolioData,
    isPortfoliosError,
    isPortfolioFetching,
    ErrorInfo,
    fetchNextPortfolio,
    hasNextPortfolio,
  } = useGetPortfolioList(sortBy, category, inputValue);

  useAuth();

  useInfiniteScroll({
    targetRef,
    isPortfoliosError,
    isPortfolioFetching,
    hasNextPortfolio,
    fetchNextPortfolio,
  });

  return (
    <S.Container>
      <Banner />
      <Sort setSortBy={setSortBy} />
      <S.ContentWrapper>
        <Search setSearchTerm={setSearchTerm} category={category} setCategory={setCategory} />
        {isPortfoliosError || isPortfolioFetching
          ? null
          : inputValue && (
              <S.Alert>
                총 <strong>{PortfolioData?.pages[0].pageInfo.totalElements}개</strong>의
                포트폴리오를 찾았습니다.
              </S.Alert>
            )}
        <S.CardWrapper>
          {PortfolioData
            ? PortfolioData.pages.map((page) =>
                page.data.map((item: GetPortfolio) => (
                  <Card
                    key={item.portfolioId}
                    portfolioId={item.portfolioId}
                    title={item.title}
                    description={item.description}
                    views={item.viewCount}
                    userId={item.userId}
                    name={item.name}
                    skills={item.skills}
                    representativeImgUrl={item.representativeImgUrl}
                    profileImg={item.profileImg}
                    likes={item.likesCount}
                  />
                )),
              )
            : null}
          <S.Target ref={targetRef} />
        </S.CardWrapper>
        {hasNextPortfolio && isPortfolioFetching && <Loading />}
        {!isPortfolioFetching && !isPortfoliosError && !hasNextPortfolio && (
          <S.Alert>여기가 마지막이에요.</S.Alert>
        )}
        {PortfolioData?.pages[0].data.length === 0 && <S.Alert>포트폴리오가 없습니다.</S.Alert>}
        {!hasNextPortfolio && isPortfolioFetching && <Loading />}
        {ErrorInfo?.response?.status === 404 && <S.Alert>검색 결과가 없습니다.</S.Alert>}
        <ArrowUp />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Home;
