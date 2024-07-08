import { useEffect, useState } from 'react'
import supabase from "../config/supabaseclient"

const Fetch = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ users, setUsers ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
             .from('test_time')
             .select()

             if (error) {
                setFetchError('No Data!')
                setUsers(null)
                console.log(error)
             }

             if (data) {
                setUsers(data)
                setFetchError(null)
             }
        }

        fetchData()
    }, [])

    return (
        <div className="wholesite">
            {/* Here to fetch information from our database */}
            <div>
                {fetchError && (<p>{fetchError}</p>)}
                {users && (
                    <div className='display'>
                        <h1>My users</h1>
                        {/* ang kaning users.map dapit para ni sa output / display
                        sa mga data solud gikan sa table na akoang gi kuhaan */}
                        {users.map(output => (
                            <div className='details'>
                                {output.first_name} {output.last_name} {output.test_email}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fetch