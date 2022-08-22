import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Intro from "../components/sections/Intro";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      {/* <section className="css-1i7bcd8 e7dsxmo0 relative w-full overflow-hidden block m-0 p-0 border-0 align-baseline">
        <div className="css-bjn8wh eadyikr8 relative">
          <div className="css-1ol0u6w eadyikr6 tossteam-react__wrapper relative overflow-hidden w-auto h-screen">
            <Image
              src="https://static.toss.im/3d/toss-im-web-intro-still-start.jpg"
              alt=""
              aria-hidden="true"
              className="tossteam-react__fallback-poster tossteam-react__fallback-poster__enabled object-cover w-full h-full -z-10 absolute left-0 right-0 block"
              width="100%"
              height="100%"
            />
            <video
              // muted=""
              // playsinline=""
              poster="https://static.toss.im/3d/toss-im-web-intro-still-start.jpg"
              className="tossteam-react__video object-cover w-full h-full"
            >
              <source
                src="https://static.toss.im/3d/toss-im-web-intro.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="css-1m33lmr eadyikr7 absolute top-0 left-0 w-full bg-gradient-to-b"></div>
          <div className="css-jsy4nc eadyikr5 absolute top-0 left-0 w-full h-full items-center flex content-center justify-between">
            <div className="css-1vx5w37 items-center flex-col justify-start">
              <h1 className="css-1v4pzss eadyikr4 font-bold text-4xl text-center w-full">
                금융의 모든 것 토스에서 쉽고 간편하게
              </h1>
              <div className="css-1lwf0h3">
                <a
                  className="p-button p-button--default p-button--inline p-button--fill p-button--large padding--l css-19xjn3a"
                  type="button"
                  aria-disabled="false"
                  target="_blank"
                  href="https://itunes.apple.com/kr/app/%ED%86%A0%EC%8A%A4/id839333328?mt=8"
                  rel="noreferrer noopener"
                >
                  <Image
                    src="https://static.toss.im/png-icons/timeline/applekorea.png"
                    width="40"
                    height="40"
                    className="css-1m3khn2"
                    alt=""
                  />
                  App Store
                </a>
                <a
                  className="p-button p-button--default p-button--inline p-button--fill p-button--large padding--l css-1hs38uh"
                  type="button"
                  aria-disabled="false"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=viva.republica.toss"
                  rel="noreferrer noopener"
                >
                  <Image
                    src="https://static.toss.im/png-icons/timeline/googleplay.png"
                    width="40"
                    height="40"
                    className="css-1m3khn2"
                    alt=""
                  />
                  Google Play
                </a>
              </div>
            </div>
            <button className="css-1746umt eadyikr3">
              <div className="css-ypnlzr eadyikr2" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 200"
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid meet"
                  // style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"
                >
                  <defs>
                    <clipPath id="__lottie_element_167">
                      <rect width="200" height="200" x="0" y="0"></rect>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#__lottie_element_167)">
                    <g
                      transform="matrix(0.27568691968917847,0,0,0.27568691968917847,21.842758178710938,61.92705535888672)"
                      opacity="0.07521347826041323"
                      // style="display: block;"
                    >
                      <path
                        fill="rgb(20,23,37)"
                        fillOpacity="1"
                        d=" M283.4639892578125,274.375 C273.343994140625,274.375 263.2250061035156,272.17498779296875 253.79800415039062,267.7760009765625 C253.79800415039062,267.7760009765625 16.750999450683594,157.16299438476562 16.750999450683594,157.16299438476562 C4.238999843597412,151.32400512695312 -1.1710000038146973,136.447998046875 4.668000221252441,123.93599700927734 C10.505999565124512,111.42400360107422 25.381999969482422,106.01499938964844 37.89400100708008,111.85399627685547 C37.89400100708008,111.85399627685547 274.9410095214844,222.46600341796875 274.9410095214844,222.46600341796875 C280.3580017089844,224.9929962158203 286.5710144042969,224.99200439453125 291.98699951171875,222.46600341796875 C291.98699951171875,222.46600341796875 529.0349731445312,111.85399627685547 529.0349731445312,111.85399627685547 C541.5469970703125,106.01399993896484 556.4219970703125,111.42400360107422 562.260986328125,123.93599700927734 C568.0989990234375,136.447998046875 562.6890258789062,151.32400512695312 550.177001953125,157.16299438476562 C550.177001953125,157.16299438476562 313.1300048828125,267.7760009765625 313.1300048828125,267.7760009765625 C303.7040100097656,272.17498779296875 293.5840148925781,274.375 283.4639892578125,274.375z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="css-c6i2rq eadyikr1">
          <p className="css-1dnsw8f eadyikr0">
            내 모든 금융 내역을 한눈에 조회하고 한 곳에서 관리하세요. 이제껏
            경험 못 했던 쉽고 편리한 금융 서비스, 토스와 함께라면 당신의 일상이
            새로워질 거예요.
          </p>
        </div>
      </section> */}
      <Intro />
    </>
  );
};

export default Home;
