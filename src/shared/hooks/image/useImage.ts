import { ChangeEvent, useState } from 'react';
import useRequestPresignedURL from './useRequestPresignedURL';
import { S3_FOLDER } from '../../enum';

function useImage() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageKeyName, setImageKeyName] = useState<string | null>(null);
  const { mutate: requestPresignedURL } = useRequestPresignedURL();

  const handleChangeFile = (
    e: ChangeEvent<HTMLInputElement>,
    s3Folder: S3_FOLDER
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));

      requestPresignedURL(
        {
          fileName: selectedFile.name,
          s3Folder,
        },
        {
          onSuccess: async (data) => {
            try {
              setImageKeyName(data.result.keyName);
              const res = await fetch(data.result.url, {
                method: 'PUT',
                body: file,
              });

              console.log('성공', res);

              if (!res.ok) {
                alert('이미지 업로드 실패');
                return false;
              }

              return true;
            } catch {
              alert('이미지 업로드에 실패, 다시 시도해주세요');
              return false;
            }
          },
        }
      );
    }
  };

  const handleRemove = () => {
    setFilePreview(null);
    setFile(null);
  };

  return {
    file,
    filePreview,
    handleChangeFile,
    setFile,
    setFilePreview,
    handleRemove,
    imageKeyName,
  };
}

export default useImage;
