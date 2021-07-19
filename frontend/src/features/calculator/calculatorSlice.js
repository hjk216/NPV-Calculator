import { createSlice } from '@reduxjs/toolkit'



const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: {
        calculator: {
            period: [0, 1, 2, 3, 4],
            rate: '',
            NPV: '',
            table: {
                0: { FV: '', discount: '', PV: '', },
                1: { FV: '', discount: '', PV: '', },
                2: { FV: '', discount: '', PV: '', },
                3: { FV: '', discount: '', PV: '', },
                4: { FV: '', discount: '', PV: '', },
            },
        },
    },
    reducers: {
        changePeriod(state, action) {
            if(action.payload.action == 'add' && state.calculator.period.length < 10) {
                var index = state.calculator.period.length - 1
                var new_num = state.calculator.period[index] + 1
                state.calculator.period.push(new_num)
                state.calculator.table[new_num] = { FV: '', discount: '', PV: '', }
            }
            else if(action.payload.action == 'subtract' && state.calculator.period.length > 2) {
                var index = state.calculator.period.length - 1
                state.calculator.period.splice(index, 1)
                delete state.calculator.table[index]
            }
        },
        inputIR(state, action) {
            const valid_chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '%']

            for(var i = 0; i < action.payload.input.length; i++) {
                if(!valid_chars.includes(action.payload.input[i])) {
                    return
                }
            }
            state.calculator.rate = action.payload.input
        },
        inputFV(state, action) {
            const valid_chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '-', '(', ')']

            for(var i = 0; i < action.payload.input.length; i++) {
                if(!valid_chars.includes(action.payload.input[i])) {
                    return
                }
            }
            state.calculator.table[action.payload.period]['FV'] = action.payload.input
        },
        calculateNPV(state, action) {
            var interest_rate = state.calculator.rate
            interest_rate.replaceAll(',','')
            interest_rate.replaceAll('%','')
            interest_rate = parseFloat(interest_rate) / 100
            
            for(var i = 0; i < state.calculator.period.length; i++) {
                var current_period = state.calculator.table[i]

                current_period['discount'] = ( (1) / ( Math.pow(1 + interest_rate, i) ) ).toFixed(3)
                
            }

            for(var j = 0; j < state.calculator.period.length; j++) {
                var current_period = state.calculator.table[j]

                if(current_period['FV'].includes(')','(')) {
                    var FV = parseFloat(current_period['FV'].replaceAll(',','').replaceAll('(','').replaceAll(')','')) * -1
                }
                else {
                    var FV = parseFloat(current_period['FV'].replaceAll(',',''))
                }

                current_period['PV'] = (Math.round(FV * parseFloat(current_period['discount']))).toLocaleString()
            }

            var NPV = 0.0
            for(var k = 0; k < state.calculator.period.length; k++) {
                NPV = NPV + parseFloat(state.calculator.table[k]['PV'].replaceAll(',',''))
            }
            //NPV = NPV.toFixed(2)
            state.calculator.NPV = (NPV).toLocaleString()
        },
        clear(state) {
            state.calculator.rate = ''
            state.calculator.NPV = ''
            for(var i = 0; i < state.calculator.period.length; i++) {
                state.calculator.table[i]['FV'] = ''
                state.calculator.table[i]['discount'] = ''
                state.calculator.table[i]['PV'] = ''
            }
        },
    }
})

export const { changePeriod, inputIR, inputFV, calculateNPV, clear } = calculatorSlice.actions
export default calculatorSlice.reducer
