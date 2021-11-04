import { Link } from 'react-router-dom';
import Logo1 from './imgFolder/f1.png'
import Logo2 from './imgFolder/f2.png'


function AboutMe() {
    console.log(Logo1);
    return (
        <div>
            <h3 style={{
                    marginTop: 30
                }
                }>About Me</h3>
            <strong>
                Academic Honesty Blurb:
            </strong>
            <br />
            <span>
                I declare that my assignment is wholly my own work in accordance with Seneca Academic Policy. No
                part of this assignment has been copied manually or electronically from any other source (including web
                sites) except for the information supplied by the WEB422 instructors and / or made available in this
                assignment for my use.
            </span>
            <br />
            <br />

            <span>
                I also declare that no part of this assignment has been distributed to other students.
            </span>
            <br />
            <br />
            <strong>
                My Story:
            </strong>
            <br />
            <span>
              My name is Yi Zhou, I use to export cars from Canada to China. Right now, I am working for a chatbot company to develop some software demo or test the software for them. At the 
              rest of time, I am trying to get my software development education. And also, I like to play games.
            </span>
            <br />
            <img src={Logo1} alt="YiImg1"
                style={{
                    height: 600,
                    width: 900,
                    marginLeft: 250
                }

                }
            />
            <br />
            <img src={Logo2} alt="YiImg2" style={{
                height: 600,
                width: 900,
                marginLeft: 250,
                marginTop: 50
            }

            } />
        </div>
    );
};

export default AboutMe;