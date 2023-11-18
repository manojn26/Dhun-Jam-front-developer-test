import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import "./styles/DashboardScreen.css"
import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default function DashboardScreen() {

    // Get the User Details from Global Context
    const { userAuth } = useContext(AppContext)
    // Username State value
    const [userName, setUserName] = useState("")
    // Userlocation State value
    const [userLocation, setUserLocation] = useState("")
    // Chargefor customer requesting value
    const [customerCharge, setCustomerCharge] = useState(false)
    // Category_6 amount value
    const [amountSix, setAmountSix] = useState(0)
    // Category_7 amount value
    const [amountSeven, setAmountSeven] = useState(0)
    // Category_8 amount value
    const [amountEight, setAmountEight] = useState(0)
    // Category_9 amount value
    const [amountNine, setAmountNine] = useState(0)
    // Category_10 amount value
    const [amountTen, setAmountTen] = useState(0)





    const data = [
        { quarter: 1, earnings: Number(amountSix) },
        { quarter: 2, earnings: Number(amountSeven) },
        { quarter: 3, earnings: Number(amountEight) },
        { quarter: 4, earnings: Number(amountNine) },
        { quarter: 5, earnings: Number(amountTen) }
    ]


    // UseEffect : for loading the data before page loading, from Global Context Value
    useEffect(() => {
        // Fetching data from API by provided "user id", by Global Context
        const fetchData = async () => {
            const apiData = await axios.get(` https://stg.dhunjam.in/account/admin/${userAuth?.id}`)
                .then((data) => data)
                .catch((err) => console.log(err))

            // Set all necessay values to state from, what the value returned by API
            setUserName(apiData?.data?.data?.name)
            setUserLocation(apiData?.data?.data?.location)
            setCustomerCharge(!apiData?.data?.data?.charge_customers)
            setAmountSix(apiData?.data?.data?.amount?.category_6)
            setAmountSeven(apiData?.data?.data?.amount?.category_7)
            setAmountEight(apiData?.data?.data?.amount?.category_8)
            setAmountNine(apiData?.data?.data?.amount?.category_9)
            setAmountTen(apiData?.data?.data?.amount?.category_10)
        }
        // calling Fetch API
        fetchData()

        // dependency array for UseEffect, this take "user id", for loading the data before the load
    }, [userAuth?.id])


    // function for verify the minum amount for each input field
    // NOTE
    // FOR "greyed" fields I PROVIDED RED COLOR FOR BORDERS
    // BECAUSE YOUR PROVIDED COLOR NOT SUITED FOR UI 
    function customAmountInputVerify(e) {
        if (Number(e.target.value) < Number(e.target.min)) {
            e.target.id = "greyed"
        } else {
            e.target.id = ""
        }

    }

    // Category_6 amount value get from input field, set that value into state.
    function amountSixHandler(e) {
        setAmountSix(e.target.value)
    }
    // Category_7 amount value get from input field, set that value into state.
    function amountSevenHandler(e) {
        setAmountSeven(e.target.value)
    }
    // Category_8 amount value get from input field, set that value into state.
    function amountEightHandler(e) {
        setAmountEight(e.target.value)
    }
    // Category_9 amount value get from input field, set that value into state.
    function amountNineHandler(e) {
        setAmountNine(e.target.value)
    }
    // Category_10 amount value get from input field, set that value into state.
    function amountTenHandler(e) {
        setAmountTen(e.target.value)
    }

    // function for updating the amount details
    function updateUserDetails() {
        // API for updating amount details, by given "user id"
        axios.put(`https://stg.dhunjam.in/account/admin/${userAuth?.id}`, {
            amount: {
                "category_6": amountSix,
                "category_7": amountSeven,
                "category_8": amountEight,
                "category_9": amountNine,
                "category_10": amountTen

            }
        }).then((res) => {

            // If server return "success", show alert to message to user.
            if (res.data?.response.toLowerCase() === "success") {
                alert("Data Saved Successfully")
            }
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <>
            {
                userAuth?.response ? <div>
                    <div className='container'>
                        <h1>{userName}, {userLocation} on Duhan Jam</h1>
                        <div className='charge-for-customers'>
                            <div className='charge-for-customers-question'>
                                Do you want to charge your customers for requesting songs?
                            </div>
                            <div className='charge-for-customers-answers'>
                                <div >
                                    <input type='radio' id='charge' name='charge' checked={!customerCharge} /> <label htmlFor="charge">Yes</label>
                                </div>
                                <div>
                                    <input type='radio' id='charge' name='charge' checked={customerCharge} /> <label htmlFor="charge">No</label>
                                </div>
                            </div>
                        </div>
                        <div className='custom-song-amount-request'>
                            <div className='custom-song-amount-request-questions'>
                                <p>Custom song request amount - </p>
                            </div>
                            <div className='custom-song-amount-request-answers'>
                                <input type='text' min={99} name='category_6' onKeyUp={customAmountInputVerify} value={amountSix} onChange={amountSixHandler} />
                            </div>
                        </div>
                        <div className='regular-song-request-amount'>
                            <div className='regular-song-request-amount-questions'>
                                <p>Regular song request amounts, from high to low - </p>
                            </div>
                            <div className='regular-song-request-amount-answers'>
                                <input type='text' name='category_7' value={amountSeven} min={79} onKeyUp={customAmountInputVerify} onChange={amountSevenHandler} />
                                <input type='text' name='category_8' value={amountEight} min={59} onKeyUp={customAmountInputVerify} onChange={amountEightHandler} />
                                <input type='text' name='category_9' value={amountNine} min={39} onKeyUp={customAmountInputVerify} onChange={amountNineHandler} />
                                <input type='text' name='category_10' value={amountTen} min={19} onKeyUp={customAmountInputVerify} onChange={amountTenHandler} />
                            </div>
                        </div>
                        <div className='graph-container'>
                            {
                                customerCharge ? <>



                                </> : <VictoryChart domainPadding={30} theme={VictoryTheme.material}   >

                                    <VictoryAxis tickValues={[1, 2, 3, 4, 5]}
                                        tickFormat={["custom ", "catg-1", "catg-2", "catg-3", "catg-4"]}
                                        style={{ axis: { stroke: "#FFFFFF" } }}

                                    />
                                    <VictoryAxis
                                        dependentAxis
                                        tickFormat={[100, 200, 300, 400, 500, 600, 700]}
                                    />
                                    <VictoryBar
                                        style={{
                                            data: { fill: "#F0C3F1" }
                                        }}
                                        data={data}
                                        x="quarter"
                                        y="earnings"

                                    />
                                </VictoryChart>
                            }
                        </div>
                        <div className='button-container'>

                            <button className='save-button' onClick={updateUserDetails}>Save</button>
                        </div>

                    </div>

                </div> : <p>Your are Unauthorized</p>
            }



        </>
    )
}
