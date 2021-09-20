import ImagePicker from 'react-native-image-crop-picker';

export const gallaryPick = (ctx) => {
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
  }).then((image) => {
    ctx.setState({displayImage: image.path});
    // console.log(response.fileSize);
  });
};
export const logoPick = (ctx) => {
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
  }).then((image) => {
    ctx.setState({companyLogo: image.path});
    // console.log(response.fileSize);
  });
};
export const ComplainPick = (ctx) => {
  ImagePicker.openPicker({
    mediaType: 'any',
    width: 400,
    height: 400,
    cropping: true,
  }).then((image) => {
    ctx.setState({complainImage: image.path});
  });
};
