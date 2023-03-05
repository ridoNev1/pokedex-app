import { usePokedexController } from "context/pokedex-context";
import React, { useEffect, useState } from "react";
import { handleGetPokemonList } from "adapters/pokedex";
import {
  Container,
  Card,
  Loading,
  ModalContainer,
  PokemonDetail
} from "components";
import { filterTypePokemon } from "lib";
import { typePokemon } from "textConstant";

const Homescreen = () => {
  const [controller, dispatch] = usePokedexController();
  const { listPokemon } = controller;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filterVal, setFilterVal] = useState("");

  const getListPokemonData = () => {
    if (isFilterActive) {
      handleGetPokemonList(dispatch, page, limit, filterVal);
    } else {
      handleGetPokemonList(dispatch, page, limit);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getListPokemonData();
  }, [page, filterVal]);

  const ButtonNext = () => {
    return (
      <button
        onClick={() => setPage(page + 1)}
        className="text-[#303134] inline-block cursor-pointer bg-white rounded-full shadow-md active:translate-y-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  };

  const ButtonPrev = () => {
    return (
      <button
        onClick={() => setPage(page - 1)}
        className="inline-block text-[#303134] cursor-pointer bg-white rounded-full shadow-md active:translate-y-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  };

  return (
    <Container>
      <ModalContainer
        isOpen={modalOpen}
        title="Pokemon Detail"
        setIsOpen={(val) => {
          setModalOpen(val);
          setDetailData({});
        }}>
        <PokemonDetail data={detailData} />
      </ModalContainer>

      {!listPokemon.isLoading && (
        <div className="flex mt-6 flex-wrap items-center">
          {typePokemon.map((el, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setLimit(500);
                  setIsFilterActive(true);
                  setPage(1);
                  setFilterVal(el?.name);
                }}
                className={`${
                  el?.name === filterVal ? "border-white" : "border-transparent"
                } border-[3px] py-1 px-3 font-semibold text-sm mr-2 mt-2 uppercase ${
                  el.color
                } rounded-lg shadow-lg`}>
                {el.name}
              </button>
            );
          })}
          {isFilterActive && (
            <button
              onClick={() => {
                setLimit(20);
                setIsFilterActive(false);
                setPage(1);
                setFilterVal("");
              }}
              className={`py-1 px-3 text-sm mr-2 mt-2 rounded-lg shadow-lg`}>
              Reset Filter
            </button>
          )}
        </div>
      )}

      {!listPokemon.isLoading && listPokemon?.data?.length > 0 && (
        <p className="mt-6">
          Showing{" "}
          {isFilterActive && (
            <span className="font-semibold">{filterVal} pokemon</span>
          )}{" "}
          from data :{" "}
          <span className="font-semibold">
            {page * limit - limit + 1} - {page * limit}
          </span>{" "}
          of <span className="font-semibold">{listPokemon?.count}</span> total
        </p>
      )}
      <div className="grid grid-cols-auto-fit md:grid-cols-2 gap-6 mb-12 mt-5">
        {!listPokemon.isLoading ? (
          listPokemon?.data?.length > 0 ? (
            listPokemon.data.map((el, index) => (
              <div
                key={index}
                onClick={() => {
                  setModalOpen(!modalOpen);
                  setDetailData(el);
                }}
                className="cursor-pointer hover:scale-105 transition-all">
                <Card
                  index={index}
                  name={el?.name || "no name"}
                  images={
                    el?.sprites?.other?.dream_world?.front_default ||
                    el?.sprites?.other?.["official-artwork"]?.front_default ||
                    el?.sprites?.front_default
                  }
                  color={filterTypePokemon(el?.types?.[0]?.type?.name)}
                  type={el?.types?.[0]?.type?.name}
                />
              </div>
            ))
          ) : (
            <span>no more data</span>
          )
        ) : (
          <Loading
            text={
              isFilterActive
                ? "Preparing for filter, it's may take a long time"
                : null
            }
          />
        )}
      </div>
      {!listPokemon.isLoading && (
        <div className="flex justify-between items-center mb-10">
          <span></span>
          <div className="space-x-2 flex items-center">
            {page !== 1 && <ButtonPrev />}
            <p className="text-sm">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">
                {Math.ceil(listPokemon.count / limit)}
              </span>
            </p>
            {page < Math.ceil(listPokemon.count / limit) && <ButtonNext />}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Homescreen;
