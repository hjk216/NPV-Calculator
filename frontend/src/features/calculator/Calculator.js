import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./style.css";
import { Button, Input } from 'reactstrap'
import { useCookies } from 'react-cookie'

import { changePeriod, inputIR, inputFV, calculateNPV, clear } from './calculatorSlice'
import { useAddCalcMutation } from './saveSlice';

export default function Calculator() {
    const dispatch = useDispatch()

    const [cookies] = useCookies(['token'])

    const numPeriod = useSelector(state => state.calculator.calculator.period)

    const numTable = useSelector(state => state.calculator.calculator.table)

    const interestRate = useSelector(state => state.calculator.calculator.rate)

    const NPV = useSelector(state => state.calculator.calculator.NPV)

    const [addCalc, { isLoading: isUpdating, error }] = useAddCalcMutation()
    
    const onSave = function() {
        if(NPV != '') {
            addCalc({rate: interestRate, NPV: NPV, data: numTable})
        }
    }

    return (
        <div id='table_div'>
            <div id='table_info'>
                <Input id='interest_rate_input' placeholder='Rate' value={interestRate} onChange={e => dispatch(inputIR({input: e.target.value}))} />
                <Input className='NPV_display' placeholder='NPV' value={NPV} readOnly tabIndex='-1' />
                {cookies.token ? <Button id='save_button' onClick={onSave}>Save</Button> : ''}
            </div>
            <table>
                <tbody>
                <tr> 
                    <th><Input value='Time' className='col_heading' readOnly tabIndex='-1' /></th>
                    <th><Input value='FV' className='col_heading' readOnly tabIndex='-1' /></th>
                    <th><Input value='DF' className='col_heading' readOnly tabIndex='-1' /></th>
                    <th><Input value='PV' className='col_heading' readOnly tabIndex='-1' /></th>
                </tr>

                {numPeriod.map((period) => (
                    <tr key={period}>
                        <th>
                            <Input value={period} readOnly tabIndex='-1' />
                        </th>
                        <th>
                            <Input placeholder='FV' value={numTable[period]['FV']} onChange={e => dispatch(inputFV({period: period, input: e.target.value}))} />
                        </th>
                        <th>
                            <Input placeholder='DR' value={numTable[period]['discount']} readOnly tabIndex='-1' />
                        </th>
                        <th>
                            <Input placeholder='PV' value={numTable[period]['PV']} readOnly tabIndex='-1' />
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>{error ? 'An Error Occured.' : ''}</div>
            <Button id='clear_button' onClick={() => dispatch(clear())}>Clear</Button>
            <Button onClick={() => dispatch(changePeriod({action: 'subtract'}))}>Subtract Period</Button>
            <Button onClick={() => dispatch(changePeriod({action: 'add'}))}>Add Period</Button>
            <Button onClick={() => dispatch(calculateNPV())} >Calculate</Button>
        </div>
    )
}
