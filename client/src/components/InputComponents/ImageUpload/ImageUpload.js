import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ImageUpload = (props) => {
  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    const {
      input: { onChange },
    } = props;
    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      onChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const {
    input: { value },
  } = props;
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>
          Support only images of (*.png, *.gif, *.jpeg, *.jpg) formats
        </span>
        <input
          id="fileInput"
          type="file"
          accept="image/gif, image/png, image/jpeg, image/jpg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img id="imagePreview" className={classNames({ [imgStyle]: !!value })} />
    </div>
  );
};

ImageUpload.propTypes = {
  input: PropTypes.object,
  classes: PropTypes.object,
};

export default ImageUpload;
