import React, { useState, useEffect } from 'react';

// AXIOS
import axios from 'axios';

// ICONES
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsSnow,
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

// API
const APIKey = 'a2b4b2100390cb82bad3b837ea078464';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Rio de Janeiro');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');
    input.value = '';

    e.preventDefault();
  };

  // fetch data
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&appid=${APIKey}`;
        const res = await axios.get(url);
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      } catch (error) {
        setLoading(false);
        setMsgErro(error);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsgErro('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [msgErro]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover flex flex-col items-center justify-center px-4 lg:px-0">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy className="text-[#d6d6d6]" />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#848484]" />;
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#848484]" />;
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#efefef]" />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className="text-[#a0a0a0]" />;
      break;
    case 'Mist':
      icon = <IoMdSnow className="text-[#cccccc]" />;
      break;
    default:
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover flex flex-col items-center justify-center px-4 lg:px-0">
      {/* MENSAGEM ERRO */}
      {msgErro && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">{`${msgErro.response.data.message}`}</div>
      )}

      {/* PRUCURAR CIDADE */}
      <form className="h-16 w-full max-w-[450px] bg-black/25 text-white  rounded-full mb-8">
        <div className="h-full relative flex items-center justify-between p-3">
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Procure uma cidade"
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[1rem] pl-6 font-light h-full"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

      <div className="w-full max-w-[450px] bg-black/25 min-h-[584px] text-white backdrop-blur-[2rem] rounded-[2rem] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* CARD TOP */}
            <div className="flex items-center gap-5">
              <div className="text-[6rem] text-yellow-400">{icon}</div>

              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            {/* CARD CORPO */}
            <div className="my-20">
              <div className="flex justify-center">
                <div className="text-[8rem] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>

              <div className="captalize text-center">
                {data.weather[0].description}
              </div>
            </div>

            {/* CARD BOTAO */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[1.3rem]">
                    <BsEye />
                  </div>
                  <div>
                    Visibilidade{' '}
                    <samp className="">{data.visibility / 1000} KM </samp>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[1.3rem]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Sensação
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[1.3rem]">
                    <BsWater />
                  </div>
                  <div>
                    Umidade <samp className="">{data.main.humidity}% </samp>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[1.3rem]">
                    <BsWind />
                  </div>
                  <div>
                    Ventos
                    <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
