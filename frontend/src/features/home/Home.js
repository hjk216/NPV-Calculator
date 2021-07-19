import React from 'react';
import { useCookies } from 'react-cookie';


import Calculator from '../calculator/Calculator'
import SavedCalculations from '../calculator/savedCalculation';
import '../common/style.css'

export default function Home() {
    const [cookies] = useCookies(['token'])

    return (
        <div>
            <h1>NPV Calculator</h1>
            <Calculator />
            {cookies.token ? <h2 id='save_title'>Saved NPV Calculations</h2> : ''}
            {cookies.token ? <SavedCalculations /> : ''}
        </div>
    )
}
