"use client";
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image';
import Link from 'next/link';
import menu from "@/app/utils/menu";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs"; // 👈 ADĂUGAT

function Sidebar() {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk(); // 👈 ADĂUGAT

  const handleClick = (link: string) => {
    router.push(link);
  };

  const handleLogout = () => { // 👈 ADĂUGAT
    signOut(() => {
      window.location.href = "/sign-in";
    });
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image 
            width={70}
            height={70}
            src="/profile.jpeg"
            alt="profile"
            className="profile-img"
          />
        </div>
        <h1>
          <span>Mone</span>
        </h1>
      </div>

      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li 
              className={`nav-item ${pathname === link ? "active" : ""}`} 
              onClick={() => handleClick(link)} 
              key={item.id}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>

      {/* 👇 Butonul de logout fără modificări la CSS */}
      <button onClick={handleLogout}>Log Out</button>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
  width: 250px;
  height: 100;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: 0;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey0};
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);

  .profile {
    position: relative;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${(props) => props.theme.colorBg3};
    border-radius: 1rem;
    overflow: hidden;

    .image {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;

      img {
        border-radius: 50%;
        transition: transform 0.3s;
      }
    }

    .profile-overlay {
      position: absolute;
      inset: 0;
      background: ${(props) => props.theme.colorBg3};
      opacity: 0.1;
      backdrop-filter: blur(8px);
      z-index: 0;
    }

    h1 {
      z-index: 1;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  .nav-items {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 1rem;
      border-radius: 0.75rem;
      transition: background 0.3s;
      cursor: pointer;

      a {
        font-weight: 500;
        color: inherit;
        text-decoration: none;
      }

      &:hover {
        background-color: ${(props) => props.theme.activeNavLinkHover};
      }

      &.active {
        background-color: ${(props) => props.theme.activeNavLink};
        font-weight: bold;
      }
    }
  }

  > button {
    margin-top: 2rem;
    padding: 0.8rem 1rem;
    border-radius: 0.75rem;
    border: none;
    background-color: ${(props) => props.theme.colorGreenDark};
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Sidebar;
