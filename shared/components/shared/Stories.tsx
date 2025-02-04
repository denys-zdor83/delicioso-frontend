'use client';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React from 'react';
import { Container } from '.';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useWindowSize } from 'react-use';

import 'swiper/css/bundle';
import 'swiper/css/navigation';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [skeletonCardsNumber, setSkeletonCardsNumber] = React.useState(0);
  const [storyCardsNumber, setStoryCardsNumber] = React.useState(0);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();
  const { width } = useWindowSize();
  let storyCardsWidth = 520;

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  React.useEffect(() => {
    if (768 < width && width < 1024) {
      setStoryCardsNumber(4);
      setSkeletonCardsNumber(4);
      return;
    } else if (640 < width && width < 768) {
      setStoryCardsNumber(3);
      setSkeletonCardsNumber(3);
      return;
    } else if (width < 640) {
      setStoryCardsNumber(2);
      setSkeletonCardsNumber(2);
      storyCardsWidth = width - 20;
      return;
    }
    setStoryCardsNumber(5);
    setSkeletonCardsNumber(6);
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
        {
          stories.length === 0 &&
            [...Array(skeletonCardsNumber)].map((_, index) => (
              <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
            ))
        }

        <Swiper
          slidesPerView={storyCardsNumber}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {
            stories.map((story) => (
              <SwiperSlide key={story.id}>
                <img
                  key={story.id}
                  onClick={() => onClickStory(story)}
                  className="rounded-md cursor-pointer"
                  height={250}
                  width={200}
                  src={story.previewImageUrl}
                  style={{ userSelect: 'none' }}
                />
              </SwiperSlide>
            ))
          }
        </Swiper> 

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" >
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={storyCardsWidth}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};