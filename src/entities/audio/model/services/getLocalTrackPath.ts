import RNFetchBlob from 'rn-fetch-blob';

export const getLocalTrackPath = async (
  url: string,
  index: number,
  lang: string,
) => {
  const dirs = RNFetchBlob.fs.dirs;
  const localTrackDir = `${dirs.DocumentDir}/tracks`;
  const localTrackPath = `${localTrackDir}/${index}-${lang}.mp3`;

  const exists = await RNFetchBlob.fs.exists(localTrackPath);
  if (exists) {
    return { url: localTrackPath, locale: true };
  } else {
    return { url, locale: false };
  }
};
