import {StandaloneSearchBox} from '@react-google-maps/api';
import React, {memo} from 'react';

interface IProps {
  handleSearchBox: () => void;
  searchBoxRef: any;
}
// const MyComponent = React.memo(function MyComponent(props))
const SearchBox: React.FC<IProps> = memo(({ handleSearchBox, searchBoxRef }) => {
  return (
    <StandaloneSearchBox
      ref={searchBoxRef}
      onPlacesChanged={handleSearchBox}
    >
      <input
        type="text"
        placeholder="Search for your board"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: 'absolute',
          left: '50%',
          marginLeft: '-120px',
        }}
      />
    </StandaloneSearchBox>
  );
});

export default SearchBox;
