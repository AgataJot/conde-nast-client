import React from "react";
import styled from "styled-components";

const LiSt = styled.li`
    list-style: none;
`;

const LinkSt = styled.a`
    display: block;
    color: #191919;
    text-decoration: none;
    border: 1px solid #f0f0f0;
    padding: 10px;
    margin-bottom: 20px;
    transition: box-shadow 0.2s;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
    }
`;

const TitleSt = styled.h2`
    display: block;
    font-weight: bold;
    size: 2rem;
    margin-bottom: 10px;
`;

interface IArticle {
    author: string;
    content: string | null;
    description: string;
    publishedAt: string;
    //"2019-05-08T09:35:00Z";
    source: any; // { id: "engadget"; name: "Engadget" };
    title: string;
    url: string;
    //  "https://www.engadget.com/2019/05/08/binance-hack-7000-bitcoins-stolen/";
    urlToImage: string | null;
}

const SearchResultItem = (props: IArticle) => {
    return (
        <LiSt>
            <LinkSt href={props.url} target="_blank">
                <TitleSt>{props.title}</TitleSt>
                <div>{props.description}</div>
            </LinkSt>
        </LiSt>
    );
};

export default SearchResultItem;
