import RNFetchBlob from 'rn-fetch-blob';

export const removeAllTracks = async () => {
  const dirs = RNFetchBlob.fs.dirs;
  const localDir = `${dirs.DocumentDir}/tracks`;

  try {
    await RNFetchBlob.fs.unlink(localDir);
  } catch (error) {}
};
