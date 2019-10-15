export const isBoardCloseToUser = (board: any, latLng: any) => {
  let result = false;
  const latLngBounds = 0.002200;
  const x = Math.abs(board.latLng.lat - latLng.lat);
  const y = Math.abs(board.latLng.lng - latLng.lng);
  if (x < latLngBounds && y < latLngBounds) {
    result = true;
  }
  return result;
};