import { createGlobalStyle } from "styled-components"


export const GlobalStyles = createGlobalStyle`

    :root{
        --black: #111;
        --white: #f3f3f3;
        --green : green;
        --red: red;
    }

    *{
        box-sizing: border-box;
    }

    body{
        background: ${({theme}) => theme.background};
        color: ${({theme}) => theme.textColor};
        margin: 0;
        padding: 0;
        transition: all 0.25s linear;
    }

    .canvas{
        display: grid;
        min-height: 100vh;
        grid-auto-flow: row;
        grid-template-rows: auto 1fr auto;
        gap: 0.4rem;
        padding: 1.2rem;
        width: 100vw;
        align-items: center;
        text-align: center;
    }

    .header{
        width: 1000px;
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        margin-left: auto;
        margin-right: auto;
        border-bottom: 2px solid
    }

    .logo{
        font-size: 28px;
        color: ${({theme}) => theme.textColor};
        cursor: pointer
    }

    .logo span{
        background: ${({theme}) => theme.textColor};
        color: ${({theme}) => theme.background};
        padding: 3px 6px;
        margin-left: 3px;
        border-radius: 10px;
        font-weight: bolder;
    }

    .upper-menu{
        width: 1000px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.3rem;
        justify-content: space-between;
        padding: 0.5rem;
    }

    

    .modes{
        display: flex;
        gap: 0.4rem;
    }

    .time-mode:hover{
        color: var(--green);
        cursor: pointer;
    }

    .type-box{
        display: block;
        max-width: 1000px;
        height: 140px;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }
    .words{
       font-size : 32px;
       display: flex;
       flex-wrap: wrap;
       color: ${({theme}) => theme.typeBoxText}
    }

    .word{
        margin: 5px;
        padding-right: 2px;
    }

    .hidden-input{
        opacity: 0;
    }

    .current{
        border-left: 1px solid var(--black);
        animation: blinking 2s infinite;
        animation-timing-function: ease;

        @keyframes blinking {
            0% {border-left-color: ${({theme}) => theme.textColor} }
            25% {border-left-color: ${({theme}) => theme.background}}
            50% {border-left-color: ${({theme}) => theme.textColor}}
            75% {border-left-color: ${({theme}) => theme.background}}
            100% {border-left-color: ${({theme}) => theme.textColor}}
        }
    }

    .current-right{
        border-right: 1px solid ${({theme}) => theme.background};
        animation: blinkingRight 2s infinite;
        animation-timing-function: ease;

        @keyframes blinkingRight {
            0% {border-right-color: ${({theme}) => theme.textColor} }
            25% {border-right-color: ${({theme}) => theme.background}}
            50% {border-right-color: ${({theme}) => theme.textColor}}
            75% {border-right-color: ${({theme}) => theme.background}}
            100% {border-right-color: ${({theme}) => theme.textColor}}
        }
    }

    .correct{
        color: ${({theme}) => theme.textColor};
    }

    .incorrect{
        color: var(--red);
    }

    .footer{
        width: 1000px;
        border-top: 2px solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        margin-left: auto;
        margin-right: auto;
    }

    .stats-box{
        display:flex;
        width: 1000px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
    }

    .left-stats{
        width: 30%;
        padding: 30px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px
    }

    .right-stats{
        width: 30%;
    }

    .title{
        font-size: 20px;
        color: ${({theme}) => theme.typeBoxText};
    }

    .subtitle{
        font-size: 30px;
    }

    .user-canvas{
        gap: 1.5rem;
    }

    .user-profile{
        width: 1000px;
        margin: auto;
        display: flex;
        height: 15rem;
        background: ${({theme}) => theme.typeBoxText};
        color: ${({theme}) => theme.background};
        border-radius: 20px;
        padding: 1rem;
        justify-content: center;
        align-items: center;
    }

    .user{
        width:50%;
        display: flex;
        font-size: 1.5rem;
        padding: 1rem;
        border-right: 2px solid;
    }

    .info{
        width: 60%;
        padding: 1rem;
        margin-top: 0.8rem;
    }

    .picture{
        width: 40%;
    }

    .total-tests{
        width: 50%;
        font-size: 3rem;
    }

    .graph{
        margin: auto;
        width: 700px;
    }

    .table, .graph-user-page{
        margin: auto;
        width: 1000px;
    }

    .center-of-screen{
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }


    .links{
        display: flex;
        gap: 0.5rem;
        padding: .5rem;
        width: 1rem;
    }
`