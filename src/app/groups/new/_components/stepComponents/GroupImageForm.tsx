import { useState } from 'react';
import Image from 'next/image';
import Layout from '@app/groups/[id]/schedules/_components/layout/Layout';
import Label from '@components/common/Label';
import { uploadFile } from '@utils/uploadFile';
import { Modification } from '@components/icons';
import { GroupsType } from '@ts/supabaseTableRowTypes';

type GroupImageFormProps = {
  onNext: (data: Pick<GroupsType, 'image_url'>) => void;
  onPrev: () => void;
  prevData: { imgurl: GroupsType['image_url'] };
};

const DEFULAT_GROUP_IMG =
  'https://sozcwgcoibigujehjxbf.supabase.co/storage/v1/object/public/profiles/groups/group-defaultImg.webp?t=2025-01-19T12%3A42%3A37.508Z';
const GroupImageForm = ({ onNext, onPrev, prevData }: GroupImageFormProps) => {
  const [values, setValues] = useState({
    imgurl: prevData.imgurl || DEFULAT_GROUP_IMG,
  });

  const handleNext = () => {
    onNext({ image_url: values.imgurl });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const publicUrl = await uploadFile('profiles', 'groups', file);
      setValues((prev) => ({ ...prev, imgurl: publicUrl }));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <Layout isDisabled={false} onNext={handleNext} onPrev={onPrev}>
      <div>
        <Label htmlFor="" label="대표 사진" required={false} description="모임을 대표할 사진을 등록해주세요" />
        <div>
          <div className="p-5 flex flex-col items-center">
            <div>
              <label htmlFor="profilePhoto" className="relative">
                <div className="m-auto w-24 h-24 cursor-pointer">
                  <Image
                    src={values.imgurl}
                    alt={'그룹 프로필'}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="block absolute bottom-[-8px] right-[-14px] cursor-pointer">
                  <Modification />
                </div>
              </label>
            </div>
            <input
              type="file"
              accept="image/*"
              name="profilePhoto"
              id="profilePhoto"
              className="hidden"
              onChange={handleChange}
            />
          </div>
          <p className="text-gray-400 text-sm">실제로 반영되는 사진 크기에요</p>
        </div>
      </div>
    </Layout>
  );
};

export default GroupImageForm;
