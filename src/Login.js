import { React, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";


/* { name, onLoginChange } */
export default function UserLogin(props) {
    const history = useHistory()
    const [warningUserSpace, setUserWarningSpace] = useState('');
    const [warningPasswordSpace, setPasswordSpace] = useState('');
    const [ValidUserName, setValidUserName] = useState(false);
    const [ValidPassword, setPassword] = useState(false);
    const [UserName, setUserName] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [ValidInfo, setValidInfo] = useState({})
    const [isLogged, setIslogged] = useState({
        success: false,
        user: ""
    })
    const [SpanColor, setSpanColor] = useState({
        upperCase: false,
        lowerCase: false,
        isLength: false,
        nonLetter: false
    });
    function submitForm(event) {
        event.preventDefault();
        console.log(ValidInfo)

        if (!isEmpty(ValidInfo)) {
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            console.log(requestOptions.body)
        //    fetch('http://localhost:5000/login?userName=' + ValidInfo.ValiduserName + '&password=' +ValidInfo.ValidPassword ,
       fetch('https://yinodes.herokuapp.com/login?userName=' + ValidInfo.ValiduserName + '&password=' +ValidInfo.ValidPassword ,
                requestOptions)
                .then(response => response.json()).then(user => {
                    console.log(user)
                    if (user.success == true) {
                      
                        console.log('this is user name' + user.userName)

                        props.setStatus({
                            success: true,
                            user: user.userName
                        })
                        history.goBack()
                    } else {
                        setPasswordSpace('Your user name or password is wrong')
                        setUserName("")
                        setUserPassword("")
                    }
                });
        } else {
            setPasswordSpace('Naughty User ！')
        }


    }
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    useEffect(() => {
        if (SpanColor.upperCase == true && SpanColor.lowerCase == true && SpanColor.isLength == true && SpanColor.nonLetter == true && ValidUserName == true) {
            setValidInfo({
                ValiduserName: UserName,
                ValidPassword: UserPassword
            })
        } else {
            setValidInfo({})
        }

        console.log('this is is logged' + isLogged.success)
        console.log('this is is logged' + isLogged.user)
        if (isLogged.success) {
            history.goBack()
        }

    }, [SpanColor, UserName, isLogged, history]);



    async function listenPassword(event) {
        event.preventDefault();
        var input = event.target.value
        var isUpper = SpanColor.upperCase
        var isLower = SpanColor.lowerCase
        var islength = SpanColor.isLength
        var isnonLetter = SpanColor.nonLetter
        if (input.indexOf(" ") == -1) {
            setPasswordSpace('')
        } else {
            setPasswordSpace('Please make sure there is no white space on your password')
            setPassword(false)
            return
        } if (input.length >= 8) {
            islength = true;
        } else {
            islength = false;
            setPassword(false)
        }
        if (input.match(new RegExp("[A-Z]"))) {
            isUpper = true

        } else {
            isUpper = false
            setPassword(false)
        }
        if (input.match(new RegExp("[a-z]"))) {
            isLower = true
        } else {
            isLower = false
            setPassword(false)
        }
        if (input.match(new RegExp(/\d+/g)) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(input)) {
            console.log(isnonLetter)
            isnonLetter = true
        } else {
            isnonLetter = false
            setPassword(false)
        }


        setSpanColor({
            upperCase: isUpper,
            lowerCase: isLower,
            isLength: islength,
            nonLetter: isnonLetter
        })
        setUserPassword(input)

    }
    function listenUsername(event) {
        event.preventDefault();
        var input = event.target.value
        if (input.indexOf(" ") == -1) {
            setUserWarningSpace('')
            setValidUserName(true)
            setUserName(input)

        } else {

            setUserWarningSpace('Please make sure there is no white space on your user name')
        }

    }

    return (
        <div className="shadow p-3 mb-5 bg-body rounded" style={{
            marginTop: 30,
            width: 500,
            height: 450,
            marginLeft: 450



        }}>

            <div className="text-center" style={{
                marginTop: 50
            }}>
                <form onSubmit={submitForm}>

                    <label className="form-label">User Name</label>

                    <br />
                    <input type="text" value={UserName} onChange={listenUsername} />
                    <br />
                    <span style={{
                        color: "red"

                    }} >{warningUserSpace}</span>
                    <br />
                    <label className="form-label">Password</label>
                    <br />
                    <input type="password" value={UserPassword} onChange={listenPassword} />
                    <br />
                    <span style={{
                        color: "red"

                    }} >{warningPasswordSpace}</span>
                    <br />
                    <span style={{
                        color: SpanColor.upperCase ? "green" : "grey"
                    }}>at least one uppercase letter: 'A', 'B'</span>
                    <br />
                    <span style={{
                        color: SpanColor.lowerCase ? "green" : "grey"
                    }}>at least one lowercase letter: 'a', 'b'</span>
                    <br />
                    <span style={{
                        color: SpanColor.nonLetter ? "green" : "grey"
                    }}>at least one non-letter character: '2', '3', '*'</span>
                    <br />
                    <span style={{
                        color: SpanColor.isLength ? "green" : "grey"
                    }}>password length should longer than 8 characters</span>
                    <br />
                    <button type="submit" className="btn btn-primary" style={{
                        marginTop: 30
                    }}>Submit</button>
                </form>
            </div>

        </div>




    )
}