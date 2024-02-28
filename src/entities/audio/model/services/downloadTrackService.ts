import { AUDIO_URL } from '@env';
import RNFetchBlob from 'rn-fetch-blob';

type DownloadTrackServiceProps = {
  index: number;
  lang: string;
  setLoader: (value: number) => void;
};
export const downloadTrackService = async ({
  index,
  lang,
  setLoader,
}: DownloadTrackServiceProps): Promise<{
  status: string;
  localTrackPath: null | string;
}> => {
  const dirs = RNFetchBlob.fs.dirs;
  const localTrackDir = `${dirs.DocumentDir}/tracks`;
  const localTrackPath = `${localTrackDir}/${index}-${lang}.mp3`;

  const existsDir = await RNFetchBlob.fs.isDir(localTrackDir);
  if (!existsDir) {
    await RNFetchBlob.fs.mkdir(localTrackDir);
  }

  const exists = await RNFetchBlob.fs.exists(localTrackPath);
  if (exists) {
    return { status: 'success', localTrackPath };
  }

  try {
    const result = await RNFetchBlob.config({
      fileCache: true,
      path: localTrackPath,
    })
      .fetch('GET', `${AUDIO_URL}${index}/${lang}.mp3`, {})
      .progress((received, total) => {
        const progress = received / total;
        setLoader(progress * 100);
      });

    if (result.respInfo.status !== 200) {
      await RNFetchBlob.fs.unlink(localTrackPath);
      return { status: 'error', localTrackPath: null };
    }

    setLoader(0);
    return { status: 'success', localTrackPath };
  } catch (err) {
    await RNFetchBlob.fs.unlink(localTrackPath);
  }

  setLoader(0);
  return { status: 'error', localTrackPath: null };
};
