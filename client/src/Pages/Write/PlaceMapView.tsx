import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Back, Plus } from "../../assets";
import MapView, { Pin } from "../../Components/MapView";
import PlaceBox from "../../Components/PlaceBox";
import { Places } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { Button, flexCenter, theme } from "../../styles/theme";

const PlaceMapView = ({
  place,
  setIsSearchOpened,
  close,
}: {
  place: PlaceType;
  setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
  close: MouseEventHandler;
}) => {
  const [places, setPlaces] = useRecoilState(Places);

  const handleAddPlace = (place: PlaceType) => {
    setPlaces([...places, place]);
    setIsSearchOpened(false);
  };

  const pin: Pin = {
    id: place.placeId,
    latitude: place.coordinates.latitude,
    longitude: place.coordinates.longitude,
  };

  return (
    <Wrapper>
      <MapView
        height="100vh"
        pins={[pin]}
        center={{ lat: pin.latitude, lng: pin.longitude }}
      />
      <Back onClick={close} className="back-btn" />

      <div className="place-info">
        <PlaceBox type="type1" {...{ place }} />
        <AddBtn onClick={() => handleAddPlace(place)}>
          <Plus className="add-icon" />
          장소 추가
        </AddBtn>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .back-btn {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .place-info {
    width: 100%;
    ${flexCenter};
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 7.6rem;
  }
`;

const AddBtn = styled(Button)`
  position: fixed;
  width: 32rem;
  bottom: 1.4rem;
  .add-icon {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${theme.color.white};
  }
`;

export default PlaceMapView;
