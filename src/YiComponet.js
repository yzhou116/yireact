import { React, useEffect, useState } from "react";
import YouTube from 'react-youtube';
import Logo1 from './imgFolder/f1.png'
import LeftArrow from './arrowFolder/arrowLeft.png'
import RightArrow from './arrowFolder/arrowRight.png'


function MComponet(props) {
    const link = 'https://www.youtube.com/watch?v='
    console.log(props.value[1].img)

    const [startVideo, setStartVideo] = useState(0)
    var arrowControlArr = [];
    const [theEnd, setTheEnd] = useState(2)
    const [theStart, setTheStart] = useState(0);
    const opt = {
        width: '190',
        height: '90',
        playerVars: {
            autoplay: startVideo
        }
    }
    const [Index, setIndex] = useState(0)
    const requireContext = require.context("./gamePic", true, /\.png$/);
    const images = requireContext.keys().map(requireContext);

    const [mLink, setmLink] = useState({
        url: images
    })

    arrowControlArr.push("video")
    var count = 0;
    var temp = [];
    mLink.url.map(link => {

        arrowControlArr.push(link.default)
    })




    const [divDom, setDivDom] = useState(
        <YouTube
            videoId={props.value[0].video}
            onPlay={onVideoPlay}

        />
    )

    const [grey, setGrey] = useState("grey")
    function clickDiv(link, e) {
        console.log(link.substring(link.length - 3))

        if (link.substring(link.length - 3) === 'png') {
            for (var i = 0; i < arrowControlArr.length; i++) {
                if (arrowControlArr[i] == link) {
                    setIndex(i)
                    break;
                }
            }
            setDivDom(<img key={link} src={link} style={{
                width: 600,
                height: 360

            }}>

            </img>)
        } else {
            setDivDom(<YouTube
                videoId={props.value[0].video}
                onPlay={onVideoPlay}

            />)
        }



        console.log("click the div" + link)

    }
    function clickLeft() {
        console.log("click left arrow")
        console.log(arrowControlArr)
        if (Index > 1) {
            var cursor = Index - 1;
            console.log(cursor)
            setIndex(cursor);
            setDivDom(<img key={arrowControlArr[cursor]} src={arrowControlArr[cursor]} style={{
                width: 600,
                height: 360

            }}>

            </img>)
        } else if (Index == 1) {
            console.log('it is the left end ')
            var cursor = Index - 1;
            console.log(cursor)
            setIndex(cursor);
            setDivDom(<YouTube
                videoId={props.value[0].video}
                onPlay={onVideoPlay}



            />)
        }

    }
    function clickRight() {
        console.log("click right arrow")
        console.log(arrowControlArr)
        if (Index < 2) {
            var cursor = Index + 1;
            console.log(cursor)
            setIndex(cursor);
            console.log(arrowControlArr[cursor])
            setDivDom(
                <img key={arrowControlArr[cursor]} src={arrowControlArr[cursor]} style={{
                    width: 600,
                    height: 360

                }}>

                </img>)
        }
        else {

            console.log('it is the end ')
        }




    }
    function moveMouse(e) {
        e.target.style.backgroundColor = "aqua"

    }
    function leaveMouse(e) {
        e.target.style.backgroundColor = "grey"
    }
    function onVideoPlay(event) {
        var mopt = {
            playerVars: {
                autoplay: 1
            }
        }

        setDivDom(<YouTube
            videoId={props.value[0].video}
            onPlay={onVideoPlay}
            opt={mopt}


        />)
        console.log(event)
        event.target.getVideoUrl()

        console.log(event.target.getVideoUrl())
    }

    return (
        <div>
            <div style={{
                marginTop: 15,
                marginLeft: 25,
                width: 700,
                height: 500


            }}>
                <div style={{
                    width: 600,
                    height: 360
                }

                }>

                    {divDom}

                </div>

                <div style={{

                    display: "flex",
                    width: 200,
                    height: 100,
                    padding: 5,
                    marginLeft:-7
                }}>
                    <div onClick={clickLeft}>
                        <img key={LeftArrow} src={LeftArrow} style={{
                            width: 25,
                            height: 100,
                            padding: 5,

                        }} >
                        </img>
                    </div>
                    <div onMouseLeave={leaveMouse} onMouseMove={moveMouse} style={{

                        background: grey

                    }} key={props.value[0].video} onClick={(e) => clickDiv(link + props.value[0].video, e)}>
                        <YouTube
                            videoId={props.value[0].video}
                            opts={opt}
                            onPlay={onVideoPlay}
                        />

                    </div>



                    {



                        mLink.url.map(link => (


                            <div onMouseLeave={leaveMouse} onMouseMove={moveMouse} style={{

                                background: grey

                            }} className={link.default} key={link.default} onClick={(e) => clickDiv(link.default, e)}>

                                <img key={link.default} src={link.default} style={{
                                    width: 200,
                                    height: 100,
                                    padding: 5,

                                }} >

                                </img>
                            </div>
                        )
                        )}
                    <div onClick={clickRight}>
                        <img key={RightArrow} src={RightArrow} style={{
                            width: 30,
                            height: 100,
                            padding: 5,

                        }} >

                        </img>
                    </div>

                </div>



            </div>


        </div>
    );
};

export default MComponet;