import React from "react";
import PropType from "prop-types";
import { filterTypePokemon } from "lib";

const PokemonDetail = ({ data }) => {
  return (
    <div className="max-h-[70vh] overflow-scroll __styled-scrollbar pr-3">
      <div className="flex justify-center my-6">
        <div className="max-w-[300px] w-full h-[300px] bg-slate-300 rounded-lg shadow-lg">
          <img
            src={data?.sprites?.other?.["official-artwork"]?.front_default}
            alt="iner-thubnail"
            className={`max-w-[300px] ${filterTypePokemon(
              data?.types?.[0]?.type?.name
            )} md:max-w-full  h-[300px] object-cover rounded-lg shadow-lg`}
          />
        </div>
      </div>
      <div>
        <p className="font-semibold bg-[#303134] py-1 px-4 text-white rounded-lg">
          Type :
        </p>
        <div className="flex flex-wrap mt-3 space-x-1">
          {data?.types?.map((el, index) => (
            <p
              key={index}
              className={`${filterTypePokemon(
                el?.type?.name
              )} text-white font-semibold text-xs uppercase py-1 px-3 rounded-lg`}>
              {el?.type?.name}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold bg-[#303134] py-1 px-4 text-white rounded-lg">
          Stat :
        </p>
        <div className="mt-3">
          {data?.stats?.map((el, index) => (
            <div
              key={index}
              className="grid grid-cols-[4fr,1fr] divide-x-2 border-b-2 py-1 px-3 border-gray-200 mt-1">
              <p className="font-semibold text-xs uppercase">
                {el?.stat?.name || "no name"}
              </p>
              <p className="font-semibold text-xs text-center">
                {el?.base_stat || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold bg-[#303134] py-1 px-4 text-white rounded-lg">
          Detail :
        </p>
        <div className="mt-3">
          <div className="grid grid-cols-[4fr,1fr] divide-x-2 border-b-2 py-1 px-3 border-gray-200 mt-1">
            <p className="font-semibold text-xs uppercase">Weight</p>
            <p className="font-semibold text-xs text-center">
              {`${data?.weight} lbs` || "-"}
            </p>
          </div>
          <div className="grid grid-cols-[4fr,1fr] divide-x-2 border-b-2 py-1 px-3 border-gray-200 mt-1">
            <p className="font-semibold text-xs uppercase">Height</p>
            <p className="font-semibold text-xs text-center">
              {`${data?.height} ft` || "-"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <img src={data?.sprites?.front_default} />
      </div>
    </div>
  );
};

PokemonDetail.propTypes = {
  data: PropType.object
};

export default PokemonDetail;
