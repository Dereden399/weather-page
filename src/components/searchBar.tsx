import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDelayField } from "../hooks";
import { getCitiesList } from "../services/weatherService";
import { CitiesList, SearchBarRefType } from "../types";

type SearchBarProps = {
  setList: React.Dispatch<React.SetStateAction<CitiesList | null>>;
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseButton = ({ closeFunction }: { closeFunction: () => void }) => {
  return <button onClick={closeFunction}>close</button>;
};

const SearchBar = forwardRef(
  (props: SearchBarProps, ref: Ref<SearchBarRefType>) => {
    const [data, handleData, delayedValue, clear] = useDelayField(2000);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    useEffect(() => {
      const find = async () => {
        const list = await getCitiesList(delayedValue.replace(" ", "+"));
        props.setList(list);
      };
      if (delayedValue) void find();
    }, [delayedValue]);

    const clearField = () => {
      clear();
      setIsSearchActive(false);
      props.setList(null);
      props.toggleVisible(false);
    };

    useImperativeHandle(ref, () => {
      return {
        clearField,
      };
    });

    return (
      <div>
        {isSearchActive ? <CloseButton closeFunction={clearField} /> : null}
        <input
          placeholder='Type city name here...'
          value={data}
          onChange={e => {
            props.toggleVisible(true);
            handleData(e);
          }}
          onClick={e => setIsSearchActive(true)}
        />
      </div>
    );
  }
);

export default SearchBar;
