import React from "react";
import {EIcon} from "@/types/enums/common-enum";

interface Props {
    iconType: EIcon;
    fill?: string;
    width?: string;
    height?: string;
}

const Icons = ({iconType, fill = "black", width = "16", height = "16"}: Props): JSX.Element => {
    return (
        <svg clipRule="evenodd" viewBox={`0 0 ${width} ${height}`}
             xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
            {
                EIcon.Avatar === iconType &&
                <circle cx={width/2} cy={width/2} r={width/2} fill={fill}/>
            }
            {
                EIcon.Close === iconType &&
                <path
                    fill={fill}
                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                />
            }
            {
                EIcon.Close2 === iconType &&
                <path
                    fill={fill}
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"
                />
            }
            {
                EIcon.SignOut === iconType &&
                <path fill={fill} d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
            }
            {
                EIcon.ArrowUp === iconType &&
                <path fill={fill}
                      d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"/>
            }
            {
                EIcon.ArrowDown === iconType &&
                <path fill={fill}
                      d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/>
            }
            {
                EIcon.TrashCan === iconType &&
                <path fill={fill}
                      d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
            }
            {
                EIcon.Picture === iconType &&
                <path fill={fill}
                      d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"/>
            }
            {
                EIcon.Option === iconType &&
                <g transform="translate(0, 12.5)">
                    <circle cx="7" cy="3" r="3" fill={fill} />
                    <circle cx="17" cy="3" r="3" fill={fill} />
                    <circle cx="27" cy="3" r="3" fill={fill} />
                </g>
            }
            {
                EIcon.Like1 === iconType &&
                <path fill={fill} d="M12.352 2.107c2.481 1.759 2.474 1.736 5.493 1.718.244 0 .459.136.524.331.917 2.789.942 2.838 3.438 4.554.176.122.227.307.174.453-.971 2.801-.979 2.834 0 5.676.053.145.003.33-.175.453-2.469 1.699-2.505 1.73-3.437 4.553-.065.195-.28.331-.526.331-2.995-.019-3-.049-5.49 1.717-.205.145-.501.144-.704 0-2.475-1.751-2.463-1.739-5.493-1.717-.244 0-.459-.136-.523-.329-.826-2.499-.907-2.82-2.925-4.202l-.514-.354c-.176-.122-.227-.307-.174-.453.866-2.504.999-2.805.193-5.114-.146-.424-.374-.769-.019-1.016 2.458-1.691 2.506-1.722 3.437-4.553.065-.195.28-.331.526-.331 3.009.021 2.996.048 5.491-1.717.206-.145.503-.141.704 0zm-.352-2.107c-.527 0-1.055.157-1.502.471-1.757 1.236-1.77 1.362-3.152 1.362l-1.183-.008h-.008c-1.104 0-2.083.685-2.421 1.696-.812 2.433-.533 2.055-2.68 3.544-.675.468-1.054 1.212-1.054 1.982 0 .254.041.512.127.763.83 2.428.827 1.963 0 4.38-.086.251-.127.508-.127.763 0 .77.379 1.514 1.055 1.982 2.147 1.489 1.869 1.114 2.68 3.544.338 1.011 1.316 1.696 2.421 1.696h.008c2.652-.008 2.189-.155 4.335 1.354.446.313.974.471 1.501.471s1.055-.157 1.502-.471c1.76-1.238 1.762-1.361 3.181-1.361l1.154.007h.008c1.104 0 2.083-.685 2.421-1.696.812-2.428.528-2.053 2.68-3.544.675-.469 1.054-1.212 1.054-1.982 0-.254-.041-.512-.127-.763-.831-2.428-.827-1.963 0-4.38.086-.251.127-.509.127-.763 0-.77-.379-1.514-1.055-1.982-2.152-1.492-1.868-1.117-2.68-3.544-.338-1.011-1.316-1.696-2.421-1.696h-.008l-1.156.007c-1.416 0-1.42-.124-3.179-1.361-.446-.314-.974-.471-1.501-.471zm3.698 15.354c-.405-.031-.367-.406.016-.477.634-.117.913-.457.913-.771 0-.265-.198-.511-.549-.591-.418-.095-.332-.379.016-.406.566-.045.844-.382.844-.705 0-.282-.212-.554-.63-.61-.429-.057-.289-.367.016-.461.261-.08.677-.25.677-.755 0-.336-.25-.781-1.136-.745-.614.025-1.833-.099-2.489-.442.452-1.829.343-4.391-.845-4.391-.797 0-.948.903-1.188 1.734-.859 2.984-2.577 3.531-4.343 3.802v4.964c3.344 0 4.25 1.5 6.752 1.5 1.6 0 2.426-.867 2.426-1.333 0-.167-.136-.287-.48-.313z"/>
            }
            {
                EIcon.Like2 === iconType &&
                <path fill={fill} d="M23.873 9.81c.086-.251.127-.508.127-.763 0-.77-.379-1.514-1.055-1.982-2.152-1.492-1.868-1.117-2.68-3.544-.339-1.014-1.321-1.7-2.429-1.696-2.654.008-2.193.153-4.335-1.354-.446-.314-.974-.471-1.501-.471s-1.055.157-1.502.471c-2.154 1.515-1.687 1.362-4.335 1.354-1.107-.003-2.09.683-2.429 1.696-.812 2.433-.533 2.055-2.68 3.544-.675.469-1.054 1.212-1.054 1.982 0 .255.041.512.127.763.83 2.428.827 1.963 0 4.38-.086.251-.127.509-.127.763 0 .77.379 1.514 1.055 1.982 2.147 1.489 1.869 1.114 2.68 3.544.339 1.014 1.321 1.7 2.429 1.696 2.654-.009 2.193-.152 4.335 1.354.446.314.974.471 1.501.471s1.055-.157 1.502-.471c2.141-1.506 1.681-1.362 4.335-1.354 1.107.003 2.09-.683 2.429-1.696.812-2.428.528-2.053 2.68-3.544.675-.468 1.054-1.212 1.054-1.982 0-.254-.041-.512-.127-.763-.831-2.427-.827-1.963 0-4.38zm-7.565 1.984c.418.056.63.328.63.61 0 .323-.277.66-.844.705-.348.027-.434.312-.016.406.351.08.549.326.549.591 0 .314-.279.654-.913.771-.383.07-.421.445-.016.477.344.026.479.146.479.312 0 .466-.826 1.333-2.426 1.333-2.501.001-3.407-1.499-6.751-1.499v-4.964c1.766-.271 3.484-.817 4.344-3.802.239-.831.39-1.734 1.187-1.734 1.188 0 1.297 2.562.844 4.391.656.344 1.875.468 2.489.442.886-.036 1.136.409 1.136.745 0 .505-.416.675-.677.755-.304.094-.444.404-.015.461z"/>
            }
            {
                EIcon.Comment === iconType &&
                <path fill={fill} d="M12 3c5.514 0 10 3.685 10 8.213 0 5.04-5.146 8.159-9.913 8.159-2.027 0-3.548-.439-4.548-.712l-4.004 1.196 1.252-2.9c-.952-1-2.787-2.588-2.787-5.743 0-4.528 4.486-8.213 10-8.213zm0-2c-6.628 0-12 4.573-12 10.213 0 2.39.932 4.591 2.427 6.164l-2.427 5.623 7.563-2.26c1.585.434 3.101.632 4.523.632 7.098.001 11.914-4.931 11.914-10.159 0-5.64-5.372-10.213-12-10.213z"/>
            }
        </svg>
    )
}

export default Icons;