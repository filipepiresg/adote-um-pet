import React, { useCallback, memo, forwardRef } from 'react';
import { Alert, Platform } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import analytics from '@react-native-firebase/analytics';

import PropTypes from 'prop-types';

const OPTIONS_PICKER = {
  mediaType: 'photo',
  maxWidth: 600,
  maxHeight: 600,
  quality: 1,
  cameraType: 'front',
  includeBase64: false,
  saveToPhoto: true,
};

const ImagePicker = forwardRef(({ children = null, changePhoto = () => {}, image = null }, ref) => {
  const requestPermissions = useCallback((_permissions = [], callback = null) => {
    requestMultiple(_permissions)
      .then((results) => {
        const hasNoPermitted = _permissions.findIndex(
          (permission) => results[permission] !== RESULTS.GRANTED
        );

        if (hasNoPermitted >= 0) {
          Alert.alert('Permissão necessária', null, [
            {
              text: 'Solicitar permissão',
              onPress: () => {
                requestPermissions(_permissions);
              },
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ]);
        } else if (callback) {
          callback();
        }
      })
      .catch((error) => {
        analytics().logEvent('error_permission_requested', {
          error,
        });
        console.log('Error on request permission', error);
      });
  }, []);

  const checkPermissions = useCallback(
    (callback = null) => {
      const _permissions = Platform.select({
        ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
        android: [
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.CAMERA,
        ],
        default: [],
      });

      if (_permissions.length > 0)
        checkMultiple(_permissions)
          .then((results) => {
            const allPermissionsDenied = _permissions.filter(
              (permission) => results[permission] !== RESULTS.GRANTED
            );

            if (allPermissionsDenied.length > 0) {
              requestPermissions(allPermissionsDenied, callback);
            } else if (callback) {
              callback();
            }
          })
          .catch((error) => {
            analytics().logEvent('error_permission_check', {
              error,
            });
            console.log('Error on check permissions', error);
          });
    },
    [requestPermissions]
  );

  const takePicture = useCallback(() => {
    checkPermissions(() =>
      launchCamera(OPTIONS_PICKER, (response) => {
        if (response.error || response.didCancel) {
          return;
        }

        changePhoto(response);
      })
    );
  }, [changePhoto, checkPermissions]);

  const selectGalery = useCallback(() => {
    checkPermissions(() =>
      launchImageLibrary(OPTIONS_PICKER, (response) => {
        if (response.error || response.didCancel) {
          return;
        }

        changePhoto(response);
      })
    );
  }, [changePhoto, checkPermissions]);

  const handlePress = useCallback(
    (index) => {
      if (index === 0) {
        takePicture();
      } else if (index === 1) {
        selectGalery();
      } else if (index === 2) {
        if (image) changePhoto(null);
      }
    },
    [changePhoto, image, selectGalery, takePicture]
  );

  // useEffect(() => {
  //   checkPermissions();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {children}
      <ActionSheet
        ref={ref}
        title='Selecione a foto'
        options={
          image
            ? ['Tirar foto', 'Selecionar da galeria', 'Remover foto', 'Cancelar']
            : ['Tirar foto', 'Selecionar da galeria', 'Cancelar']
        }
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={handlePress}
      />
    </>
  );
});

ImagePicker.propTypes = {
  changePhoto: PropTypes.func,
};

ImagePicker.defaultProps = {
  changePhoto: () => {},
};

export default memo(ImagePicker);
