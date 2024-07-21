import { useState } from "react"
import supabase from "../config/supabaseclient"
import '../styles/searchbar.css'

/* This is the search function for the dashboard */

export const SearchR = ({setGetraces, setFetchError}) => {
    const [input, setInput] = useState("")

    const fetchData = async (value) => {
        const { data: findData, error: noData } = await supabase
        .from('user_created_race')
        .select('*')
        .ilike('race_title', `%${value}%`)

        if (noData || findData.length === 0) {
            setFetchError('No Races Found...')
            setGetraces([])
        } else {
            setFetchError(null)
            setGetraces(findData)
        }
    }

    const handleInput = (e) => {
        const value = e.target.value
        setInput(value)

        if (value.length > 0) {
            fetchData(value)
        } else {
            fetchData("")
        }
    }

    return (
        <div>
            <input 
                className="search-input"
                placeholder="Search for a race..." 
                value={input} 
                onChange={handleInput}
            />
        </div>
    )
}