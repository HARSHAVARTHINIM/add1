// File: src/views/creator/CreatorAllPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectAllCreators, selectAllCreatorsStatus, selectCreatorsNextPage, selectCreatorsPrevPage } from '../../redux/store/creatorSlice';
import { useEffect, useState } from 'react';
import { fetchAsyncCreators } from '../../redux/utils/creatorUtils';
import { Footer, Title } from '../../components/common';
import GameCard from './GameCard';

const backgroundImages = [
    'https://media.istockphoto.com/id/531466314/vector/snakes-and-ladders.jpg?s=612x612&w=0&k=20&c=YYRwkxtVxAXrYV7kFCHKW4h0SHFS4sSSoaj-s9OeHF4=',
    {url: 'https://i.pinimg.com/736x/b6/a0/dd/b6a0dd546b37e3a028c0347680fc1672.jpg', route: '/game2.html'},
    {url: 'https://t4.ftcdn.net/jpg/02/54/27/93/360_F_254279365_jvkxXVv7NsL2D5rpRPaHQVi7eEbt4lWe.jpg', route: '/game3.html'},
    {url: 'https://images.squarespace-cdn.com/content/v1/60491aa0038a851c94c451dd/1615426798488-59TDHRY2HEDCVZQEMKXG/Multiplication+Squares+Game+Banner.JPG', route: '/game.html'},
];

const CreatorAllPage = () => {
    const dispatch = useDispatch();
    const creators = useSelector(selectAllCreators);
    const creatorsStatus = useSelector(selectAllCreatorsStatus);
    const nextPage = useSelector(selectCreatorsNextPage);
    const prevPage = useSelector(selectCreatorsPrevPage);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAsyncCreators(page));
    }, [dispatch, page]);

    const pageHandler = (pageValue) => setPage(pageValue);

    return (
        <CreatorAllPageWrapper>
            <div className='sc-creators section'>
                <div className='container'>
                    <Title titleName={{
                        firstText: "OUR",
                        secondText: "GAMES"
                    }} />
                    <GameCardsWrapper>
                        {backgroundImages.map((image, index) => {
                            const backgroundImage = typeof image === 'string' ? image : image.url;
                            const route = typeof image === 'string' ? `/card${index + 1}` : image.route;
                            return (
                                <GameCard
                                    key={index}
                                    title={`Game ${index + 1}`}
                                    description={`Description for game ${index + 1}`}
                                    backgroundImage={backgroundImage}
                                    route={route}
                                />
                            );
                        })}
                    </GameCardsWrapper>
                </div>
            </div>
            <Footer/>
        </CreatorAllPageWrapper>
    )
}

export default CreatorAllPage;

const CreatorAllPageWrapper = styled.div`
    background-color: var(--clr-violet-dark-active);
    .sc-creators {
        min-height: 100vh;
        padding-top: 65px;
    }
`;

const GameCardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
`;
