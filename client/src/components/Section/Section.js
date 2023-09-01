import ChocolateCookie from "../../common/image/chocolateCookie.jpeg"
import {SectionContainer} from "./Section.styled";

const Section = () => {
    return (
        <SectionContainer>
          <div className="contents">
                  <img
                    className="meta__snack-image"
                    alt="place_image"
                    src={ChocolateCookie}
                  />
                  <div className="meta_title">Chocolate Cookies</div>
                  <div className="meta_content">
                    $ 3.09
                  </div>
                  <div className="meta_content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 45 45"
                    >
                      <path
                        fill="#F44336"
                        d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
                      />
                    </svg>
                    <span> Likes:3</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 32 27"
                    >
                      <path
                        fill="currentColor"
                        d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25Z"
                      />
                      <path
                        fill="currentColor"
                        d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6Zm0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"
                      />
                    </svg>
                    <span> Buy:3</span>
                  </div>
                  <div className="meta_profile">
                    <span>Cookies</span>
                  </div>
                      <svg viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          fill="currentColor"
                          d="M7.29583817,13.7871612 C7.68473613,14.1808512 8.31605486,14.1828078 8.70304958,13.7885531 C8.70304958,13.7885531 10.9002368,11.6291175 13,9.00215315 C15,6.50000023 15.5000002,3.49999998 13,2.00000001 C10.5031852,0.501911222 8.00000022,3.00000005 8.00000022,3.00000005 C8.00000022,3.00000005 5.49772957,0.501362336 3.00000005,2.00000001 C0.500000019,3.49999999 0.999999993,6.50000023 2.99999999,9.00215315 C5.09401769,11.6219294 7.29583817,13.7871612 7.29583817,13.7871612 Z"
                        ></path>
                      </svg>
                    </div>     
        </SectionContainer>
      );
};

export default Section;