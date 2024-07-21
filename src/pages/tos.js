import { NavLink } from 'react-router-dom'
import "../styles/tos.css"

const Tos = () => {

    return (
            <div className="tos-content-body">
                <div className='tos-container'>
                    <div className='tos-content'>
                        <h1>Terms of Service</h1>

                        <div className='part1'>
                            <h2>Introduction</h2>

                            <p>Welcome to Racetrack! These Terms of Service ("Terms") govern your access to and use of our event management system ("Service"). By using our Service, you agree to be bound by these Terms.</p>
                        </div>

                        <div className='part2'>
                            <h2>Use of Service</h2>

                            <h3>Eligibility</h3>
                            <p>You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that you meet this eligibility requirement.</p>

                            <h3>Account Registration</h3>
                            <p>To access certain features of our Service, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up-to-date.</p>
                        
                            <h3>User Responsibilities</h3>
                            <p>You are responsible for all activities that occur under your account. You agree to use our Service only for lawful purposes and in compliance with all applicable laws and regulations.</p>
                            <p>You must not:</p>
                            <ul>
                                <li> Use our Service in any way that could harm or impair the functionality of the Service.</li>
                                <li> Engage in any activity that is fraudulent, abusive, or harmful.</li>
                                <li> Violate the rights of others, including their privacy and intellectual property rights.</li>
                            </ul>
                        </div>

                        <div className='part3'>
                            <h2>Content</h2>

                            <h3>Your Content</h3>
                            <p>You retain ownership of any content you submit, post, or display on or through our Service ("Your Content"). By submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, distribute, and display Your Content in connection with the operation of our Service.</p>

                            <h3>Our Content</h3>
                            <p>All content and materials available on our Service, including but not limited to text, graphics, logos, and software, are the property of Racetrack or its licensors and are protected by copyright and other intellectual property laws. You may not use our content without our prior written consent.</p>
                        </div>

                        <div className='part4'>
                            <h2>Privacy</h2> 

                            <p>Your privacy is important to us. Please review our Privacy Policy, which describes how we collect, use, and protect your personal information.</p>
                        </div>

                        <div className='part5'>
                            <h2>Termination</h2>

                            <p>We may suspend or terminate your access to our Service at any time, without notice or liability, for any reason, including if we believe you have violated these Terms. Upon termination, your right to use our Service will immediately cease.</p>
                        </div>

                        <div className='part6'>
                            <h2>Disclaimers</h2>

                            <p>Our Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that our Service will be uninterrupted or error-free, or that any defects will be corrected.</p>
                        </div>

                        <div className='part7'>
                            <h2>Limitation of Liability</h2>

                            <p>To the fullest extent permitted by law, Racetrack and its affiliates, officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Service.</p>
                        </div>

                        <div className='part8'>
                            <h2>Changes of Terms</h2>

                            <p>We may update these Terms from time to time. If we make changes, we will notify you by revising the date at the top of these Terms and, in some cases, we may provide you with additional notice. Your continued use of our Service after any changes means that you agree to the new Terms.</p> 
                        </div>
                        <div className="part9">
                            <NavLink to="/landing">
                            <button className="tos-back-button">Confirm and Go Back</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Tos