import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';

// CSS
import '../styles/eula.css'

const Eula = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='eula-content-body'>
            <div className='eula-container'>
                <div className='eula-content'>
                    <h1>End-User License Agreement</h1>

                    <div className='part1'>
                        <h2>I. Acceptance of Terms</h2>
                        <p>Welcome to Racetrack ('Racetrack,' 'we,' 'us,' or 'our'). These Terms of Service ('Terms') govern your access and use of the Racetrack website and services (the 'Service'). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access or use the Service.</p>
                    </div>
                    <div className='part2'>
                        <h2>II.Use of the Service</h2>
                        <ul>
                            <li>2.1 You must be at least 18 years old to use the Service.</li>
                            <li>2.2 The Service is intended for use by event organizers to manage their events. You are responsible for all content you post, upload, or otherwise transmit through the Service ('User Content').</li>
                            <li>2.3 You agree not to use the Service to:</li>
                            <p>
                            - Violate any applicable law or regulation. <br></br>
                            - Infringe on the rights of any third party. <br></br>
                            - Transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, obscene, hateful, or racially or ethnically offensive. <br></br>
                            - Interfere with the use of the Service by any other user. <br></br>
                            - Attempt to gain unauthorized access to the Service or any computer systems or networks connected to the Service. <br></br>
                            </p>
                        </ul>
                    </div>
                    <div className='part3'>
                        <h2>III. User Content</h2>
                        <ul>
                            <li>3.1 You retain all ownership rights to your User Content. By submitting User Content to the Service, you grant Racetrack a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute your User Content in connection with the Service.</li>
                            <li>3.2 You are responsible for ensuring that your User Content does not violate the rights of any third party.</li>
                        </ul>
                    </div>
                    <div className='part4'>
                        <h2>IV. Disclaimers</h2>
                        <ul>
                            <li>4.1 THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
                            <li>4.2 RACETRACK DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE.</li>
                            <li>4.3 RACETRACK DOES NOT WARRANT THAT THE INFORMATION OBTAINED THROUGH THE SERVICE IS ACCURATE OR RELIABLE.</li>
                        </ul>
                    </div>
                    <div className='part5'>
                        <h2>V. Limitations of Liability</h2>
                        <p>IN NO EVENT SHALL RACETRACK, OR ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, EVEN IF RACETRACK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                    </div>
                    <div className='part6'>
                        <h2>VI. Term and Termination</h2>
                        <ul>
                            <li>6.1 We may terminate your access to the Service at any time, for any reason, or no reason.</li>
                            <li>6.2 You may terminate your use of the Service at any time.</li>
                        </ul>
                    </div>
                    <div className='part7'>
                        <h2>VII. Governing Law</h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of [your state], without regard to its conflict of law provisions.</p>
                    </div>
                    <div className='part8'>
                        <h2>VIII. Entire Agreement</h2>
                        <p>These Terms constitute the entire agreement between you and Racetrack with respect to your use of the Service and supersede all prior or contemporaneous communications and proposals, whether oral or written.</p>
                    </div>
                    <div className='part9-2'>
                        <h2>IX. Amendments</h2>
                        <p>We may amend these Terms at any time by posting the amended terms on the Service. Your continued use of the Service after the amended terms are posted constitutes your agreement to the amended terms.</p>
                    </div>
                    <div className='part10'>
                            <button className='eula-back-button' onClick={goBack}>Confirm and Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eula