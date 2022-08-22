import { useRouter } from "next/router";
import React, { useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

const SubPage = () => {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const subName = router.query.sub;
  const { data: sub, error } = useSWR(
    subName ? `/subs/${subName}` : null,
    fetcher
  );

  return (
    <>
      {sub && (
        <>
          <div>
            <input type="file" hidden={true} />
            {/* 배너 이미지 */}
            <div className="bg-purple-400">
              {sub.bannerUrl ? (
                <div
                  className="h-56"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-purple-400"></div>
              )}
            </div>

            {/* 커뮤니티 메타 데이터 */}
            <div className="h-20 bg-purple-400">
              <div className="relative flex max-w-5xl px-5 mx-auto">
                <div className="absolute" style={{ top: -15 }}>
                  {sub.imageUrl && (
                    <Image
                      src={sub.imageUrl}
                      alt="커뮤니티 이미지"
                      width={70}
                      height={70}
                      // onClick
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-small font-bold tex-gray-400">
                    /community/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 포스트와 사이드바 */}
          <div className="flex max-w-5xl px-4 pt-5 mx-auto"></div>
        </>
      )}
    </>
  );
};

export default SubPage;
