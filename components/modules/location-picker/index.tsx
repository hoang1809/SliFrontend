import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { Modal } from 'antd';
import ButtonCustom from 'components/common/button';

const mapStyles = {
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  height: '60vh',
};

interface ModalLocationPickerProps {
  role: 'admin' | 'agency';
  isOpen: boolean;
  onClose: () => void;
  location: any;
  setLocation: Dispatch<SetStateAction<any>>;
}

const ModalLocationPicker = ({ role, isOpen, onClose, location, setLocation }: ModalLocationPickerProps) => {
  const defaultLocation = {
    lat: 35.68032111913352,
    lng: 139.77073873278178,
  };
  const [defaultCenter, setDefaultCenter] = useState(defaultLocation);
  const [currentPosition, setCurrentPosition] = useState<any>({});
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  const handleMapLoad = (map: any) => {
    mapRef.current = map;
  };
  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    const newPos = (mapRef.current as any).getCenter().toJSON();
    setCurrentPosition(newPos);
  };
  const handleMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };
  const handleSuccessGoogleMap = (position: any) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
    setDefaultCenter(currentPosition);
  };
  const handleErrorGoogleMap = () => {
    setCurrentPosition(defaultCenter);
  };
  const handleSearchLoad = (ref: any) => {
    searchRef.current = ref;
  };
  const handlePlacesChanged = () => {
    const position = (searchRef.current as any).getPlaces()[0].geometry.location.toJSON();
    setCurrentPosition(position);
    setDefaultCenter(position);
  };
  const handleClick = (e: any) => {
    const position = e.latLng.toJSON();
    setCurrentPosition(position);
    setDefaultCenter(position);
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      handleErrorGoogleMap();
    }
    navigator.geolocation.getCurrentPosition(handleSuccessGoogleMap, handleErrorGoogleMap);
    window.scrollTo(0, 0);
  }, []);
  return (
    <Modal open={isOpen} closable footer={null} maskClosable width={720} onCancel={onClose}>
      <LoadScript
        googleMapsApiKey={''}
        // googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
        libraries={['places']}
      >
        <GoogleMap
          onLoad={handleMapLoad}
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          // onDragEnd={onMapDragEnd}
          onCenterChanged={handleCenterChanged}
          onClick={handleClick}
        >
          <div id="searchbox" className="flex justify-center">
            <StandaloneSearchBox onLoad={handleSearchLoad} onPlacesChanged={handlePlacesChanged}>
              <input
                type="text"
                placeholder="Search"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `320px`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: 'relative',
                  top: 8,
                }}
              />
            </StandaloneSearchBox>
          </div>
          {currentPosition.lat ? (
            <Marker position={currentPosition} onDragEnd={(e) => handleMarkerDragEnd(e)} draggable={true} />
          ) : null}
        </GoogleMap>
      </LoadScript>
      <div className="flex justify-between mt-4">
        <div>
          lat: {currentPosition.lat} - long: {currentPosition.lng}
        </div>
        <div className="flex justify-end gap-4">
          <ButtonCustom
            onClick={() => {
              setLocation(location);
              onClose();
            }}
            bg="red"
          >
            Cancel
          </ButtonCustom>
          <ButtonCustom
            onClick={() => {
              setLocation(currentPosition);
              onClose();
            }}
            bg="red"
          >
            Ok
          </ButtonCustom>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLocationPicker;
