"use client";

import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  padding: 1.5rem;

  p {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li a {
    font-weight: 500;
    color: ${(props) => props.theme.colorPrimary};
    text-decoration: none;
    position: relative;
    padding-bottom: 0.2rem;
    transition: color 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme.colorPrimary};
      left: 0;
      bottom: 0;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: ${(props) => props.theme.colorPrimary};

      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;

function Page() {
  return (
    <StyledPage>
      <p>PARTENERI</p>
      <ul>
        <li>
          <a href="https://scanstart.ro" target="_blank" rel="noopener noreferrer">
            scanstart.ro
          </a>
        </li>
        <li>
          <a href="https://csac.ro" target="_blank" rel="noopener noreferrer">
            csac.ro
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/cie.engineering_ulbs/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram - cie.engineering_ulbs
          </a>
        </li>
      </ul>
    </StyledPage>
  );
}

export default Page;
