import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

// api
import { fetchRestaurants } from "../apis/restaurants";

// components
import { HeaderWrapper, MainLogoImage } from "../components/StyledHeader";

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from "../reducers/restaurants";

// constants
import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantsImage from "../images/restaurant-image.jpg";

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 280px;
  padding: 25px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });

    fetchRestaurants().then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant="rect" width={280} height={200} />
            <Skeleton variant="rect" width={280} height={200} />
            <Skeleton variant="rect" width={280} height={200} />
          </>
        ) : (
          state.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantsImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料:${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </>
  );
};
