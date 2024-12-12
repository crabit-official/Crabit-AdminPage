import { ChangeEvent, useState } from 'react';
import {
  CHALLENGE_CATEGORY,
  CHALLENGE_LOG_TYPE,
  S3_FOLDER,
} from '../../shared/enum';
import useCreateCrabitChallenge from '../../shared/hooks/challenge/useCreateCrabitChallenge';
import useImage from '../../shared/hooks/image/useImage';
import useRequestPresignedURL from '../../shared/hooks/image/useRequestPresignedURL';
import FilterList from '../../shared/components/FilterList/FilterList';
import { useNavigate } from 'react-router-dom';

export default function CreateCrabitChallengePage() {
  const [filter, setFilter] = useState<keyof typeof CHALLENGE_CATEGORY>('ETC');

  const navigate = useNavigate();
  const { mutate: createCrabitChallenge } = useCreateCrabitChallenge();
  const { mutate: requestPresignedURL } = useRequestPresignedURL();

  const { filePreview, handleChangeFile, imageKeyName } = useImage();
  const [file, setFile] = useState<File | null>(null);
  const [fileKeyName, setFileKeyName] = useState<string | null>(null);

  console.log(imageKeyName);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fileUrl: null,
    challengeLogType: CHALLENGE_LOG_TYPE.GENERAL,
  });

  const handleSubmit = async () => {
    createCrabitChallenge(
      {
        title: formData.title,
        content: formData.content,
        thumbnailImageUrl: imageKeyName ? imageKeyName : null,
        fileUrl: fileKeyName ? fileKeyName : null,
        challengeCategory: filter as CHALLENGE_CATEGORY,
        challengeLogType: formData.challengeLogType,
      },
      {
        onSuccess: () => {
          alert('크래빗 챌린지 생성에 성공했습니다');
          navigate('/');
        },
      }
    );
  };

  const handleChangeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg'>
      {/* Category Filter */}
      <h1 className='text-2xl font-semibold mb-4'>카테고리</h1>
      <div className='max-w-2xl overflow-x-auto'>
        <FilterList
          active={filter as CHALLENGE_CATEGORY}
          onChange={(f) => setFilter(f)}
        />
      </div>

      {/* Thumbnail Image Upload */}
      <h1 className='text-2xl font-semibold mt-6 mb-4'>썸네일 이미지 업로드</h1>
      <label
        htmlFor='file'
        className='flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300'
      >
        {filePreview ? (
          <img
            src={filePreview}
            className='h-full w-full object-cover rounded-lg'
            alt='썸네일 미리보기'
          />
        ) : (
          <div className='flex flex-col items-center'>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16V8m0 0l4 4m-4-4l-4 4m13 4V8m0 0l4 4m-4-4l-4 4'
              ></path>
            </svg>
            <p className='text-gray-500 mt-2'>파일을 업로드하세요</p>
          </div>
        )}
        <input
          type='file'
          id='file'
          onChange={(e) => {
            handleChangeFile(e, S3_FOLDER.CHALLENGE_CORE_THUMBNAIL_IMAGE);
          }}
          className='hidden'
        />
      </label>

      {/* Title Input */}
      <h1 className='text-2xl font-semibold mt-6 mb-4'>제목</h1>
      <input
        name='title'
        placeholder='제목을 입력해주세요!'
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        value={formData.title}
        onChange={handleChangeFormData}
      />

      {/* Content Textarea */}
      <h1 className='text-2xl font-semibold mt-6 mb-4'>내용</h1>
      <textarea
        name='content'
        placeholder='내용을 입력해주세요!'
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        value={formData.content}
        onChange={handleChangeFormData}
        rows={5}
      />

      {/* File Upload */}
      <h1 className='text-2xl font-semibold mt-6 mb-4'>파일 업로드</h1>
      <label
        htmlFor='file-upload'
        className='flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300'
      >
        {file ? (
          <div className='flex flex-col items-center'>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16V8m0 0l4 4m-4-4l-4 4m13 4V8m0 0l4 4m-4-4l-4 4'
              ></path>
            </svg>
            <p className='text-gray-500 mt-2'>파일을 업로드하세요</p>
            <p className='text-sm text-gray-400 mt-1'>{file.name}</p>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16V8m0 0l4 4m-4-4l-4 4m13 4V8m0 0l4 4m-4-4l-4 4'
              ></path>
            </svg>
            <p className='text-gray-500 mt-2'>파일을 업로드하세요</p>
          </div>
        )}
        <input
          type='file'
          id='file-upload'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);

              requestPresignedURL(
                {
                  fileName: selectedFile.name,
                  s3Folder: S3_FOLDER.CHALLENGE_CORE_FILE,
                },
                {
                  onSuccess: async (data) => {
                    try {
                      setFileKeyName(data.result.keyName);
                      const res = await fetch(data.result.url, {
                        method: 'PUT',
                        body: selectedFile,
                      });
                      if (!res.ok) {
                        alert('파일 업로드 실패');
                        return false;
                      }
                      return true;
                    } catch {
                      alert('파일 업로드에 실패, 다시 시도해주세요');
                      return false;
                    }
                  },
                }
              );
            }
          }}
          className='hidden'
        />
      </label>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className='mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        크래빗 챌린지 생성하기
      </button>
    </div>
  );
}
