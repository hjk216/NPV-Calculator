import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./style.css";
import { Button, Input } from 'reactstrap'

import { changePeriod, inputIR, inputFV, calculateNPV, clear } from './calculatorSlice'

import { useGetAllCalcQuery, useDeleteCalcMutation } from './saveSlice';



export default function SavedCalculations() {
    const { data = [], isLoading, isFetching, isError } = useGetAllCalcQuery()
    const [deleteCalc, { isLoading: isDeleting }] = useDeleteCalcMutation()

    if (isError) return <div>An error has occurred.</div>
    if (isLoading) return <div>Currently Loading...</div>

    return (
        <div className='save_div'>
            {data.map((item) => (
                <div key={item.id} className='save_table'>
                    <div id='table_info'>
                        <Input className='rate_input_save' placeholder='Rate' value={item.rate} readOnly />
                        <Input className='NPV_display' placeholder='NPV' value={item.NPV} readOnly />
                        <Button id='delete_button' onClick={() => deleteCalc(item.id)}>Delete</Button>
                    </div>
                    <table>
                        <tbody>
                            <tr> 
                                <th><Input value='Time' className='col_heading' readOnly tabIndex='-1' /></th>
                                <th><Input value='FV' className='col_heading' readOnly tabIndex='-1' /></th>
                                <th><Input value='DF' className='col_heading' readOnly tabIndex='-1' /></th>
                                <th><Input value='PV' className='col_heading' readOnly tabIndex='-1' /></th>
                            </tr>
                            
                            {Object.entries(item.data).map((period) => (
                                <tr key={period[0]}>
                                    <th>
                                        <Input placeholder='period..' value={period[0]} readOnly />
                                    </th>
                                    <th>
                                        <Input placeholder='FV' value={period[1]['FV']} readOnly />
                                    </th>
                                    <th>
                                        <Input placeholder='DR' value={period[1]['discount']} readOnly />
                                    </th>
                                    <th>
                                        <Input placeholder='PV' value={period[1]['PV']} readOnly />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ))}
        </div>
    )
}
