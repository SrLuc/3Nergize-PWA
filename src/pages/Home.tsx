import React, { useEffect, useState } from 'react';
import * as S from './StylesPage';
import { BarChart } from '../components/HomeComponents/Barra';

//NavBottomBar
import NavBottomBar from '../components/NavBottomBar/NavBottomBar';
import Search from '../components/HomeComponents/Search';
import Apresentation from '../components/HomeComponents/Apresentation';
import BottomSearch from '../components/HomeComponents/BottomSearch';

interface HomeProps {}

const Home = ({}: HomeProps) => {
    const [maxValue, setMaxValue] = useState<number>(() => {
        const storedValue = localStorage.getItem('maxValue');
        if (storedValue) {
            return parseInt(storedValue);
        }
        return 500;
    });

    const handleMaxValueChange = (newMaxValue: number) => {
        setMaxValue(newMaxValue);
        localStorage.setItem('maxValue', newMaxValue.toString());
    };

    return (
        <S.StyledHomePage>
            <Search amount={50} />
            <BarChart
                value={0}
                maxValue={maxValue}
                width={300}
                height={20}
                borderRadius={10}
                onMaxValueChange={handleMaxValueChange}
            />

            <Apresentation />
            <BottomSearch />
            <NavBottomBar />
        </S.StyledHomePage>
    );
};

export default Home;
