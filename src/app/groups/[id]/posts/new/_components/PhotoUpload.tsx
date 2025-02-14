'use client';

import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Button from '@components/common/Button';
import { DeletePhoto, PlusGray } from '@components/icons';

import { useState } from 'react';

const MAX_FILES = 10; // 최대 파일 수
const MAX_WIDTH = 1024; // 최대 너비
const QUALITY = 1; // 이미지 품질 (0 ~ 1)

interface PhotoUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  OpenImageCountAlert: () => void;
}

const PhotoUpload = ({ selectedFiles, setSelectedFiles, OpenImageCountAlert }: PhotoUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 이미지 파일 최적화
  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      reader.onerror = (e) => reject(e);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return reject('Canvas context not available');

        // 이미지 크기 조정
        const scale = img.width > MAX_WIDTH ? Math.min(MAX_WIDTH / img.width, 1) : 1;
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Blob conversion failed');
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve(resizedFile);
          },
          'image/jpeg',
          QUALITY
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    onDrop: async (acceptedFiles) => {
      const totalFiles = selectedFiles.length + acceptedFiles.length;

      if (totalFiles > MAX_FILES) {
        OpenImageCountAlert();
        return;
      }

      // 이미지 리사이즈 처리
      const resizedFiles = await Promise.all(acceptedFiles.map((file) => resizeImage(file)));
      const newUrls = resizedFiles.map((file) => URL.createObjectURL(file));

      setSelectedFiles([...selectedFiles, ...resizedFiles]);
      setPreviewUrls([...previewUrls, ...newUrls]);
    },
  });

  // 선택한 index에 해당하는 이미지 미리보기 파일과 이미지 파일 삭제
  const handleDelete = (indexToDelete: number) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToDelete));
    setPreviewUrls(previewUrls.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="w-full flex mt-0 px-5">
      {/* 파일 선택 버튼 */}
      <div
        {...getRootProps()}
        className="relative flex items-center justify-center w-[8.75rem] h-[8.75rem] bg-[#F1F1F1] cursor-pointer flex-shrink-0 mr-[1px]"
      >
        <input {...getInputProps()} type="file" multiple accept="image/jpeg, image/png, image/gif, image/svg+xml" />
        <div className="flex flex-col items-center">
          <p className="absolute top-[32px] right-[48px] text-[#FF3B30]">*</p>
          <PlusGray />
          <div className="text-gray-500 text-base w-6 flex justify-center">
            {previewUrls.length}/{MAX_FILES}
          </div>
        </div>
      </div>

      {/* Swiper 슬라이더 (미리보기) */}
      {previewUrls.length > 0 && (
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="w-full justify-start">
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '8.625rem' }}>
              <img src={url} alt={`미리보기-${index}`} className="w-[8.75rem] aspect-square object-cover" />
              <Button
                label=""
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute top-0 right-0 p-[6px] rounded-full bg-[#00000080]"
              >
                <DeletePhoto />
              </Button>
            </SwiperSlide>
          ))}
          {/* 미리보기 우측 그라디언트 효과 */}
          <div className="absolute top-0 right-0 w-[28px] h-[8.75rem] pointer-events-none bg-gradient-to-r from-transparent to-white z-10"></div>
        </Swiper>
      )}
    </div>
  );
};

export default PhotoUpload;
