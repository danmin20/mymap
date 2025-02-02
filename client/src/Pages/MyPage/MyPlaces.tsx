import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { match } from "ts-pattern";
import { Back, Map } from "../../assets";
import Header from "../../Components/Header";
import MapViewwithSlider from "../../Components/MapViewWithSlider";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import { reducer } from "../../Shared/reducer";
import { PlaceType } from "../../Shared/type";
import { gap, theme, WrapperWithHeader } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";

interface MyPlacesProps {
  places: PlaceType[];
  close: () => void;
}

const MyPlaces = ({ places, close }: MyPlacesProps) => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
    sliderCurrent: 0,
    isSelected: false,
  });

  // 카드 클릭하면 해당 인덱스 지도뷰
  const handleClickPlaceCard = (idx: number) => {
    dispatch({
      _t: "select",
      sliderCurrent: idx,
      isSelected: true,
    });
  };

  useEffect(() => {
    Mixpanel.track("내가 저장한 장소 진입");
  }, []);

  return (
    <Wrapper>
      <Header title="내가 저장한 장소">
        <Back
          className="left-icon"
          onClick={() => {
            if (state._t === "list") close();
            else
              dispatch({
                _t: "toggle",
              });
          }}
        />
        {state._t === "list" ? (
          <div
            className="view-toggle"
            onClick={() =>
              dispatch({
                _t: "toggle",
              })
            }
          >
            <Map />
            지도
          </div>
        ) : (
          <div />
        )}
      </Header>

      {match(state._t)
        .with("list", () => (
          <div className="cards">
            {places.map((place, i) => (
              <div key={place.placeId} onClick={() => handleClickPlaceCard(i)}>
                <PlaceCard {...{ place }} type="list" />
              </div>
            ))}
          </div>
        ))
        .with("map", () => (
          <MapViewwithSlider
            {...{ places }}
            defaultCurrent={state.sliderCurrent}
          />
        ))
        .exhaustive()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 500;
  .view-toggle {
    right: 2rem;
  }
  .post-title {
    padding: 0 2rem;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    padding-bottom: 3rem;
    .content {
      margin-top: 1.4rem;
      font-size: 1.4rem;
      line-height: 150%;
      color: ${theme.color.gray7};
      padding-right: 3rem;
    }
    &:after {
      content: "";
      width: 100%;
      height: 1.6rem;
      background-color: ${theme.color.gray1_5};
    }
  }

  .cards {
    padding: 0 2rem;
    margin-top: 3rem;
    padding-bottom: 2.8rem;
    ${gap("1.4rem", "column")}
  }
`;

export default MyPlaces;
